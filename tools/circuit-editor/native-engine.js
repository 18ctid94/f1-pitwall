/* F1DB geometry-derived candidates; no external data or network calls. */
(function(root){
function detect(input){
 const p=input.map(a=>a.map(Number)); if(p.length<4||p.some(a=>a.length!==2||a.some(v=>!Number.isFinite(v))))throw Error('Invalid geometry');
 if(Math.hypot(p[0][0]-p.at(-1)[0],p[0][1]-p.at(-1)[1])<1e-6)p.pop();
 const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]); const lengths=[0]; for(let i=0;i<p.length;i++)lengths.push(lengths.at(-1)+dist(p[i],p[(i+1)%p.length]));
 const total=lengths.at(-1); if(total<=0)throw Error('Empty path'); const n=720; let j=0; const q=Array.from({length:n},(_,i)=>{let s=i*total/n;while(j<p.length-1&&lengths[j+1]<=s)j++;let t=(s-lengths[j])/(lengths[j+1]-lengths[j]||1),a=p[j],b=p[(j+1)%p.length];return a.map((v,k)=>v+t*(b[k]-v))});
 const at=i=>q[(i+n)%n]; const angle=(i,w)=>{let a=at(i-w),b=at(i),c=at(i+w),u=[b[0]-a[0],b[1]-a[1]],v=[c[0]-b[0],c[1]-b[1]];return Math.atan2(u[0]*v[1]-u[1]*v[0],u[0]*v[0]+u[1]*v[1])};
 const scores=q.map((_,i)=>Math.abs(angle(i,4))*.65+Math.abs(angle(i,9))*.35); const smooth=scores.map((_,i)=>[-2,-1,0,1,2].reduce((s,k)=>s+scores[(i+k+n)%n],0)/5);
 const peaks=smooth.map((s,i)=>({s,i})).filter(({s,i})=>s>=0.12&&s>=smooth[(i+n-1)%n]&&s>smooth[(i+1)%n]).sort((a,b)=>b.s-a.s||a.i-b.i); const chosen=[];
 for(const a of peaks)if(chosen.every(b=>Math.min(Math.abs(a.i-b.i),n-Math.abs(a.i-b.i))>=9))chosen.push(a);
 return chosen.sort((a,b)=>a.i-b.i).map(({i,s},k)=>({id:'C'+String(k+1).padStart(2,'0'),anchor:q[i].map(v=>+v.toFixed(3)),fraction:i/n,score:+s.toFixed(4)}));
}
root.PitwallNative={detect}; if(typeof module!=='undefined')module.exports=root.PitwallNative;
})(typeof globalThis!=='undefined'?globalThis:this);
