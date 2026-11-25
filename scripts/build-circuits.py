"""Offline F1DB SVG conversion; requires fonttools. Coordinates are diagram XY, not GPS."""
import json, math, pathlib, xml.etree.ElementTree as ET
from fontTools.svgLib.path import parse_path
from fontTools.pens.basePen import BasePen
ROOT=pathlib.Path(__file__).resolve().parents[1]
class Sampler(BasePen):
    def __init__(self): super().__init__(None); self.points=[]; self.closed=False; self.start=None
    def _moveTo(self,p):
        if self.points: raise ValueError('multiple subpaths')
        self.start=p; self.points.append(p)
    def _lineTo(self,p): self.points.append(p)
    def _curveToOne(self,b,c,d):
        a=self.points[-1]
        for i in range(1,25):
            t=i/24; u=1-t; self.points.append(tuple(u**3*a[k]+3*u*u*t*b[k]+3*u*t*t*c[k]+t**3*d[k] for k in (0,1)))
    def _qCurveToOne(self,b,c):
        a=self.points[-1]
        for i in range(1,25):
            t=i/24; u=1-t; self.points.append(tuple(u*u*a[k]+2*u*t*b[k]+t*t*c[k] for k in (0,1)))
    def _closePath(self): self.points.append(self.start); self.closed=True
    def _endPath(self): pass
mapping=json.loads((ROOT/'scripts/circuit-targets.json').read_text()); assets={}; report={}
for name,ident in mapping.items():
    root=ET.parse(ROOT/'public/circuits'/f'{ident}.svg').getroot(); paths=list(root.iter('{http://www.w3.org/2000/svg}path'))
    assert len(paths)==1 and not root.get('transform') and not paths[0].get('transform')
    d=paths[0].get('d'); pen=Sampler(); parse_path(d,pen); pts=pen.points
    assert pen.closed and len(pts)>20 and all(math.isfinite(v) for p in pts for v in p)
    assert math.dist(pts[0],pts[-1])<1e-6
    xs,ys=zip(*pts); w=max(xs)-min(xs); h=max(ys)-min(ys); assert w>0 and h>0
    scale= min(288/w,168/h); ox=(320-w*scale)/2-min(xs)*scale; oy=(200-h*scale)/2-min(ys)*scale
    xy=[(x*scale+ox,y*scale+oy) for x,y in pts]; lengths=[0.]
    for a,b in zip(xy,xy[1:]): lengths.append(lengths[-1]+math.dist(a,b))
    assert lengths[-1]>0
    import bisect
    coords=[]
    for i in range(501):
        target=lengths[-1]*i/500; j=min(len(xy)-2,max(0,bisect.bisect_right(lengths,target)-1)); span=lengths[j+1]-lengths[j]; t=(target-lengths[j])/span if span else 0
        coords.append([round(xy[j][k]+t*(xy[j+1][k]-xy[j][k]),3) for k in (0,1)])
    coords[-1]=coords[0]; assert all(0<=x<=320 and 0<=y<=200 for x,y in coords)
    assets[name]={'layoutId':ident,'path':d,'transform':f'translate({ox:.8f} {oy:.8f}) scale({scale:.8f})','coordinates':coords,'coordinateSpace':'diagram-xy-320x200','source':'F1DB / Jules Roy','sourceRevision':'9dbbb9f67dc5fa3d499061efb56d24aa4f1e261d'}
    report[name]={'layout':ident,'closed':True,'samples':len(coords)}
assert len(set(mapping.values()))==25 and len(assets)==26
(ROOT/'public/circuits.json').write_text(json.dumps(assets,ensure_ascii=False,separators=(',',':'))+'\n');(ROOT/'circuit-report.json').write_text(json.dumps(report,indent=2)+'\n');print('Validated',len(assets),'GP keys / 25 layouts')
