"""Diagnostic only: never persist provider coordinates or modify application data."""
import json, os, sys, urllib.request, urllib.error
from pathlib import Path
import numpy as np
from scipy.spatial import cKDTree
from scipy.optimize import minimize
ROOT = Path(__file__).resolve().parents[1]

def fetch(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent':'PITWALL-validation/3.0'}), timeout=25) as r:
        return json.load(r)

from circuit_fit_v3 import fit

def main():
    assets=json.loads((ROOT/'public/circuits.json').read_text()); targets=json.loads((ROOT/'scripts/circuit-validation-targets.json').read_text()); rows=[]; baseline=json.loads((ROOT/'scripts/circuit-validation-baseline-v2.json').read_text()); baseline={(r['gp'],r['year']):r for r in baseline['results']}
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
                row['status']='REVIEW_COUNT'; row['duplicate_number_count']=len(nums)-len(set(nums)); row['letter_count']=sum(bool(c.get('letter')) for c in corners); continue
            q=np.array([[c['trackPosition']['x'],c['trackPosition']['y']] for c in sorted(corners,key=lambda c:int(c['number']))],float)
            if not np.isfinite(q).all() or len(set(map(tuple,q)))!=len(q): raise ValueError('invalid corner coordinates')
            row.update(fit(q,p[:-1] if np.allclose(p[0],p[-1]) else p))
            row['label_collision']='NOT_VALIDATED'; row['release']='BLOCKED_LICENSE_AND_REFERENCE_REVIEW'
        except Exception as e:
            row['status']='API_BLOCKED' if isinstance(e,(urllib.error.URLError,TimeoutError)) else 'DIAGNOSTIC_ERROR'; row['error']=f'{type(e).__name__}: {str(e)[:180]}'
        finally:
            row['release']='BLOCKED_LICENSE_AND_REFERENCE_REVIEW'
            old=baseline.get((t['gp'],t['year']),{})
            if 'ordered_rmse_svg_units' in old and 'ordered_rmse_svg_units' in row:
                row['v2_ordered_rmse']=old['ordered_rmse_svg_units']; row['delta_ordered_rmse']=round(row['ordered_rmse_svg_units']-old['ordered_rmse_svg_units'],3)
            print(json.dumps(row,ensure_ascii=False),flush=True)
    report={'toolkit_version':3,'mode':'diagnostic_only','results':rows,'release':'BLOCKED'}
    Path('circuit-validation-report.json').write_text(json.dumps(report,indent=2))
    summary=os.getenv('GITHUB_STEP_SUMMARY')
    if summary:
        with open(summary,'a') as f:
            f.write('## Circuit validation (diagnostic only)\n\n| GP | Received / expected | RMSE | Order | Status |\n|---|---|---|---|---|\n')
            for r in rows: f.write(f"| {r['gp']} | {r.get('received','—')} / {r['expected']} | {r.get('rmse_svg_units','—')} | {r.get('cyclic_order','—')} | {r['status']} |\n")
            f.write('\nNo provider coordinates exported. Candidate fits require independent reference and license review.\n')
    return 0
if __name__=='__main__': sys.exit(main())
