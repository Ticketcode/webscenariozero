'use client';
import { useEffect, useRef } from 'react';
import { clamp, smooth } from '@/lib/raf';
import { useScene } from '@/lib/scene';

const COLS = 41, TOTAL = 697, LIT = 556, ACC = '#00C8FF';

// El dato (escena fija): el número cuenta hacia arriba y la matriz de 697 puntos se enciende.
export default function DatoScene() {
  const sec = useRef<HTMLElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const last = useRef(1);

  const draw = (p: number) => {
    const c = cv.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    const w = c.clientWidth, h = c.clientHeight, cell = w / COLS, rad = cell * 0.34;
    ctx.clearRect(0, 0, w, h);
    const lit = Math.round(LIT * p);
    for (let i = 0; i < TOTAL; i++) {
      const x = (i % COLS) * cell + cell / 2, y = Math.floor(i / COLS) * cell + cell / 2;
      ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2);
      if (i < lit) { ctx.fillStyle = ACC; ctx.shadowColor = ACC; ctx.shadowBlur = 8; } else { ctx.fillStyle = '#16275a'; ctx.shadowBlur = 0; }
      ctx.fill();
    }
    ctx.shadowBlur = 0;
  };

  useEffect(() => {
    const c = cv.current;
    if (!c) return;
    const size = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      c.width = c.clientWidth * dpr; c.height = c.clientHeight * dpr;
      c.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(last.current);
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(c);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useScene(sec, (sp) => {
    const e = smooth(clamp((sp - 0.08) / 0.7));
    last.current = e;
    if (num.current) num.current.textContent = (79.83 * e).toFixed(2).replace('.', ',');
    draw(e);
  });

  return (
    <section className="pin sc-dato" id="dato" ref={sec}>
      <div className="stage">
        <div className="wrap">
          <div className="dato-grid">
            <div>
              <p className="eyebrow">El dato</p>
              <div className="big"><span ref={num}>79,83</span><small>%</small></div>
              <p className="dato-txt">De 697 incidentes reportados por MinTIC, casi ocho de cada diez fueron fraude. La confianza se erosiona donde la gente más la usa.</p>
              <p className="src-note">Fuente: MinTIC, 2 de abril de 2026.</p>
            </div>
            <canvas ref={cv} id="dots" role="img" aria-label="697 puntos; 556 encendidos representan los incidentes de fraude" />
          </div>
        </div>
      </div>
    </section>
  );
}
