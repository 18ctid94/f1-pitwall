import React,{useEffect,useState} from 'react';
import {circuitMeta} from '../../data/circuits';
import {annotations,type Point} from '../../data/circuitAnnotations';
import './circuit.css';
type Asset={path:string;transform:string;layoutId:string};
type Props={gp:string;interactive?:boolean;tr?:(s:string)=>string};
const identity=(s:string)=>s;
let library:Promise<Record<string,Asset>>|undefined;
function load(){return library??=(fetch(import.meta.env.BASE_URL+'circuits.json').then(r=>{if(!r.ok)throw Error('missing');return r.json()}).catch(e=>{library=undefined;throw e}));}
export function CircuitMap({gp,interactive=false,tr=identity}:Props){
 const [asset,setAsset]=useState<Asset|null>(null),[failed,setFailed]=useState(false),[turn,setTurn]=useState(1),[labels,setLabels]=useState(true),[pit,setPit]=useState(true),[markers,setMarkers]=useState(true);
 useEffect(()=>{let live=true;setAsset(null);setFailed(false);setTurn(1);load().then(d=>{if(live){setAsset(d[gp]||null);setFailed(!d[gp]);}}).catch(()=>{if(live)setFailed(true)});return()=>{live=false}},[gp]);
 const a=asset?annotations[asset.layoutId]:undefined,count=circuitMeta[gp]?.turns||0;
 const selected=a?.corners.find(c=>c.number===turn);
 const xy=(p:Point)=>`${p[0]},${p[1]}`;
 return <div className="circuit-engine">
 {asset?<div className="track-static"><svg viewBox="-24 -24 368 248" role={interactive?'group':'img'} aria-label={gp+' circuit layout'}>
 <path d={asset.path} transform={asset.transform} vectorEffect="non-scaling-stroke" fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round"/>
 {interactive&&pit&&a?.pit&&<g stroke="#E5B95D" fill="none"><polyline points={a.pit.points.map(xy).join(' ')} strokeWidth="2" strokeDasharray="5 4"/><text x={a.pit.entry[0]} y={a.pit.entry[1]} fill="#E5B95D" stroke="none" fontSize="9">PIT IN</text><text x={a.pit.exit[0]} y={a.pit.exit[1]} fill="#E5B95D" stroke="none" fontSize="9">PIT OUT</text></g>}
 {interactive&&markers&&a?.start&&<g transform={`translate(${a.start.point.join(' ')}) rotate(${a.start.angle})`}>{Array.from({length:8},(_,i)=><rect key={i} x={(i%2)*4-4} y={Math.floor(i/2)*4-8} width="4" height="4" fill={(i+Math.floor(i/2))%2?'#fff':'#172027'}/>)}<text x="8" y="-10" fill="#fff" fontSize="9">S/F</text></g>}
 {interactive&&markers&&a?.direction&&<g transform={`translate(${a.direction.point.join(' ')}) rotate(${a.direction.angle})`} stroke="#fff" fill="none" strokeWidth="1.5"><path d="M-8 0H8L3 -4M8 0L3 4"/></g>}
 {interactive&&selected&&<circle cx={selected.anchor[0]} cy={selected.anchor[1]} r="6" fill="none" stroke="var(--accent)" strokeWidth="2"/>}
 {interactive&&labels&&a?.corners.map(c=><g key={c.number} role="button" tabIndex={0} aria-label={`T${c.number}`} aria-pressed={turn===c.number} onClick={()=>setTurn(c.number)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setTurn(c.number)}}} className="circuit-marker"><rect x={c.label[0]-12} y={c.label[1]-10} width="24" height="20" rx="4" fill={turn===c.number?'var(--accent)':'#10161b'}/><text x={c.label[0]} y={c.label[1]+3} textAnchor="middle" fontSize="10" fontWeight="700" fill={turn===c.number?'#10161b':'#e2eaf0'}>T{c.number}</text></g>)}
 </svg><div className="track-credit"><a href="https://github.com/f1db/f1db/tree/9dbbb9f67dc5fa3d499061efb56d24aa4f1e261d/src/assets/circuits" target="_blank" rel="noreferrer">F1DB / Jules Roy</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">CC BY 4.0</a> · Modified</div></div>:<div className="track-unavailable">{tr(failed?'서킷 지도 미확보':'서킷 지도 로딩 중')}</div>}
 {interactive&&<><div className="circuit-layer-controls">{([[tr('코너 번호'),labels,setLabels,!!a?.corners.length],[tr('피트 레인'),pit,setPit,!!a?.pit],[tr('스타트 및 주행 방향'),markers,setMarkers,!!(a?.start||a?.direction)]] as const).map(([name,on,set,available])=><button key={name} type="button" disabled={!available} aria-pressed={on&&available} onClick={()=>set(!on)}>{name} · {available?(on?'ON':'OFF'):tr('미확보')}</button>)}</div>{!a&&<p className="circuit-status">{tr('지도 주석 좌표 검증 대기 중')}</p>}{count>0&&<><div className="circuit-turn-nav"><button type="button" aria-label={tr('이전 코너')} onClick={()=>setTurn(n=>n===1?count:n-1)}>‹</button><strong>TURN {String(turn).padStart(2,'0')} <small>{turn}/{count}</small></strong><button type="button" aria-label={tr('다음 코너')} onClick={()=>setTurn(n=>n===count?1:n+1)}>›</button></div><div className="circuit-turn-grid">{Array.from({length:count},(_,i)=><button key={i} type="button" aria-pressed={turn===i+1} onClick={()=>setTurn(i+1)}>T{i+1}</button>)}</div><p className="circuit-status">{tr('코너별 공략 데이터 준비 중')}</p></>}</>}
 </div>
}
