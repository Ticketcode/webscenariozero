'use client';
import { useEffect, useRef } from 'react';

export type EveEstado = 'reposo' | 'escuchando' | 'pensando' | 'respondiendo';

type Ctor = { new (c: HTMLCanvasElement, o?: { size?: number; state?: EveEstado }): { setState(s: EveEstado): void }; setState(s: EveEstado): void; keystroke(): void; beat(f?: number): void };
declare global { interface Window { EveAvatar?: Ctor } }

let loading: Promise<Ctor> | null = null;
// eve-avatar.js (del kit) se usa tal cual: expone window.EveAvatar. Se carga una sola vez.
export function cargarEve(): Promise<Ctor> {
  if (typeof window === 'undefined') return Promise.reject();
  if (window.EveAvatar) return Promise.resolve(window.EveAvatar);
  loading ??= new Promise((ok, fail) => {
    const s = document.createElement('script');
    s.src = '/eve-avatar.js';
    s.async = true;
    s.onload = () => (window.EveAvatar ? ok(window.EveAvatar) : fail());
    s.onerror = () => fail();
    document.head.appendChild(s);
  });
  return loading;
}

export const eve = {
  estado: (s: EveEstado) => window.EveAvatar?.setState(s),
  tecla: () => window.EveAvatar?.keystroke(),
  latido: (f = 1) => window.EveAvatar?.beat(f),
};

export default function EveAvatar({ size = 32, estado = 'reposo', className }: { size?: number; estado?: EveEstado; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let vivo = true;
    cargarEve().then((E) => { if (vivo && ref.current) new E(ref.current, { size, state: estado }); }).catch(() => {});
    return () => { vivo = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);
  return <canvas ref={ref} className={className} width={size} height={size} />;
}
