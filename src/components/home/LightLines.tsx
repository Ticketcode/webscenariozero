'use client';
import { useEffect, useRef } from 'react';
import { reducedMotion, subscribe } from '@/lib/raf';

// Líneas de luz del cierre: 130 líneas radiales, con impulso proporcional al scroll. Solo mientras la sección es visible.
export default function LightLines() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    const rm = reducedMotion();
    const stars = Array.from({ length: 130 }, () => ({ a: Math.random() * Math.PI * 2, r: Math.random(), v: 0.4 + Math.random() * 0.9 }));
    let w = 0, h = 0, on = false, lastY = window.scrollY, boost = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.78, cy = h * 0.5, max = Math.hypot(w, h) * 0.7;
      const dy = Math.abs(window.scrollY - lastY); lastY = window.scrollY;
      boost += (Math.min(dy * 0.0016, 0.05) - boost) * 0.2;
      ctx.lineCap = 'round';
      stars.forEach((s) => {
        if (!rm) {
          s.r += s.v * (0.0016 + boost) * (0.4 + s.r);
          if (s.r > 1) { s.r = 0.02; s.a = Math.random() * Math.PI * 2; }
        }
        const r0 = s.r * max, r1 = (s.r + 0.03 + boost * 4) * max;
        ctx.strokeStyle = `rgba(0,200,255,${0.1 + s.r * 0.5})`;
        ctx.lineWidth = 1 + s.r * 1.6;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(s.a) * r0, cy + Math.sin(s.a) * r0);
        ctx.lineTo(cx + Math.cos(s.a) * r1, cy + Math.sin(s.a) * r1);
        ctx.stroke();
      });
    };
    const size = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    size();
    window.addEventListener('resize', size);
    const io = new IntersectionObserver((es) => { on = es[0].isIntersecting; });
    io.observe(c);
    const off = rm ? () => {} : subscribe(() => { if (on) draw(); });
    return () => { off(); io.disconnect(); window.removeEventListener('resize', size); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" />;
}
