'use client';
import { useEffect, useRef } from 'react';
import { reducedMotion, subscribe } from '@/lib/raf';

const RINGS = [{ n: 10, r: 0.2 }, { n: 16, r: 0.32 }, { n: 24, r: 0.44 }, { n: 34, r: 0.56 }];
const ACC = '#00C8FF';
const TAU = Math.PI * 2;

// Anillo de puntos del hero. El canvas es 160 % del contenedor para que el brillo nunca toque el borde.
export default function HeroRing() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    const rm = reducedMotion();
    let w = 0, h = 0, mx = 0.5, my = 0.5, visible = true;

    const size = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(0);
    };

    const draw = (t: number) => {
      const s = Math.min(w, h) / 1.6, cx = w / 2, cy = h / 2, sy = window.scrollY;
      ctx.clearRect(0, 0, w, h);
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, s * 0.62);
      g.addColorStop(0, 'rgba(0,200,255,0.30)'); g.addColorStop(0.5, 'rgba(10,60,140,0.22)'); g.addColorStop(1, 'rgba(2,4,24,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      if (!rm) {
        const beat = (t % 2600) / 2600;
        ctx.strokeStyle = `rgba(0,200,255,${0.55 * (1 - beat)})`; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(cx, cy, s * (0.08 + beat * 0.5), 0, TAU); ctx.stroke();
      }
      RINGS.forEach((ring, ri) => {
        const dir = ri % 2 ? -1 : 1;
        const base = rm ? 0 : t * 0.00008 * (ri + 1) * dir + sy * 0.0007 * (ri + 1) * dir;
        const ox = (mx - 0.5) * 16 * (ri + 1), oy = (my - 0.5) * 16 * (ri + 1);
        const rad = s * ring.r * (1 + Math.min(sy, 600) * 0.0003);
        for (let i = 0; i < ring.n; i++) {
          const a = base + (i * TAU) / ring.n;
          const pulse = rm ? 0.8 : 0.55 + 0.45 * Math.sin(t * 0.002 + i * 0.7 + ri);
          ctx.beginPath();
          ctx.arc(cx + ox + rad * Math.cos(a), cy + oy + rad * Math.sin(a), s * (0.01 + ri * 0.0035), 0, TAU);
          ctx.fillStyle = `rgba(0,200,255,${0.35 + 0.65 * pulse})`;
          ctx.shadowColor = ACC; ctx.shadowBlur = 10; ctx.fill();
        }
      });
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(cx + (mx - 0.5) * 8, cy + (my - 0.5) * 8, s * 0.018, 0, TAU); ctx.fill();
    };

    size();
    window.addEventListener('resize', size);
    const onMove = (e: PointerEvent) => { mx = e.clientX / window.innerWidth; my = e.clientY / window.innerHeight; };
    window.addEventListener('pointermove', onMove, { passive: true });
    const io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; });
    io.observe(c.parentElement ?? c);
    const off = rm ? () => {} : subscribe((t) => { if (visible) draw(t); });
    return () => { off(); io.disconnect(); window.removeEventListener('resize', size); window.removeEventListener('pointermove', onMove); };
  }, []);
  return <canvas ref={ref} />;
}
