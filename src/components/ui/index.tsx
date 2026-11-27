import React from 'react';
export function Button(p:React.ButtonHTMLAttributes<HTMLButtonElement>){return <button {...p}/>}
export function Input(p:React.InputHTMLAttributes<HTMLInputElement>){return <input {...p}/>}
export function Select(p:React.SelectHTMLAttributes<HTMLSelectElement>){return <span className="pw-select"><select {...p}/><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>}
export function Textarea(p:React.TextareaHTMLAttributes<HTMLTextAreaElement>){return <textarea {...p}/>}
export function Card(p:React.HTMLAttributes<HTMLElement>){return <section {...p}/>}
export function Checkbox({checked,onChange,...p}:React.InputHTMLAttributes<HTMLInputElement>){return <span className="pw-check"><input {...p} type="checkbox" checked={checked} onChange={onChange}/><span aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m5 12 4 4L19 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></span></span>}
export function Progress(p:React.ProgressHTMLAttributes<HTMLProgressElement>){return <progress {...p}/>}
export function AppShell({children,className}:React.PropsWithChildren<{className:string}>){return <main className={'pw-shell '+className}>{children}</main>}
