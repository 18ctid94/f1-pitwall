"""FIA-only discovery. No production writes; PDF downloads explicit and local."""
import argparse, datetime as dt, hashlib, json, re, time
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit, quote, unquote
from urllib.request import Request, urlopen, build_opener, HTTPRedirectHandler
ROOT=Path(__file__).resolve().parents[1]
BASE='https://www.fia.com/documents/championships/fia-formula-one-world-championship-14/season/'
LOCAL=ROOT/'local-references'/'fia'

def allowed(url):
    p=urlsplit(url)
    return p.scheme=='https' and p.netloc in ('www.fia.com','fia.com','api.fia.com')
class Redirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        if not allowed(newurl): raise ValueError('Non-FIA redirect blocked')
        return super().redirect_request(req,fp,code,msg,headers,newurl)

def fetch(url, limit):
    if not allowed(url): raise ValueError('Non-FIA URL blocked')
    time.sleep(1)
    with build_opener(Redirect()).open(Request(url,headers={'User-Agent':'PITWALL-reference-audit/6.4 (public document research)'}),timeout=25) as r:
        b=r.read(limit+1)
        if len(b)>limit: raise ValueError('Size limit exceeded')
        return b
class Links(HTMLParser):
    def __init__(self): super().__init__(convert_charrefs=True); self.items=[]; self.current=None
    def handle_starttag(self,tag,attrs):
        if tag=='a': self.current=[dict(attrs).get('href',''),[]]
    def handle_data(self,data):
        if self.current is not None: self.current[1].append(data)
    def handle_endtag(self,tag):
        if tag=='a' and self.current is not None:
            self.items.append((self.current[0],' '.join(' '.join(self.current[1]).split()))); self.current=None

def discover(html,page,season):
    p=Links(); p.feed(html); results={}
    for href,title in p.items:
        url=urljoin(page,href); path=unquote(urlsplit(url).path); text=title+' '+path.replace('_',' ').replace('-',' ')
        if not allowed(url) or not path.lower().endswith('.pdf') or not re.search(r'circuit\s+map',text,re.I): continue
        if not re.search(r'\b'+str(season)+r'\b',path.replace('_',' ')): continue
        rev=re.search(r'\b(?:v|version)\s*(\d+)\b',text,re.I); doc=re.search(r'\bdoc(?:ument)?\s*(\d+)',title,re.I); date=re.search(r'\b\d{2}\.\d{2}\.\d{2,4}\s+\d{2}:\d{2}\s*(?:CET|CEST)?',title)
        results[url]={'url':url,'title':title,'revision_hint':int(rev[1]) if rev else None,'document_number':int(doc[1]) if doc else None,'published_hint':date[0].strip() if date else None,'recalled_hint':bool(re.search('recalled|withdrawn',title,re.I))}
    return list(results.values())

def collect(target,download):
    y=target['season']; page=BASE+f'season-{y}-{2071+y-2025}/event/'+quote(target['event'])
    result={**target,'archive_url':page,'status':'PENDING','documents':[],'selected':None}
    try:
        docs=discover(fetch(page,12_000_000).decode('utf-8','replace'),page,y)
        result['documents']=docs; result['status']='CANDIDATES_REVIEW' if docs else 'NO_MATCH_REVIEW'
        for d in docs:
            if not download: continue
            try:
                b=fetch(d['url'],40_000_000)
                if not b.startswith(b'%PDF-'): raise ValueError('Not a PDF')
                h=hashlib.sha256(b).hexdigest(); dest=LOCAL/'objects'/(h+'.pdf'); dest.parent.mkdir(parents=True,exist_ok=True)
                if not dest.exists() or hashlib.sha256(dest.read_bytes()).hexdigest()!=h: dest.write_bytes(b)
                d.update(sha256=h,bytes=len(b),local_path=str(dest.relative_to(ROOT)),download_status='OK')
            except Exception as e: d.update(download_status='ERROR',error=str(e))
    except Exception as e: result.update(status='FETCH_ERROR',error=str(e))
    return result

def main():
    ap=argparse.ArgumentParser(); ap.add_argument('--season',type=int,choices=[2025,2026]); ap.add_argument('--layout'); ap.add_argument('--download',action='store_true'); ap.add_argument('--output',type=Path,default=LOCAL/'reference-report.json'); a=ap.parse_args()
    if a.download and __import__('os').environ.get('GITHUB_ACTIONS')=='true': ap.error('PDF downloads are local only')
    targets=json.loads((ROOT/'scripts/fia-document-targets.json').read_text(encoding='utf-8')); targets=[t for t in targets if (not a.season or t['season']==a.season) and (not a.layout or t['layout']==a.layout)]
    if not targets: ap.error('No matching targets')
    rows=[]
    for t in targets:
        r=collect(t,a.download); rows.append(r); print(t['season'],t['layout'],r['status'],len(r['documents']),flush=True)
    report={'schema':'pitwall-fia-discovery-v1','version':'6.4','generated_at':dt.datetime.now(dt.timezone.utc).isoformat(),'release_status':'BLOCKED','targets':len(rows),'candidate_coverage':sum(bool(r['documents']) for r in rows),'results':rows}
    a.output.parent.mkdir(parents=True,exist_ok=True); a.output.write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    return 1 if all(r['status']=='FETCH_ERROR' for r in rows) else 0
if __name__=='__main__': raise SystemExit(main())
