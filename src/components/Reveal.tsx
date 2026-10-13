'use client';
import { useEffect, useRef, type ElementType, type ReactNode } from 'react';

// Revelado al entrar en pantalla (umbral 0.15). El estado oculto solo aplica si JS está activo (clase .js en <html>).
export default function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }: { children: ReactNode; as?: ElementType; className?: string; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`rv ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>{children}</Tag>;
}
