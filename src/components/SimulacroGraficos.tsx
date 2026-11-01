'use client';
import { useEffect, useRef, useState } from 'react';

// Simulacro nacional (página de evento): escalera de cuatro fases y rueda de ocho dimensiones.
// Todo el texto está en el HTML; el movimiento se apaga con "reducir movimiento".

function useEnVista<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [vista, setVista] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setVista(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVista(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, vista] as const;
}

const reducir = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- A · Escalera: cada fase sube un peldaño y la crisis escala ----
const PELDANOS = [34, 58, 80, 100];
export function EscaleraFases({ fases }: { fases: { k: string; v: string }[] }) {
  const [ref, vista] = useEnVista<HTMLOListElement>();
  return (
    <ol ref={ref} className={`ev-escalera${vista ? ' on' : ''}`}>
      {fases.map((f, i) => (
        <li key={f.k} style={{ ['--h' as string]: `${PELDANOS[i % PELDANOS.length]}%`, ['--d' as string]: `${i * 160}ms` }}>
          <div className="ev-peldano"><i /><b>{String(i + 1).padStart(2, '0')}</b></div>
          <h3>{f.k}</h3>
          <p>{f.v}</p>
        </li>
      ))}
    </ol>
  );
}

// ---- C · Rueda: ocho dimensiones de evaluación ----
const COLORES = ['#34d399', '#f87171', '#facc15', '#fb923c', '#00c8f8', '#a78bfa', '#f472b6', '#60a5fa'];
const R1 = 128, R0 = 74, CX = 150, CY = 150, GAP = 0.025;
function sector(i: number, n: number) {
  const a0 = (i / n) * Math.PI * 2 - Math.PI / 2 + GAP;
  const a1 = ((i + 1) / n) * Math.PI * 2 - Math.PI / 2 - GAP;
  const p = (r: number, a: number) => `${(CX + r * Math.cos(a)).toFixed(2)} ${(CY + r * Math.sin(a)).toFixed(2)}`;
  return `M${p(R0, a0)} L${p(R1, a0)} A${R1} ${R1} 0 0 1 ${p(R1, a1)} L${p(R0, a1)} A${R0} ${R0} 0 0 0 ${p(R0, a0)} Z`;
}
function mitad(i: number, n: number) { const a = ((i + 0.5) / n) * Math.PI * 2 - Math.PI / 2; return { x: Math.cos(a) * 10, y: Math.sin(a) * 10 }; }

export function RuedaDimensiones({ items }: { items: string[] }) {
  const [ref, vista] = useEnVista<HTMLDivElement>();
  const [sel, setSel] = useState(0);
  const [manual, setManual] = useState(false);
  useEffect(() => {
    if (!vista || manual || reducir()) return;
    const t = setInterval(() => setSel((s) => (s + 1) % items.length), 3200);
    return () => clearInterval(t);
  }, [vista, manual, items.length]);
  const elegir = (i: number) => { setSel(i); setManual(true); };
  return (
    <div ref={ref} className={`ev-rueda${vista ? ' on' : ''}`}>
      <svg viewBox="0 0 300 300" role="img" aria-label="Ocho dimensiones de evaluación">
        {items.map((d, i) => {
          const m = mitad(i, items.length);
          return (
            <path key={d} d={sector(i, items.length)} fill={COLORES[i % COLORES.length]} className={i === sel ? 'sel' : undefined}
              style={{ transform: i === sel ? `translate(${m.x}px, ${m.y}px)` : undefined, transitionDelay: vista ? `${i * 70}ms` : '0ms' }}
              onClick={() => elegir(i)} onMouseEnter={() => elegir(i)} />
          );
        })}
        <text x={CX} y={CY - 8} textAnchor="middle" className="ev-rueda-n">{String(sel + 1).padStart(2, '0')}</text>
        <text x={CX} y={CY + 14} textAnchor="middle" className="ev-rueda-t">de {items.length}</text>
      </svg>
      <div className="ev-rueda-lista">
        <p className="ev-rueda-actual" aria-live="polite" style={{ ['--c' as string]: COLORES[sel % COLORES.length] }}>{items[sel]}</p>
        <ul>
          {items.map((d, i) => (
            <li key={d}>
              <button type="button" className={i === sel ? 'sel' : undefined} style={{ ['--c' as string]: COLORES[i % COLORES.length] }} onClick={() => elegir(i)} aria-pressed={i === sel}>
                <i aria-hidden />{d}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
