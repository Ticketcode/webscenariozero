'use client';
import { useEffect, useRef, type RefObject } from 'react';
import { clamp, reducedMotion, subscribe } from './raf';

// Escena fija: p = clamp(-rect.top / (rect.height - innerHeight)), suavizado sp += (p - sp) * 0.18.
// Con reducir movimiento se entrega el estado final (1) una sola vez.
export function useScene(ref: RefObject<HTMLElement | null>, onFrame: (sp: number) => void) {
  const cb = useRef(onFrame);
  cb.current = onFrame;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) { cb.current(1); return; }
    let sp = -1;
    return subscribe(() => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = clamp(-r.top / Math.max(1, r.height - vh));
      if (r.bottom < -vh || r.top > vh * 2) {
        if (sp !== p) { sp = p; cb.current(sp); }
        return;
      }
      sp = sp < 0 ? p : sp + (p - sp) * 0.18;
      cb.current(sp);
    });
  }, [ref]);
}
