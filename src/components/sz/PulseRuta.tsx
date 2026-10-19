'use client';
import { useEffect, useRef } from 'react';
import { clamp, reducedMotion, subscribe } from '@/lib/raf';

type Hito = { fecha: string; titulo: string; texto: string };

// La ruta como Señal Vital: la línea de pulso se dibuja con el scroll y cada hito se enciende cuando la punta lo alcanza.
// Escritorio: línea horizontal. Móvil: línea vertical con los mismos hitos. Con movimiento reducido todo queda encendido.
export default function PulseRuta({ hitos, destacado = '12.11.2026' }: { hitos: Hito[]; destacado?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const head = useRef<SVGCircleElement>(null);
  const items = useRef<HTMLLIElement[]>([]);
  const n = hitos.length;
  const xs = hitos.map((_, i) => ((i + 0.5) / n) * 1200);
  let d = 'M0 60';
  xs.forEach((x, i) => { d += ` L${x - 22} 60 L${x - 11} ${i % 2 ? 16 : 24} L${x} 100 L${x + 11} 60`; });
  d += ' L1200 60';

  useEffect(() => {
    const el = root.current, p = path.current, hd = head.current;
    if (!el || !p || !hd) return;
    const len = p.getTotalLength();
    p.style.strokeDasharray = String(len);
    const paint = (k: number) => {
      p.style.strokeDashoffset = String(len * (1 - k));
      const pt = p.getPointAtLength(len * k);
      hd.setAttribute('cx', String(pt.x)); hd.setAttribute('cy', String(pt.y));
      el.style.setProperty('--p', String(k));
      items.current.forEach((li, i) => li?.classList.toggle('on', pt.x >= xs[i] - 12 || k >= 0.999));
    };
    if (reducedMotion()) { paint(1); return; }
    let sp = 0;
    paint(0);
    return subscribe(() => {
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      const target = clamp((vh * 0.9 - r.top) / (r.height + vh * 0.25));
      sp += (target - sp) * 0.16;
      paint(sp);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  return (
    <div className="sz-pr" ref={root} style={{ ['--n' as string]: n }}>
      <svg className="sz-pr-svg" viewBox="0 0 1200 120" aria-hidden="true">
        <path d={d} className="sz-pr-base" />
        <path ref={path} d={d} className="sz-pr-line" />
        <circle ref={head} r="6" cx="0" cy="60" className="sz-pr-head" />
      </svg>
      <ol className="sz-pr-list">
        {hitos.map((h, i) => (
          <li key={h.fecha} ref={(el) => { if (el) items.current[i] = el; }} className={h.fecha === destacado ? 'sz-pr-dest' : ''}>
            <p className="sz-etq">{h.fecha}</p>
            <h3>{h.titulo}</h3>
            <p>{h.texto}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
