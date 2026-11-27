import React,{useState} from 'react';
type Datum={label:string;name:string;value:number|null;color?:string};
export function PerformanceChart({title,mode,data}:{title:string;mode:'rank'|'bar'|'line';data:Datum[]}){
 const [selected,setSelected]=useState<number|null>(null);
 const values=data.flatMap(d=>d.value===null?[]:[d.value]);
 const rank=mode==='rank',w=Math.max(300,data.length*42+48),h=170,left=36,right=w-12,top=16,bottom=140;
 const max=rank?Math.max(20,...values):Math.max(1,...values),min=rank?1:Math.min(0,...values);
 const y=(v:number)=>rank?top+(v-min)/(max-min)*(bottom-top):bottom-(v-min)/(max-min)*(bottom-top);
 const x=(i:number)=>left+(right-left)*(i+.5)/Math.max(1,data.length);
 const ticks=rank?[1,5,10,15,20,...(max>20?[max]:[])]:Array.from({length:5},(_,i)=>min+(max-min)*i/4);
 const segments:string[]=[];let segment:string[]=[];data.forEach((d,i)=>{if(d.value===null){if(segment.length)segments.push(segment.join(' '));segment=[];}else segment.push(`${x(i)},${y(d.value)}`)});if(segment.length)segments.push(segment.join(' '));
 const chosen=selected===null?undefined:data[selected];
 return <section className="analytics-chart"><h3>{title}</h3><div className="chart-scroll" tabIndex={0}><svg viewBox={`0 0 ${w} ${h}`} style={{minWidth:w}} role="img" aria-label={title}>{ticks.map((t,i)=><g key={i}><line x1={left} x2={right} y1={y(t)} y2={y(t)} stroke="#34414a" strokeDasharray="3 4"/><text x={left-5} y={y(t)+3} textAnchor="end">{rank?'P'+t:Number(t.toFixed(1))}</text></g>)}{mode!=='bar'&&segments.map((p,i)=><polyline key={i} points={p} fill="none" stroke="var(--accent)" strokeWidth="2.5"/>)}{data.map((d,i)=><g key={i} onClick={()=>setSelected(i)}><title>{d.name}: {d.value??'—'}</title><rect x={x(i)-18} y={top} width="36" height={bottom-top} fill="transparent"/>{d.value!==null&&(mode==='bar'?<rect x={x(i)-12} y={Math.min(y(0),y(d.value))} width="24" height={Math.max(1,Math.abs(y(0)-y(d.value)))} rx="2" fill={d.color||'var(--accent)'}/>:<circle cx={x(i)} cy={y(d.value)} r="4" fill="var(--accent)"/>)}<text x={x(i)} y={bottom+18} textAnchor="middle">{d.label}</text></g>)}</svg></div><div className="chart-detail" aria-live="polite">{chosen?`${chosen.label} · ${chosen.name} · ${chosen.value===null?'—':rank?'P'+chosen.value:chosen.value+' PTS'}`:' '}</div></section>
}
