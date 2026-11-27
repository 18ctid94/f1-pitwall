"""Diagnostic only: never persist provider coordinates or modify application data."""
import json, os, sys, urllib.request, urllib.error
from pathlib import Path
import numpy as np
from scipy.spatial import cKDTree
from scipy.optimize import minimize
ROOT = Path(__file__).resolve().parents[1]

def fetch(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent':'PITWALL-validation/1.0'}), timeout=25) as r:
        return json.load(r)

def fit(q,p):
    # Sparse corner-to-centerline fit; multi-start, both coordinate handednesses.
    tree=cKDTree(p); center=p.mean(0); q=q-q.mean(0)
    q=q/max(np.linalg.norm(q,axis=1).max(),1e-9)
    scale=np.linalg.norm(p-center,axis=1).max()
    def transform(v,sign):
        a,s,x,y=v; c,d=np.cos(a),np.sin(a)
        return (q*np.array([1,sign]))@np.array([[c,-d],[d,c]])*s+[x,y]
    candidates=[]
    for sign in (1,-1):
        def loss(v):
            dist,_=tree.query(transform(v,sign)); return np.mean(dist**2)
        for a in np.linspace(0,2*np.pi,16,endpoint=False):
            r=minimize(loss,[a,scale,*center],method='Powell',bounds=[(-7,13),(scale*.5,scale*2),(center[0]-scale,center[0]+scale),(center[1]-scale,center[1]+scale)],options={'maxiter':120})
            xy=transform(r.x,sign); dist,idx=tree.query(xy)
            n=len(p); steps=np.diff(np.r_[idx,idx[0]])%n; reverse=(-np.diff(np.r_[idx,idx[0]]))%n
            ordered=bool(np.all(steps>0) and (steps.sum()==n or reverse.sum()==n))
            candidates.append((not ordered,float(np.sqrt(np.mean(dist**2))),float(max(dist)),ordered))
    _,rmse,maximum,ordered=min(candidates)
    return {'rmse_svg_units':round(rmse,3),'max_svg_units':round(maximum,3),'cyclic_order':ordered,'status':'CANDIDATE' if ordered and rmse<=3 and maximum<=8 else 'REVIEW'}

def main():
    assets=json.loads((ROOT/'public/circuits.json').read_text()); targets=json.loads((ROOT/'scripts/circuit-validation-targets.json').read_text()); rows=[]
    for t in targets:
        row={k:t[k] for k in ('gp','year','layout','expected')}; rows.append(row)
        try:
            p=np.asarray(assets[t['gp']]['coordinates'],float)
            if assets[t['gp']]['layoutId']!=t['layout']: raise ValueError('layout mismatch')
            key=t['key']
            if key is None:
                meetings=fetch(f'https://livetiming.formula1.com/static/{t["year"]}/Index.json')['Meetings']
                matches=[m for m in meetings if 'madrid' in json.dumps(m).lower() or 'madring' in json.dumps(m).lower()]
                if len(matches)!=1: raise ValueError('Madrid circuit key unresolved')
                key=matches[0]['Circuit']['Key']
            data=fetch(f'https://api.multiviewer.app/api/v1/circuits/{key}/{t["year"]}')
            corners=data['corners']; row['received']=len(corners)
            nums=[int(c['number']) for c in corners]; row['number_coverage']=len(set(nums)&set(range(1,t['expected']+1)))
            row['api']='PASS'; row['marshal_sectors']=len(data.get('marshalSectors',[])); row['official_sectors']='NOT_VALIDATED'; row['pit']='NOT_VALIDATED'
            if len(corners)!=t['expected'] or sorted(nums)!=list(range(1,t['expected']+1)):
                row['status']='REVIEW_COUNT'; continue
            q=np.array([[c['trackPosition']['x'],c['trackPosition']['y']] for c in sorted(corners,key=lambda c:int(c['number']))],float)
            if not np.isfinite(q).all() or len(set(map(tuple,q)))!=len(q): raise ValueError('invalid corner coordinates')
            row.update(fit(q,p[:-1] if np.allclose(p[0],p[-1]) else p))
            row['label_collision']='NOT_VALIDATED'; row['release']='BLOCKED_LICENSE_AND_REFERENCE_REVIEW'
        except Exception as e:
            row['status']='BLOCKED'; row['error']=f'{type(e).__name__}: {str(e)[:180]}'
        finally: print(json.dumps(row,ensure_ascii=False),flush=True)
    report={'mode':'diagnostic_only','results':rows,'release':'BLOCKED'}
    Path('circuit-validation-report.json').write_text(json.dumps(report,indent=2))
    summary=os.getenv('GITHUB_STEP_SUMMARY')
    if summary:
        with open(summary,'a') as f:
            f.write('## Circuit validation (diagnostic only)\n\n| GP | Received / expected | RMSE | Order | Status |\n|---|---|---|---|---|\n')
            for r in rows: f.write(f"| {r['gp']} | {r.get('received','—')} / {r['expected']} | {r.get('rmse_svg_units','—')} | {r.get('cyclic_order','—')} | {r['status']} |\n")
            f.write('\nNo provider coordinates exported. Candidate fits require independent reference and license review.\n')
    return 0 if all(r['status']=='CANDIDATE' for r in rows) else 1
if __name__=='__main__': sys.exit(main())
