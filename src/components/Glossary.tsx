import React,{useState} from 'react';
import {glossary} from '../data/glossary';
export function Glossary({openDriving}:{openDriving:()=>void}){
 const [query,setQuery]=useState(''),[category,setCategory]=useState('전체'),[year,setYear]=useState('전체');
 const cats=['전체',...Array.from(new Set(glossary.map(t=>t.category)))];
 const q=query.trim().toLowerCase();
 const rows=glossary.filter(t=>(category==='전체'||t.category===category)&&(year==='전체'||!t.year||t.year===year)&&[t.en,t.ko,t.definition,t.game,t.category].join(' ').toLowerCase().includes(q));
 return <section className="kb-glossary"><p className="eyebrow">F1 GLOSSARY</p><h1>F1 용어집</h1><p className="kb-muted">기술, 전략, 규정과 게임 활용법을 한곳에서.</p><label>용어 검색<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="예: Apex, 언더컷, 타이어"/></label><label>시즌 필터<select value={year} onChange={e=>setYear(e.target.value)}><option>전체</option><option>2025</option><option>2026</option></select></label><div className="kb-filters" aria-label="카테고리">{cats.map(c=><button key={c} aria-pressed={c===category} onClick={()=>setCategory(c)}>{c}</button>)}</div><p className="kb-muted" aria-live="polite">{rows.length}개 용어</p><div className="kb-terms">{rows.map(t=><details className="kb-term" key={t.en}><summary><span>{t.en} · {t.ko}</span><small>{t.category} · {t.year||'공통'}</small></summary><p>{t.definition}</p><div className="kb-game"><small>GAME TIP</small><p>{t.game}</p></div>{['Trail Braking','Throttle Modulation','Short Shifting','Lift & Coast','ERS'].includes(t.en)&&<button onClick={openDriving}>주행 가이드 보기 →</button>}</details>)}</div>{!rows.length&&<p>검색 결과가 없습니다. 다른 검색어를 입력해 주세요.</p>}</section>
}
