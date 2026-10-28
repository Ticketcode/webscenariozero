'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import EveAvatar, { eve } from './EveAvatar';
import { PORTADA, type Respuesta } from '@/data/sz';
import { pedirRespuesta } from '@/lib/eve/cliente';

type Msg = { id: number; role: 'persona' | 'eve'; texto: string; r?: Respuesta };

// EVE acompaña toda la navegación (incluido el paso de comprar la boleta): botón fijo que abre un panel de conversación.
export default function EveFlotante() {
  const [abierto, setAbierto] = useState(false);
  const [valor, setValor] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [pensando, setPensando] = useState(false);
  const n = useRef(0);
  const fin = useRef<HTMLDivElement>(null);

  const enviar = async (texto: string) => {
    const q = texto.trim();
    if (!q || pensando) return;
    const historial = msgs.map((m) => ({ rol: m.role, texto: m.texto }));
    setMsgs((m) => [...m, { id: ++n.current, role: 'persona', texto: q }]);
    setValor('');
    setPensando(true);
    eve.estado('pensando');
    const r = await pedirRespuesta(q, historial);
    setMsgs((m) => [...m, { id: ++n.current, role: 'eve', texto: r.texto, r }]);
    setPensando(false);
    eve.estado('reposo');
    setTimeout(() => fin.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 60);
  };

  const ultima = [...msgs].reverse().find((m) => m.role === 'eve');
  const chips = (ultima?.r?.sugerencias?.length ? ultima.r.sugerencias : PORTADA.sugerencias).filter((s) => !msgs.some((x) => x.texto.toLowerCase() === s.toLowerCase())).slice(0, 3);

  return (
    <div className="eve-fl">
      {abierto && (
        <section className="eve-fl-panel" role="dialog" aria-label="Pregúntale a EVE">
          <header><EveAvatar size={28} /><strong>EVE</strong><button type="button" onClick={() => setAbierto(false)} aria-label="Cerrar">×</button></header>
          <div className="eve-fl-hilo" aria-live="polite">
            {!msgs.length && <p className="eve-fl-msg">Hola, soy EVE. Pregúntame lo que quieras saber del ecosistema o de tu boleta.</p>}
            {msgs.map((m) => m.role === 'persona' ? <p key={m.id} className="eve-fl-msg eve-fl-p">{m.texto}</p> : (
              <div key={m.id} className="eve-fl-msg">
                <p>{m.texto}</p>
                {m.r?.acciones.map((a) => <Link key={a.href + a.label} href={a.href} className="eve-fl-chip">{a.label}</Link>)}
              </div>
            ))}
            {pensando && <p className="eve-fl-msg">EVE está pensando...</p>}
            <div ref={fin} />
          </div>
          <div className="eve-fl-chips">{chips.map((s) => <button key={s} type="button" className="eve-fl-chip" onClick={() => enviar(s)}>{s}</button>)}</div>
          <form onSubmit={(e) => { e.preventDefault(); enviar(valor); }}>
            <label className="sz-sr" htmlFor="eve-fl-q">Pregúntale a EVE</label>
            <input id="eve-fl-q" type="text" autoComplete="off" value={valor} placeholder="Pregúntale a EVE..." onChange={(e) => setValor(e.target.value)} />
            <button type="submit" aria-label="Enviar pregunta">→</button>
          </form>
        </section>
      )}
      <button type="button" className="eve-fl-btn" onClick={() => setAbierto((v) => !v)} aria-label={abierto ? 'Cerrar EVE' : 'Preguntarle a EVE'} aria-expanded={abierto}>
        <EveAvatar size={44} />
      </button>
    </div>
  );
}
