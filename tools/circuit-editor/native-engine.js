/* F1DB geometry-derived candidates; no external data or network calls. */
(function(root){
function detect(input, options={}){
 const p=input.map(a=>a.map(Number)); if(p.length<4||p.some(a=>a.length!==2||a.some(v=>!Number.isFinite(v))))throw Error('Invalid geometry');
 if(Math.hypot(p[0][0]-p.at(-1)[0],p[0][1]-p.at(-1)[1])<1e-6)p.pop();
 const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]); const lengths=[0]; for(let i=0;i<p.length;i++)lengths.push(lengths.at(-1)+dist(p[i],p[(i+1)%p.length]));
 const total=lengths.at(-1); if(total<=0)throw Error('Empty path'); const n=720; let j=0; const q=Array.from({length:n},(_,i)=>{let s=i*total/n;while(j<p.length-1&&lengths[j+1]<=s)j++;let t=(s-lengths[j])/(lengths[j+1]-lengths[j]||1),a=p[j],b=p[(j+1)%p.length];return a.map((v,k)=>v+t*(b[k]-v))});
 const at=i=>q[(i+n)%n]; const angle=(i,w)=>{let a=at(i-w),b=at(i),c=at(i+w),u=[b[0]-a[0],b[1]-a[1]],v=[c[0]-b[0],c[1]-b[1]];return Math.atan2(u[0]*v[1]-u[1]*v[0],u[0]*v[0]+u[1]*v[1])};
 const scores=q.map((_,i)=>Math.abs(angle(i,4))*.65+Math.abs(angle(i,9))*.35); const smooth=scores.map((_,i)=>[-2,-1,0,1,2].reduce((s,k)=>s+scores[(i+k+n)%n],0)/5);
 if(options.baseline!==true){
 const median=a=>{let b=[...a].sort((x,y)=>x-y);return b[Math.floor(b.length/2)]};
 const floor=Math.max(.065,Math.min(.18,median(smooth)*1.35));
 const prominence= i=>smooth[i]-Math.max(Math.min(...Array.from({length:13},(_,k)=>smooth[(i-k+n)%n])),Math.min(...Array.from({length:13},(_,k)=>smooth[(i+k)%n])));
 const peaks=smooth.map((s,i)=>({s,i,p:prominence(i),sign:Math.sign(angle(i,4))})).filter(a=>a.s>=floor&&a.p>=Math.max(.035,floor*.45)&&a.s>=smooth[(a.i+n-1)%n]&&a.s>smooth[(a.i+1)%n]).sort((a,b)=>b.p-a.p||b.s-a.s||a.i-b.i);
 const chosen=[];for(const a of peaks)if(chosen.every(b=>{let d=Math.min(Math.abs(a.i-b.i),n-Math.abs(a.i-b.i));return d>= (a.sign===b.sign?12:6)}))chosen.push(a);
 return chosen.sort((a,b)=>a.i-b.i).map(({i,s,p},k)=>({id:"C"+String(k+1).padStart(2,"0"),anchor:q[i].map(v=>+v.toFixed(3)),fraction:i/n,score:+s.toFixed(4),prominence:+p.toFixed(4)}));
 }
 const peaks=smooth.map((s,i)=>({s,i})).filter(({s,i})=>s>=0.12&&s>=smooth[(i+n-1)%n]&&s>smooth[(i+1)%n]).sort((a,b)=>b.s-a.s||a.i-b.i); const chosen=[];
 for(const a of peaks)if(chosen.every(b=>Math.min(Math.abs(a.i-b.i),n-Math.abs(a.i-b.i))>=9))chosen.push(a);
 return chosen.sort((a,b)=>a.i-b.i).map(({i,s},k)=>({id:'C'+String(k+1).padStart(2,'0'),anchor:q[i].map(v=>+v.toFixed(3)),fraction:i/n,score:+s.toFixed(4)}));
}
function benchmark(candidates,corners){
 const refs=Object.entries(corners||{}).filter(([k,v])=>v.anchor).sort((a,b)=>Number(a[0])-Number(b[0]));if(!refs.length||!candidates.length)return null;
 // Ordered partial matching over both directions and every cyclic offset. Unmatched penalty is explicit.
 const penalty=12;let best=null;for(const reverse of [false,true])for(let offset=0;offset<candidates.length;offset++){
 const seq=Array.from({length:candidates.length},(_,j)=>candidates[(offset+(reverse?-j:j)+candidates.length)%candidates.length]);let m=refs.length,n=seq.length,dp=Array.from({length:m+1},()=>Array(n+1).fill(Infinity)),back=Array.from({length:m+1},()=>Array(n+1));dp[0][0]=0;
 for(let i=0;i<=m;i++)for(let j=0;j<=n;j++){let v=dp[i][j];function put(a,b,c,k){if(c<dp[a][b]){dp[a][b]=c;back[a][b]=k}}if(i<m)put(i+1,j,v+penalty,'r');if(j<n)put(i,j+1,v+penalty,'c');if(i<m&&j<n){let a=refs[i][1].anchor,b=seq[j].anchor;put(i+1,j+1,v+Math.hypot(a[0]-b[0],a[1]-b[1]),'m')}}
 if(!best||dp[m][n]<best.cost){let i=m,j=n,pairs=[],missing=[],extra=[];while(i||j){let k=back[i][j];if(k==='m'){let [turn,r]=refs[--i],c=seq[--j];pairs.push({turn,candidate:c.id,error:Math.hypot(r.anchor[0]-c.anchor[0],r.anchor[1]-c.anchor[1])})}else if(k==='r')missing.push(refs[--i][0]);else extra.push(seq[--j].id)}best={cost:dp[m][n],reverse,offset,pairs:pairs.reverse(),missing,extra};}}
 best.rmse=best.pairs.length?Math.sqrt(best.pairs.reduce((s,p)=>s+p.error**2,0)/best.pairs.length):null;best.penalty=penalty;return best;
}
root.PitwallNative={detect,benchmark}; if(typeof module!=='undefined')module.exports=root.PitwallNative;
})(typeof globalThis!=='undefined'?globalThis:this);
