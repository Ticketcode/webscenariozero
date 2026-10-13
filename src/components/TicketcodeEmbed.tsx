'use client';
import { useEffect, useRef } from 'react';
import type { Embed } from '@/data/events';

// Contenedor con altura mínima para evitar saltos. Sin embed -> marcador visible.
export default function TicketcodeEmbed({ embed, label }: { embed: Embed | null; label: string }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = host.current;
    if (!el || !embed || embed.kind === 'iframe') return;
    el.innerHTML = '';
    if (embed.kind === 'html') {
      el.innerHTML = embed.html;
      el.querySelectorAll('script').forEach((old) => {
        const s = document.createElement('script');
        [...old.attributes].forEach((a) => s.setAttribute(a.name, a.value));
        s.text = old.text;
        s.async = false; // los scripts del embed (jQuery, easing, ticketcode-iframe) deben ejecutarse en orden
        old.replaceWith(s);
      });
      return;
    }
    const s = document.createElement('script');
    s.src = embed.src;
    s.async = true;
    Object.entries(embed.attrs ?? {}).forEach(([k, v]) => s.setAttribute(k, v));
    el.appendChild(s);
    return () => { el.innerHTML = ''; };
  }, [embed]);

  const minHeight = embed?.minHeight ?? 640;
  if (!embed) {
    return (
      <div className="embed embed-empty" style={{ minHeight: 320 }}>
        <p>[Formulario de Ticketcode: {label}]</p>
        <p className="dim">Pendiente de código de inserción.</p>
      </div>
    );
  }
  if (embed.kind === 'iframe') {
    return (
      <div className="embed ticketcode-card" style={{ minHeight }}>
        <iframe src={embed.src} title={embed.title ?? label} loading="lazy" style={{ width: '100%', height: minHeight, border: 0 }} />
      </div>
    );
  }
  return <div className="embed ticketcode-card" ref={host} style={{ minHeight }} />;
}
