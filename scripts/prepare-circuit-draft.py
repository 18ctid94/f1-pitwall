"""Local only. Never run in CI or commit generated drafts."""
import argparse,json,os
from pathlib import Path
import numpy as np
from circuit_fit_v3 import fit
ROOT=Path(__file__).resolve().parents[1]
def main():
 p=argparse.ArgumentParser();p.add_argument('--gp',required=True);p.add_argument('--year',type=int,required=True);p.add_argument('--input',type=Path,required=True);p.add_argument('--output',type=Path,required=True);p.add_argument('--permission-confirmed',action='store_true');a=p.parse_args()
 if not a.permission_confirmed or os.getenv('CI'): p.error('Local permitted data only; confirm permission first')
 if a.output.resolve().is_relative_to(ROOT): p.error('Output must be outside repository')
 targets=json.loads((ROOT/'scripts/circuit-validation-targets.json').read_text());t=next(t for t in targets if t['gp']==a.gp and t['year']==a.year)
 asset=json.loads((ROOT/'public/circuits.json').read_text())[a.gp];assert asset['layoutId']==t['layout']
 cs=sorted(json.loads(a.input.read_text())['corners'],key=lambda c:(int(c['number']),c.get('letter') or ''))
 ids=[str(c['number'])+(c.get('letter') or '') for c in cs];assert len(set(ids))==len(ids) and set(int(c['number']) for c in cs)==set(range(1,t['expected']+1))
 q=np.array([[c['trackPosition']['x'],c['trackPosition']['y']] for c in cs],float); assert np.isfinite(q).all()
 track=np.array(asset['coordinates'],float);r=fit(q,track[:-1] if np.allclose(track[0],track[-1]) else track,details=True)
 corners={k:{'anchor':y,'transformed':x,'error':float(np.linalg.norm(np.array(x)-y))} for k,x,y in zip(ids,r['transformed'],r['anchors'])}
 draft={'schema':'pitwall-editor-draft-v1','release':'BLOCKED','reference':'Local provider input; permission asserted by operator; independent reference pending','drafts':{a.gp:{'corners':corners,'pit':[],'layout':t['layout'],'year':a.year,'status':'UNREVIEWED'}}}
 a.output.write_text(json.dumps(draft,indent=2));print('Local draft written; not approved for release')
if __name__=='__main__':main()
