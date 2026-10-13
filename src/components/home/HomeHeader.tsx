'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { AskButton } from './Ask';
import { clamp, subscribe } from '@/lib/raf';

// Navegación fija con barra de progreso de scroll; "Preguntar" aparece al pasar el hero.
export default function HomeHeader({ esperaHref }: { esperaHref: string }) {
  const bar = useRef<HTMLDivElement>(null);
  const top = useRef<HTMLElement>(null);
  useEffect(() => subscribe(() => {
    const doc = document.documentElement.scrollHeight - window.innerHeight;
    if (bar.current) bar.current.style.transform = `scaleX(${doc > 0 ? clamp(window.scrollY / doc) : 0})`;
    top.current?.classList.toggle('show-ask', window.scrollY > window.innerHeight * 0.6);
  }), []);
  return (
    <header className="top" ref={top}>
      <div className="wrap">
        <Link className="brand" href="#inicio">SCENARIO ZERO</Link>
        <nav aria-label="Principal">
          <span className="mintic">Con el respaldo de MinTIC</span>
          <a href="#dato">El dato</a>
          <a href="#ruta">La ruta</a>
          <a href="#mesa">La mesa</a>
          <a href="#eventos">Eventos</a>
          <AskButton />
          <Link className="btn btn-sm cta-hdr" href={esperaHref}>Quiero un cupo en la mesa</Link>
        </nav>
      </div>
      <div className="progress" ref={bar} />
    </header>
  );
}
