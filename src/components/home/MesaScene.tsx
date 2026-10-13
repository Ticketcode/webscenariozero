'use client';
import { useRef } from 'react';
import { clamp, reducedMotion } from '@/lib/raf';
import { useScene } from '@/lib/scene';
import type { Anillo } from '@/data/events';

// Geometría en un lienzo de 520 x 420 con centro (260, 210), de adentro hacia afuera.
const DIMS = [{ rx: 78, ry: 56 }, { rx: 130, ry: 96 }, { rx: 190, ry: 142 }, { rx: 238, ry: 182 }];

// La mesa (escena fija): por scroll cada anillo se enciende y llena sus sillas; por clic, solo el anillo elegido.
// El scroll recupera el control cuando el progreso se mueve más de 0.12 desde el clic. Sin precios.
export default function MesaScene({ anillos, eyebrow }: { anillos: Anillo[]; eyebrow: string }) {
  const sec = useRef<HTMLElement>(null);
  const oval = useRef<HTMLDivElement>(null);
  const seats = useRef<HTMLSpanElement[][]>([]);
  const guides = useRef<HTMLDivElement[]>([]);
  const legend = useRef<HTMLButtonElement[]>([]);
  const lastSp = useRef(0);
  const pick = useRef<{ ring: number | null; at: number }>({ ring: null, at: 0 });

  const paint = (sp: number) => {
    lastSp.current = sp;
    const p = pick.current;
    if (p.ring !== null && Math.abs(sp - p.at) > 0.12) {
      p.ring = null;
      seats.current.forEach((l) => l.forEach((s) => { s.style.transitionDelay = ''; }));
    }
    let cur = -1;
    if (p.ring !== null) {
      cur = p.ring;
      seats.current.forEach((list, ri) => list.forEach((s) => { s.classList.toggle('on', ri === p.ring); s.classList.toggle('sel', ri === p.ring); }));
      legend.current.forEach((el, i) => { el.classList.toggle('on', i === p.ring); el.classList.toggle('cur', i === p.ring); el.setAttribute('aria-pressed', String(i === p.ring)); });
    } else {
      seats.current.forEach((list, ri) => {
        const thr = 0.1 + ri * 0.2;
        if (sp > thr) cur = ri;
        const local = clamp((sp - thr) / 0.18) * list.length;
        list.forEach((s, si) => { s.classList.toggle('on', si < local || sp >= thr + 0.18); s.classList.remove('sel'); });
      });
      legend.current.forEach((el, i) => { el.classList.toggle('on', i <= cur); el.classList.toggle('cur', i === cur); el.setAttribute('aria-pressed', 'false'); });
    }
    guides.current.forEach((g, i) => g.classList.toggle('on', p.ring !== null ? i === p.ring : i <= cur));
    oval.current?.style.setProperty('--rz', `${(sp - 0.5) * 36}deg`);
  };

  const choose = (ri: number) => {
    const p = pick.current;
    p.ring = p.ring === ri ? null : ri;
    p.at = lastSp.current;
    const stagger = p.ring !== null && !reducedMotion();
    seats.current.forEach((list, k) => list.forEach((s, si) => { s.style.transitionDelay = stagger && p.ring === k ? `${si * 45}ms` : ''; }));
    paint(lastSp.current);
  };

  useScene(sec, paint);

  return (
    <section className="pin sc-mesa" id="mesa" ref={sec}>
      <div className="stage">
        <div className="wrap">
          <div className="mesa-grid">
            <div>
              <p className="eyebrow">{eyebrow}</p>
              <h2>La proximidad a la mesa <span className="acc">es el producto.</span></h2>
              <div className="legend">
                {anillos.map((a, i) => (
                  <button key={a.id} type="button" className="lg" aria-pressed="false" onClick={() => choose(i)} ref={(el) => { if (el) legend.current[i] = el; }}>
                    <i style={{ background: a.color }} /><b>{a.nombre}</b><span>{a.sillas} sillas · {a.cupos} cupos</span>
                  </button>
                ))}
              </div>
              <p className="mesa-note">34 posiciones numeradas, 20 cupos. Toca un anillo, en la lista o en la mesa, para ver dónde queda. Los cupos se acuerdan con el equipo, y se empieza en la lista de espera.</p>
            </div>
            <div className="stagewrap" role="img" aria-label="Mesa oval con 34 posiciones en cuatro anillos">
              <div className="floor" />
              <div className="oval" ref={oval}>
                <div className="ring" /><div className="sweep" /><div className="core" />
                {anillos.map((a, ri) => {
                  const { rx, ry } = DIMS[ri];
                  return (
                    <div key={`g-${a.id}`}>
                      <div className="guide" ref={(el) => { if (el) guides.current[ri] = el; }}
                        style={{ left: `${((260 - rx) / 520) * 100}%`, top: `${((210 - ry) / 420) * 100}%`, width: `${((2 * rx) / 520) * 100}%`, height: `${((2 * ry) / 420) * 100}%`, ['--gc' as string]: a.color }} />
                      {Array.from({ length: a.sillas }, (_, i) => {
                        const ang = (i * 2 * Math.PI) / a.sillas - Math.PI / 2;
                        return (
                          <span key={i} className="seat" title={`${a.nombre} · posición ${i + 1}`} onClick={() => choose(ri)}
                            ref={(el) => { if (el) (seats.current[ri] ||= [])[i] = el; }}
                            style={{ left: `${((260 + rx * Math.cos(ang) - 10) / 520) * 100}%`, top: `${((210 + ry * Math.sin(ang) - 10) / 420) * 100}%`, backgroundColor: a.color, color: a.color }} />
                        );
                      })}
                    </div>
                  );
                })}
              </div>
              <div className="tlabel">MESA</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
