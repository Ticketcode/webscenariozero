'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
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
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);
  const [escrito, setEscrito] = useState('');
  const [sobreCampo, setSobreCampo] = useState(false);
  const [desplazando, setDesplazando] = useState(false);

  // En móvil el botón se aparta mientras se hace scroll (no se solapa con el contenido) y vuelve al detenerse.
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const onScroll = () => { setDesplazando(true); clearTimeout(t); t = setTimeout(() => setDesplazando(false), 700); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(t); };
  }, []);

  // En la portada el campo de EVE ya está a la vista: el botón flotante se oculta mientras el campo se ve para no taparlo.
  useEffect(() => {
    const campo = document.getElementById('pregunta');
    if (!campo) return;
    const io = new IntersectionObserver(([e]) => setSobreCampo(e.isIntersecting), { rootMargin: '80px' });
    io.observe(campo);
    return () => io.disconnect();
  }, []);

  const enviar = async (texto: string) => {
    const q = texto.trim();
    if (!q || pensando) return;
    const historial = msgs.map((m) => ({ rol: m.role, texto: m.texto }));
    setMsgs((m) => [...m, { id: ++n.current, role: 'persona', texto: q }]);
    setValor('');
    setPensando(true);
    eve.estado('pensando');
    const r = await pedirRespuesta(q, historial);
    setPensando(false);
    setEscrito('');
    setMsgs((m) => [...m, { id: ++n.current, role: 'eve', texto: r.texto, r }]);
    // EVE "escribe" la respuesta a ritmo de lectura; hasta que termina no se muestran botones ni sugerencias.
    const terminar = () => { setEscrito(r.texto); eve.estado('reposo'); };
    if (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches) { terminar(); return; }
    eve.estado('respondiendo');
    let i = 0;
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      i += 3;
      setEscrito(r.texto.slice(0, i));
      if (i >= r.texto.length) { clearInterval(timer.current); terminar(); }
    }, 50);
  };

  const ultima = [...msgs].reverse().find((m) => m.role === 'eve');
  // "Listo" = EVE terminó de escribir su última respuesta (y lo último del hilo es esa respuesta, no una pregunta nueva).
  const listo = !!ultima && msgs[msgs.length - 1] === ultima && escrito.length >= ultima.texto.length;
  // Antes de la primera pregunta se ven las sugerencias fijas; después, solo las que EVE propone según lo conversado, sin repetir
  // lo ya preguntado ni lo que ya ofrecen los botones de la respuesta ("Qué recibe cada categoría" = "¿Qué recibe cada categoría?").
  const norm = (t: string) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
  const vistos = new Set([...msgs.filter((m) => m.role === 'persona').map((m) => norm(m.texto)), ...(ultima?.r?.acciones ?? []).map((a) => norm(a.label))]);
  const base = !msgs.length ? PORTADA.sugerencias : listo ? ultima?.r?.sugerencias ?? [] : [];
  const chips = base.filter((s) => { const k = norm(s); if (vistos.has(k)) return false; vistos.add(k); return true; }).slice(0, 3);

  // Mantiene a la vista lo último que EVE escribe.
  useEffect(() => { fin.current?.scrollIntoView({ block: 'nearest' }); }, [msgs.length, escrito, pensando]);
  useEffect(() => () => clearInterval(timer.current), []);

  return (
    <div className={`eve-fl${sobreCampo && !abierto ? ' eve-fl-oculto' : ''}${desplazando && !abierto ? ' eve-fl-scroll' : ''}`}>
      {abierto && (
        <section className="eve-fl-panel" role="dialog" aria-label="Pregúntale a EVE">
          <header><EveAvatar size={28} /><strong>EVE</strong><button type="button" onClick={() => setAbierto(false)} aria-label="Cerrar">×</button></header>
          <div className="eve-fl-hilo" aria-live="polite">
            {!msgs.length && <p className="eve-fl-msg">Hola, soy EVE. Pregúntame lo que quieras saber del ecosistema o de tu boleta.</p>}
            {msgs.map((m) => m.role === 'persona' ? <p key={m.id} className="eve-fl-msg eve-fl-p">{m.texto}</p> : (
              <div key={m.id} className="eve-fl-msg">
                <p>{m === ultima ? escrito : m.texto}</p>
                {m === ultima && listo && m.r?.acciones.map((a) => <Link key={a.href + a.label} href={a.href} className="eve-fl-chip">{a.label}</Link>)}
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
