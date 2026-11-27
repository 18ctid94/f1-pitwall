"""Offline draft generator. Inputs and outputs must remain outside the repository."""
import argparse,json,os,re
from pathlib import Path
import numpy as np
from circuit_fit_v3 import fit
ROOT=Path(__file__).resolve().parents[1]
def read(p): return json.loads(p.read_text(encoding='utf-8'))
def outside(p):
 p=p.resolve()
 if p.is_relative_to(ROOT): raise ValueError('Private files must be outside repository')
 return p
def labels(corners,track):
 used=[]
 for c in corners.values():
  a=np.array(c['anchor']); candidates=[a+r*np.array([np.cos(t),np.sin(t)]) for r in (12,20,30,42) for t in np.arange(16)*np.pi/8]; candidates=[p for p in candidates if 12<=p[0]<=308 and 10<=p[1]<=190]
  if not candidates: continue
  p=min(candidates,key=lambda p:np.linalg.norm(p-a)+sum(max(0,20-np.linalg.norm(p-u))*100 for u in used)+max(0,8-np.linalg.norm(track-p,axis=1).min())*20); c['label']=p.tolist(); used.append(p)
def build(catalog,assets,entries,base,fit_fn=fit):
 drafts=base.get('drafts',{}).copy(); results=[]
 for t in catalog:
  gp=t['gp']; layout=t['layout']; entry=entries.get(layout); status='MISSING_INPUT'
  if gp in drafts and drafts[gp].get('corners'): status='PRESERVED_EXISTING'
  elif gp=='Bahrain': status='PRESERVE_PRODUCTION_MANUAL'
  elif entry:
   try:
    if entry.get('permission_confirmed') is not True or not str(entry.get('reference','')).strip(): raise ValueError('Permission and reference required')
    if entry.get('year') not in t['years']: raise ValueError('Unexpected source year')
    cs=sorted(entry['corners'],key=lambda c:(int(c['number']),c.get('letter') or '')); ids=[str(c['number'])+(c.get('letter') or '') for c in cs]
    if len(set(ids))!=len(ids) or any(not re.fullmatch(r'[1-9][0-9]*[A-Za-z]?',k) for k in ids) or {int(c['number']) for c in cs}!=set(range(1,t['expected']+1)): raise ValueError('Corner coverage mismatch')
    asset=assets[gp]; assert asset['layoutId']==layout
    q=np.array([[c['trackPosition']['x'],c['trackPosition']['y']] for c in cs],float); track=np.array(asset['coordinates'],float)
    if not np.isfinite(q).all() or not np.isfinite(track).all() or np.ptp(q,axis=0).max()==0: raise ValueError('Invalid coordinates')
    r=fit_fn(q,track[:-1] if np.allclose(track[0],track[-1]) else track,details=True)
    corners={k:{'anchor':y,'transformed':x,'error':float(np.linalg.norm(np.array(x)-y))} for k,x,y in zip(ids,r['transformed'],r['anchors'])}; labels(corners,track)
    status=r['status']; drafts[gp]={'corners':corners,'pit':[],'layout':layout,'year':entry['year'],'status':'UNREVIEWED','reference':entry['reference'],'fitStatus':status,'rmse':r['rmse_svg_units']}
   except Exception as e: status='INPUT_OR_FIT_ERROR'; print(f'{gp}: {type(e).__name__}')
  results.append({'gp':gp,'layout':layout,'status':status})
 return {'schema':'pitwall-editor-draft-v1','release':'BLOCKED','reference':'Local draft only','drafts':drafts,'batch':results}
def main():
 p=argparse.ArgumentParser();p.add_argument('--input',type=Path,required=True);p.add_argument('--output',type=Path,required=True);p.add_argument('--base',type=Path);p.add_argument('--permission-confirmed',action='store_true');a=p.parse_args()
 if os.getenv('CI') or not a.permission_confirmed: p.error('Local permitted data only')
 src=read(outside(a.input)); base=read(outside(a.base)) if a.base else {'drafts':{}}; out=outside(a.output)
 if out.exists(): p.error('Output already exists; choose a new filename')
 if src.get('schema')!='pitwall-batch-input-v1' or (a.base and base.get('schema')!='pitwall-editor-draft-v1'): p.error('Invalid schema')
 catalog=read(ROOT/'tools/circuit-editor/catalog.json'); assets=read(ROOT/'public/circuits.json'); result=build(catalog,assets,src['layouts'],base); out.write_text(json.dumps(result,indent=2,allow_nan=False),encoding='utf-8'); print('Draft only:', {s:sum(r['status']==s for r in result['batch']) for s in {r['status'] for r in result['batch']}})
if __name__=='__main__':main()
