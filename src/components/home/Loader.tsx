'use client';
import { useEffect, useRef } from 'react';
import { clamp, reducedMotion, smooth } from '@/lib/raf';

const PULSE = 'M0 30 L330 30 L350 8 L370 52 L390 30 L560 30 L580 14 L600 48 L620 30 L800 30 L820 4 L842 56 L864 30 L1200 30';

// Pantalla de carga de 2,4 s: contador, letras que entran en cascada y línea de latido que se dibuja.
export default function Loader({ word = 'SCENARIO ZERO', tag = 'CONFIANZA DIGITAL Y TECNOLÓGICA' }: { word?: string; tag?: string }) {
  const count = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const tagEl = useRef<HTMLDivElement>(null);
  const line = useRef<SVGPathElement>(null);
  const head = useRef<SVGPathElement>(null);
  const letters = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains('ready')) return;
    const done = () => root.classList.add('ready');
    if (reducedMotion()) { done(); return; }
    const L = line.current?.getTotalLength() ?? 0;
    const t0 = performance.now();
    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = (now: number) => {
      const p = clamp((now - t0) / 2400);
      const ep = smooth(p);
      if (count.current) count.current.textContent = `${Math.round(p * 100)}%`;
      letters.current.forEach((s, i) => { if (s && p > 0.1 + (i / letters.current.length) * 0.6) s.classList.add('on'); });
      if (mark.current) mark.current.style.letterSpacing = `${0.62 - 0.32 * ep}em`;
      if (p > 0.75) tagEl.current?.classList.add('on');
      if (L && line.current && head.current) {
        line.current.style.strokeDasharray = String(L);
        line.current.style.strokeDashoffset = String(L * (1 - ep));
        head.current.style.strokeDasharray = `70 ${L}`;
        head.current.style.strokeDashoffset = String(70 - L * ep);
        head.current.style.opacity = p < 1 ? '1' : '0';
      }
      if (p < 1) raf = requestAnimationFrame(tick);
      else timer = setTimeout(done, 450);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); };
  }, []);

  return (
    <div id="loader" aria-hidden="true">
      <div className="msg">Cargando<br />el ecosistema</div>
      <div className="count" ref={count}>0%</div>
      <div className="mark" ref={mark}>
        {word.split('').map((ch, i) => (
          <span key={i} className={ch === ' ' ? 'gap' : undefined} ref={(el) => { if (el) letters.current[i] = el; }}>{ch === ' ' ? '' : ch}</span>
        ))}
      </div>
      <div className="tag" ref={tagEl}>{tag}</div>
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
        <path d={PULSE} fill="none" stroke="#12224a" strokeWidth="2.5" strokeLinejoin="round" />
        <path ref={line} d={PULSE} fill="none" stroke="#00C8FF" strokeWidth="2.5" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 5px #00C8FF)' }} />
        <path ref={head} d={PULSE} fill="none" stroke="#fff" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 8px #fff)' }} />
      </svg>
    </div>
  );
}
