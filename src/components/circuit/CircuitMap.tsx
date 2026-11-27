import React,{useEffect,useState} from 'react';
import {circuitMeta} from '../../data/circuits';
import {annotations,type Point} from '../../data/circuitAnnotations';
import './circuit.css';
type Asset={path:string;transform:string;layoutId:string;coordinates?:Point[]};
type Props={gp:string;interactive?:boolean;tr?:(s:string)=>string};
const identity=(s:string)=>s;
let library:Promise<Record<string,Asset>>|undefined;
function load(){return library??=(fetch(import.meta.env.BASE_URL+'circuits.json').then(r=>{if(!r.ok)throw Error('missing');return r.json()}).catch(e=>{library=undefined;throw e}));}
type Layer = 'labels'|'pit'|'markers'|'sectors';
function useLayer(key:Layer){
 const [on,setOn]=useState(()=>{try{return localStorage.getItem('pitwall.map.layer.'+key)!=='false'}catch{return true}});
 useEffect(()=>{try{localStorage.setItem('pitwall.map.layer.'+key,String(on))}catch{}},[key,on]);
 return [on,setOn] as const;
}
function LayerButton({name,on,available,toggle,tr}:{name:string;on:boolean;available:boolean;toggle:()=>void;tr:(s:string)=>string}){
 return <button className="circuit-layer-button" type="button" disabled={!available} aria-pressed={on&&available} onClick={toggle}><strong>{name}</strong><span><i aria-hidden="true"/>{tr(!available?'미확보':on?'활성화':'비활성화')}</span></button>;
}
export function CircuitMap({gp,interactive=false,tr=identity}:Props){
 const [asset,setAsset]=useState<Asset|null>(null),[failed,setFailed]=useState(false),[turn,setTurn]=useState(1),[labels,setLabels]=useLayer('labels'),[pit,setPit]=useLayer('pit'),[markers,setMarkers]=useLayer('markers'),[sectors,setSectors]=useLayer('sectors');
 useEffect(()=>{let live=true;setAsset(null);setFailed(false);setTurn(1);load().then(d=>{if(live){setAsset(d[gp]||null);setFailed(!d[gp]);}}).catch(()=>{if(live)setFailed(true)});return()=>{live=false}},[gp]);
 const a=asset?annotations[asset.layoutId]:undefined,count=circuitMeta[gp]?.turns||0;
 const selected=a?.corners.find(c=>c.number===turn);
 const coords=asset?.coordinates||[];
 const nearest=(p:Point)=>coords.reduce((best,c,i)=>Math.hypot(c[0]-p[0],c[1]-p[1])<Math.hypot(coords[best][0]-p[0],coords[best][1]-p[1])?i:best,0);
 const segment=(from:number,to:number)=>{const out:Point[]=[];if(!coords.length)return out;for(let i=from;;i=(i-1+coords.length)%coords.length){out.push(coords[i]);if(i===to||out.length>=coords.length)break}return out};
 const practice=!!(a?.start&&a.corners.length===15&&coords.length&&asset?.layoutId==='bahrain-1');
 const sections=practice&&a?.start?[nearest(a.start.point),nearest(a.corners[4].anchor),nearest(a.corners[9].anchor)]:[];
 const focus=selected&&coords.length?nearest(selected.anchor):-1;
 const xy=(p:Point)=>`${p[0]},${p[1]}`;
 return <div className="circuit-engine">
 {asset?<div className="track-static"><svg viewBox="-24 -24 368 248" role={interactive?'group':'img'} aria-label={gp+' circuit layout'}>
 <path d={asset.path} transform={asset.transform} vectorEffect="non-scaling-stroke" fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round"/>
 {interactive&&sectors&&practice&&sections.map((v,i)=><polyline key={i} points={segment(v,sections[(i+1)%3]).map(xy).join(' ')} fill="none" stroke={['#E34D81','#EBC64D','#55B9F0'][i]} strokeWidth="4" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round"/>)}
 {interactive&&pit&&a?.pit&&<g stroke="#E5B95D" fill="none"><polyline points={a.pit.points.map(xy).join(' ')} strokeWidth="2" strokeDasharray="5 4"/><text x={a.pit.entry[0]} y={a.pit.entry[1]} fill="#E5B95D" stroke="none" fontSize="9">PIT IN</text><text x={a.pit.exit[0]} y={a.pit.exit[1]} fill="#E5B95D" stroke="none" fontSize="9">PIT OUT</text></g>}
 {interactive&&markers&&a?.start&&<g transform={`translate(${a.start.point.join(' ')}) rotate(${a.start.angle})`}>{Array.from({length:8},(_,i)=><rect key={i} x={(i%2)*4-4} y={Math.floor(i/2)*4-8} width="4" height="4" fill={(i+Math.floor(i/2))%2?'#fff':'#172027'}/>)}<text x="8" y="-10" fill="#fff" fontSize="9">S/F</text></g>}
 {interactive&&markers&&a?.direction&&<g transform={`translate(${a.direction.point.join(' ')}) rotate(${a.direction.angle})`} stroke="#fff" fill="none" strokeWidth="1.5"><path d="M-8 0H8L3 -4M8 0L3 4"/></g>}
 {interactive&&labels&&selected&&<g pointerEvents="none">{focus>=0&&<polyline points={segment((focus+5)%coords.length,(focus-5+coords.length)%coords.length).map(xy).join(' ')} fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>}<circle cx={selected.anchor[0]} cy={selected.anchor[1]} r="5" fill="#10161b" stroke="#fff" strokeWidth="2"/><line x1={selected.anchor[0]} y1={selected.anchor[1]} x2={selected.label[0]} y2={selected.label[1]} stroke="#fff" strokeWidth="1.4"/></g>}
 {interactive&&labels&&a?.corners.map(c=><g key={c.number} role="button" tabIndex={0} aria-label={`T${c.number}`} aria-pressed={turn===c.number} onClick={()=>setTurn(c.number)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setTurn(c.number)}}} className="circuit-marker"><rect x={c.label[0]-14} y={c.label[1]-13} width="28" height="26" fill="transparent"/><rect stroke={turn===c.number?"#fff":"none"} strokeWidth="1.5" x={c.label[0]-12} y={c.label[1]-10} width="24" height="20" rx="4" fill={turn===c.number?'var(--accent)':'#10161b'}/><text x={c.label[0]} y={c.label[1]+3} textAnchor="middle" fontSize="10" fontWeight="700" fill={turn===c.number?'#10161b':'#e2eaf0'}>T{c.number}</text></g>)}
 </svg><div className="track-credit"><a href="https://github.com/f1db/f1db/tree/9dbbb9f67dc5fa3d499061efb56d24aa4f1e261d/src/assets/circuits" target="_blank" rel="noreferrer">F1DB / Jules Roy</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">CC BY 4.0</a> · Modified</div></div>:<div className="track-unavailable">{tr(failed?'서킷 지도 미확보':'서킷 지도 로딩 중')}</div>}
 {interactive&&<><div className="circuit-layer-controls">{([[tr('코너 번호'),labels,setLabels,!!a?.corners.length],[tr('피트 레인'),pit,setPit,!!a?.pit],[tr('연습 구간'),sectors,setSectors,practice],[tr('S/F · 주행 방향'),markers,setMarkers,!!(a?.start||a?.direction)]] as const).map(([name,on,set,available])=><LayerButton key={name} name={name} on={on} available={available} toggle={()=>set(!on)} tr={tr}/>)}</div>{practice&&sectors&&<div className="practice-guide"><p>{tr('연습용 구간 · 공식 계측 섹터 아님')}</p>{[['#E34D81','S1','제동 및 코너 진입'],['#EBC64D','S2','조향 및 스로틀 조절'],['#55B9F0','S3','탈출 가속 및 직선']].map(([color,id,label])=><div key={id}><i style={{background:color}}/><strong>{id}</strong><span>{tr(label)}</span></div>)}</div>}{a&&<p className="circuit-status">{tr('실제 서킷 기준 근사 위치 · 게임 미검증')}</p>}{!a&&<p className="circuit-status">{tr('지도 주석 좌표 검증 대기 중')}</p>}{count>0&&<><div className="circuit-turn-nav"><button type="button" aria-label={tr('이전 코너')} onClick={()=>setTurn(n=>n===1?count:n-1)}>‹</button><strong>TURN {String(turn).padStart(2,'0')} <small>{turn}/{count}</small></strong><button type="button" aria-label={tr('다음 코너')} onClick={()=>setTurn(n=>n===count?1:n+1)}>›</button></div><div className="circuit-turn-grid">{Array.from({length:count},(_,i)=><button key={i} type="button" aria-pressed={turn===i+1} onClick={()=>setTurn(i+1)}>T{i+1}</button>)}</div><p className="circuit-status">{tr('코너별 공략 데이터 준비 중')}</p></>}</>}
 </div>
}
