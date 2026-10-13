'use client';
import Link from 'next/link';
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { CHIPS, IA_NOMBRE, PLACEHOLDERS, responder, type KbItem } from '@/data/eve-kb';
import { reducedMotion } from '@/lib/raf';

// Barra de preguntas: una pregunta, una respuesta con fuentes (sin historial). Informativa.

type Ctx = { openPalette: () => void; focusAsk: () => void };
const AskCtx = createContext<Ctx>({ openPalette: () => {}, focusAsk: () => {} });
export const useAsk = () => useContext(AskCtx);

type Answer = { q: string; r: KbItem };

function AskPanel({ id, onNavigate, footer }: { id: string; onNavigate?: () => void; footer?: ReactNode }) {
  const [value, setValue] = useState('');
  const [ans, setAns] = useState<Answer | null>(null);
  const [shown, setShown] = useState('');
  const [phi, setPhi] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setInterval(() => setPhi((v) => (v + 1) % PLACEHOLDERS.length), 3200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!ans) return;
    const full = ans.r.a;
    if (reducedMotion()) { setShown(full); return; }
    let n = 0;
    setShown('');
    const t = setInterval(() => { n += 2; setShown(full.slice(0, n)); if (n >= full.length) clearInterval(t); }, 16);
    return () => clearInterval(t);
  }, [ans]);

  const ask = (text: string) => {
    const q = text.trim();
    if (!q) { input.current?.focus(); return; }
    setAns({ q, r: responder(q) });
  };

  return (
    <div className="ask" id={`ask-${id}`}>
      <form className="ask-box" role="search" autoComplete="off" onSubmit={(e) => { e.preventDefault(); ask(value); }}>
        <span className="spark" aria-hidden="true">IA</span>
        <label className="sr" htmlFor={`q-${id}`}>Pregunta lo que quieras saber del ecosistema</label>
        <input id={`q-${id}`} ref={input} type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder={PLACEHOLDERS[phi]} enterKeyHint="search" />
        <button className="ask-go" type="submit">Preguntar</button>
      </form>
      {footer ?? <p className="ask-hint">Respuestas de {IA_NOMBRE}, una IA con información oficial publicada aquí. Presiona / para preguntar desde cualquier parte.</p>}
      <div className="chips">
        {CHIPS.map((c) => (
          <button key={c} type="button" className="chip" onClick={() => { setValue(c); ask(c); }}>{c}</button>
        ))}
      </div>
      <div className="answer" hidden={!ans} aria-live="polite" onClick={(e) => { if ((e.target as HTMLElement).closest('a')) onNavigate?.(); }}>
        {ans && (
          <>
            <div className="tag">RESPUESTA <i>{IA_NOMBRE} · IA · información oficial</i></div>
            <div className="q">{ans.q}</div>
            <div className="a">{shown}</div>
            <div className="src">
              {ans.r.src.length > 0 && 'Fuente: '}
              {ans.r.src.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
              {ans.r.cta && <Link className="cta" href={ans.r.cta[1]}>{ans.r.cta[0]}</Link>}
            </div>
            <div className="note">No negocia precios ni promete cupos. Para eso te conecta con una persona del equipo. Las respuestas de la IA pueden contener errores: confirma los datos clave en la página del evento.</div>
          </>
        )}
      </div>
    </div>
  );
}

export function HeroAsk() {
  return <AskPanel id="hero" />;
}

export function AskProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const last = useRef<HTMLElement | null>(null);
  const openRef = useRef(false);

  const openPalette = useCallback(() => {
    if (openRef.current) { document.getElementById('q-pal')?.focus(); return; }
    openRef.current = true;
    last.current = document.activeElement as HTMLElement | null;
    setMounted(true);
    setOpen(true);
  }, []);

  useEffect(() => {
    if (open) document.getElementById('q-pal')?.focus({ preventScroll: true });
  }, [open, mounted]);

  const close = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false;
    setOpen(false);
    last.current?.focus?.({ preventScroll: true });
  }, []);

  const focusAsk = useCallback(() => {
    const el = document.getElementById('ask-hero');
    const r = el?.getBoundingClientRect();
    if (r && r.top > 0 && r.bottom < window.innerHeight) document.getElementById('q-hero')?.focus({ preventScroll: true });
    else openPalette();
  }, [openPalette]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (document.activeElement as HTMLElement | null)?.tagName ?? '';
      if (e.key === 'Escape') { close(); return; }
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') { e.preventDefault(); focusAsk(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [close, focusAsk]);

  return (
    <AskCtx.Provider value={{ openPalette, focusAsk }}>
      {children}
      {mounted && (
        <div className={`pal${open ? ' open' : ''}`} hidden={!open} role="dialog" aria-modal="true" aria-label={`Preguntar a ${IA_NOMBRE}`}
          onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
          <div className="pal-panel">
            <AskPanel
              id="pal"
              onNavigate={close}
              footer={
                <div className="pal-foot">
                  <span>Respuestas de {IA_NOMBRE}, una IA con información oficial publicada aquí. <kbd>Esc</kbd> para cerrar.</span>
                  <button className="pal-close" type="button" onClick={close}>Cerrar</button>
                </div>
              }
            />
          </div>
        </div>
      )}
    </AskCtx.Provider>
  );
}

export function AskButton() {
  const { openPalette } = useAsk();
  return (
    <button className="ask-mini" type="button" aria-label={`Hacer una pregunta a ${IA_NOMBRE}`} onClick={openPalette}>
      <span className="spark" style={{ width: 22, height: 22, fontSize: 10 }}>IA</span>Preguntar <kbd>/</kbd>
    </button>
  );
}
