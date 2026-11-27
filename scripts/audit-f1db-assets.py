"""Offline F1DB asset inventory. No network or production writes."""
import argparse, collections, hashlib, json, re, zipfile
from pathlib import Path
import xml.etree.ElementTree as ET

def sha(b): return hashlib.sha256(b).hexdigest()
def audit(source, targets):
    groups=collections.defaultdict(dict)
    with zipfile.ZipFile(source) as z:
        for name in sorted(z.namelist()):
            if '/src/assets/circuits/' not in name or not name.endswith('.svg'): continue
            b=z.read(name)
            if re.search(br'<!\s*(DOCTYPE|ENTITY)',b,re.I): raise ValueError(name)
            root=ET.fromstring(b)
            paths=[e for e in root.iter() if e.tag.split('}')[-1]=='path']
            ds=[e.get('d','') for e in paths]
            style=Path(name).parent.name
            groups[Path(name).stem][style]={'source':name,'sha256':sha(b),'bytes':len(b),'pathCount':len(ds),'uniquePaths':len(set(ds)),'pathHashes':sorted({sha(d.encode()) for d in ds}),'closedSyntax':all(d.rstrip().lower().endswith('z') for d in ds) and bool(ds),'transforms':[e.get('transform') for e in root.iter() if 'transform' in e.attrib],'width':root.get('width'),'height':root.get('height'),'viewBox':root.get('viewBox')}
    rows={k:{'variants':v,'samePathData':len({tuple(x['pathHashes']) for x in v.values()})==1,'transformReview':any(x['transforms'] for x in v.values())} for k,v in sorted(groups.items())}
    missing=[t['layout'] for t in targets if t['layout'] not in rows]
    return {'schema':'pitwall-f1db-audit-v1','archiveSha256':sha(Path(source).read_bytes()),'assetCount':sum(len(v) for v in groups.values()),'layoutCount':len(rows),'targetCount':len(targets),'missingTargets':missing,'targets':[dict(t,assetStatus='FOUND' if t['layout'] in rows else 'MISSING') for t in targets],'layouts':rows,'releaseStatus':'BLOCKED','limitations':['Path hashes compare literal d strings, not rendered geometry.','Closure is syntax only; no geometric sampling or FIA validation.']}

def main():
    p=argparse.ArgumentParser(); p.add_argument('archive',type=Path); p.add_argument('--targets',type=Path,default=Path(__file__).with_name('f1db-audit-targets.json')); p.add_argument('--output',type=Path,default=Path('local-references/f1db/audit.json')); a=p.parse_args(); r=audit(a.archive,json.loads(a.targets.read_text())); a.output.parent.mkdir(parents=True,exist_ok=True); a.output.write_text(json.dumps(r,indent=2)+'\n'); print({k:r[k] for k in ('assetCount','layoutCount','targetCount','missingTargets','releaseStatus')}); return bool(r['missingTargets'])
if __name__=='__main__': raise SystemExit(main())
