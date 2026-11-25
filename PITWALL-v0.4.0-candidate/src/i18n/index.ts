import {en} from './en';
export type Language='auto'|'ko'|'en';
export function loadLanguage():Language {try{const v=JSON.parse(localStorage.getItem('pitwall.preferences')||'{}').language;return v==='ko'||v==='en'?v:'auto'}catch{return 'auto'}}
export function resolveLanguage(v:Language,languages:readonly string[]=navigator.languages):'ko'|'en'{if(v!=='auto')return v;for(const l of languages){const base=l.toLowerCase().split('-')[0];if(base==='ko'||base==='en')return base}return 'en'}
export function translate(v:string,lang:'ko'|'en'){return lang==='en'?en[v]||v:v}
