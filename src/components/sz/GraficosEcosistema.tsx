'use client';
import { useEffect, useRef, useState } from 'react';

// Gráficos de Ecosistema (en lugar de tarjetas): anillo de transversales, columnas de palancas y línea de red de sectores.
// Todo el texto sigue en el HTML (legible y accesible); el movimiento se apaga con "reducir movimiento".

// true cuando el elemento entra en pantalla (una sola vez).
function useEnVista<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [vista, setVista] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setVista(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVista(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, vista] as const;
}

const reducir = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- A · Anillo: seis transversales alrededor de "Ecosistema" ----
export function AnilloTransversales({ items }: { items: readonly (readonly string[])[] }) {
  const [ref, vista] = useEnVista<HTMLDivElement>();
  const [sel, setSel] = useState(0);
  const [manual, setManual] = useState(false);
  // Sin intervención de la persona, el anillo recorre los nodos solo.
  useEffect(() => {
    if (!vista || manual || reducir()) return;
    const t = setInterval(() => setSel((s) => (s + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [vista, manual, items.length]);
  const pos = items.map((_, i) => { const a = ((-90 + i * (360 / items.length)) * Math.PI) / 180; return { x: 50 + 38 * Math.cos(a), y: 50 + 38 * Math.sin(a) }; });
  const [titulo, texto] = items[sel];
  return (
    <div ref={ref} className={`g-anillo${vista ? ' on' : ''}`}>
      <div className="g-anillo-lienzo">
        <svg viewBox="0 0 100 100" aria-hidden>
          {pos.map((p, i) => <line key={i} x1="50" y1="50" x2={p.x} y2={p.y} className={i === sel ? 'sel' : undefined} style={{ transitionDelay: `${i * 90}ms` }} />)}
          <circle cx="50" cy="50" r="22" className="g-anillo-halo" />
        </svg>
        <div className="g-anillo-centro"><span>Ecosistema</span></div>
        {pos.map((p, i) => (
          <button key={i} type="button" className={`g-nodo${i === sel ? ' sel' : ''}`} style={{ left: `${p.x}%`, top: `${p.y}%`, transitionDelay: `${i * 90}ms` }}
            onClick={() => { setSel(i); setManual(true); }} aria-pressed={i === sel} aria-label={items[i][0]}>
            {i + 1}
          </button>
        ))}
      </div>
      <div className="g-anillo-texto" aria-live="polite">
        <h3>{titulo}</h3>
        <p>{texto}</p>
        <div className="g-puntos" aria-hidden>{items.map((_, i) => <i key={i} className={i === sel ? 'sel' : undefined} />)}</div>
      </div>
    </div>
  );
}

// ---- B · Columnas: cuatro palancas, cada una con su altura y color ----
const ALTURAS = [62, 100, 78, 90];
export function ColumnasPalancas({ items }: { items: readonly (readonly string[])[] }) {
  const [ref, vista] = useEnVista<HTMLDivElement>();
  return (
    <div ref={ref} className={`g-cols${vista ? ' on' : ''}`}>
      {items.map(([t, x], i) => (
        <div key={t} className="g-col" style={{ ['--h' as string]: `${ALTURAS[i % ALTURAS.length]}%`, ['--d' as string]: `${i * 140}ms` }}>
          <div className="g-col-barra"><i /></div>
          <h3>{t}</h3>
          <p>{x}</p>
        </div>
      ))}
    </div>
  );
}

// ---- C · Línea de red: los sectores se encienden en cadena ----
export function RedSectores({ items, nota }: { items: readonly string[]; nota: string }) {
  const [ref, vista] = useEnVista<HTMLDivElement>();
  return (
    <div ref={ref} className={`g-red${vista ? ' on' : ''}`}>
      <ol>
        {items.map((s, i) => (
          <li key={s} style={{ ['--d' as string]: `${i * 260}ms` }}><i aria-hidden /><span>{s}</span></li>
        ))}
      </ol>
      <p className="g-red-nota">{nota}</p>
    </div>
  );
}
