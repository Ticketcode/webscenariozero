'use client';
import { useRef } from 'react';
import { clamp } from '@/lib/raf';
import { useScene } from '@/lib/scene';
import { ruta, rutaPath, rutaX } from '@/data/home';

const D = rutaPath();

// La ruta (escena fija): la línea de latido se dibuja y cada hito se enciende cuando la punta lo alcanza.
export default function RutaScene() {
  const sec = useRef<HTMLElement>(null);
  const line = useRef<SVGPathElement>(null);
  const head = useRef<SVGCircleElement>(null);
  const stops = useRef<HTMLDivElement[]>([]);
  const len = useRef(0);

  useScene(sec, (sp) => {
    const l = line.current, hd = head.current;
    if (!l || !hd) return;
    if (!len.current) len.current = l.getTotalLength();
    const kr = clamp((sp - 0.08) / 0.8);
    l.style.strokeDasharray = String(len.current);
    l.style.strokeDashoffset = String(len.current * (1 - kr));
    const pt = l.getPointAtLength(len.current * kr);
    hd.setAttribute('cx', String(pt.x)); hd.setAttribute('cy', String(pt.y));
    stops.current.forEach((el, i) => el?.classList.toggle('on', pt.x >= rutaX[i] - 12 || kr >= 0.999));
  });

  return (
    <section className="pin sc-ruta" id="ruta" ref={sec}>
      <div className="stage">
        <div className="wrap">
          <div className="ruta-head">
            <p className="eyebrow">La ruta</p>
            <h2>Un año con entregables fechados. <span className="acc">Un rumbo hasta 2030.</span></h2>
          </div>
          <svg className="pulse" viewBox="0 0 1200 120" aria-hidden="true">
            <path d={D} stroke="#12224a" strokeWidth="3" />
            <path ref={line} d={D} stroke="#00C8FF" strokeWidth="3" style={{ filter: 'drop-shadow(0 0 6px #00C8FF)' }} />
            <circle ref={head} r="6" fill="#fff" cx="0" cy="60" style={{ filter: 'drop-shadow(0 0 8px #00C8FF)' }} />
          </svg>
          <div className="stops">
            {ruta.map((s, i) => (
              <div key={s.when} className="stop" ref={(el) => { if (el) stops.current[i] = el; }}>
                <div className="when">{s.when}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
