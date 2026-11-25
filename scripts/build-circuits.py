import json, math, pathlib, urllib.request, urllib.parse, time
ROOT=pathlib.Path(__file__).resolve().parents[1]
TARGETS=json.loads((ROOT/'scripts/circuit-targets.json').read_text())
OUT=ROOT/'public/circuits.json'
ENDPOINTS=['https://overpass-api.de/api/interpreter','https://overpass.kumi.systems/api/interpreter']
def distance(a,b):
 return 111.195*math.hypot(b[0]-a[0],(b[1]-a[1])*math.cos(math.radians((a[0]+b[0])/2)))
def candidate(elements,target):
 # Accept only isolated, closed raceway components, never guess a route at branches.
 ways={e['id']:e for e in elements if e.get('type')=='way' and len(e.get('nodes',[]))>=2 and len(e.get('geometry',[]))==len(e['nodes']) and not any(x in str(e.get('tags',{})).lower() for x in ('pit lane','pitlane','pit_lane','kart'))}
 ends={}
 for i,w in ways.items():
  for n in (w['nodes'][0],w['nodes'][-1]): ends.setdefault(n,[]).append(i)
 seen=set(); candidates=[]
 for i,w in ways.items():
  if i in seen: continue
  comp={i}; todo=[i]
  while todo:
   a=ways[todo.pop()]
   for n in (a['nodes'][0],a['nodes'][-1]):
    for j in ends[n]:
     if j not in comp: comp.add(j);todo.append(j)
  seen.update(comp)
  if any(len(ends[n])!=2 for j in comp for n in (ways[j]['nodes'][0],ways[j]['nodes'][-1])):continue
  start=w['nodes'][0]; node=start; used=set(); pts=[]
  while len(used)<len(comp):
   options=[j for j in ends[node] if j not in used]
   if not options:break
   j=options[0]; a=ways[j]; forward=a['nodes'][0]==node; g=a['geometry'] if forward else a['geometry'][::-1]; node=a['nodes'][-1] if forward else a['nodes'][0]; used.add(j); pts.extend((x['lat'],x['lon']) for x in (g if not pts else g[1:]))
  if node!=start or used!=comp or len(pts)<12:continue
  km=sum(distance(a,b) for a,b in zip(pts,pts[1:])); expected=target.get('km')
  if not expected or abs(km-expected)/expected>.15:continue
  candidates.append((abs(km-expected),km,pts,sorted(comp)))
 if not candidates:return None
 _,km,pts,ids=min(candidates,key=lambda x:x[0]); lat=target['lat']; xy=[((b-target['lon'])*math.cos(math.radians(lat)), -(a-lat)) for a,b in pts]; xs,ys=zip(*xy); scale=min(280/max(max(xs)-min(xs),1e-9),160/max(max(ys)-min(ys),1e-9)); cx=(max(xs)+min(xs))/2;cy=(max(ys)+min(ys))/2
 path='M '+' L '.join(f'{160+(x-cx)*scale:.2f} {100+(y-cy)*scale:.2f}' for x,y in xy)+' Z'
 return {'path':path,'km':round(km,3),'ways':ids,'coordinates':pts,'source':'OpenStreetMap','license':'ODbL-1.0','status':'candidate'}
def main():
 old=json.loads(OUT.read_text()) if OUT.exists() else {}; report={}; cache={}
 for key,t in TARGETS.items():
  if key in old:report[key]='retained';continue
  if 'km' not in t:report[key]='missing reference length';continue
  loc=(t['lat'],t['lon']); result=None
  if loc in cache:result=cache[loc]
  else:
   q=f'[out:json][timeout:45];way(around:3500,{loc[0]},{loc[1]})[highway=raceway];out geom;'
   for endpoint in ENDPOINTS:
    try:
     req=urllib.request.Request(endpoint,data=urllib.parse.urlencode({'data':q}).encode(),headers={'User-Agent':'PITWALL-circuit-library/0.3.3 (github.com/18ctid94/f1-pitwall)'})
     with urllib.request.urlopen(req,timeout=65) as r: data=json.load(r)
     result=candidate(data['elements'],t);break
    except Exception as e: print(key,endpoint,str(e),flush=True)
   cache[loc]=result;time.sleep(3)
  if result:old[key]=result
  report[key]='candidate' if result else 'unavailable';print(key,report[key],flush=True)
 OUT.parent.mkdir(exist_ok=True);OUT.write_text(json.dumps(old,ensure_ascii=False,indent=2));(ROOT/'circuit-report.json').write_text(json.dumps(report,indent=2));print('Available:',len(old),'/',len(TARGETS))
if __name__=='__main__':main()
