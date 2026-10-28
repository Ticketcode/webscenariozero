'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import EveAvatar, { eve } from './EveAvatar';
import { PORTADA, type Respuesta } from '@/data/sz';
import { eleccionDe, etiqueta, mensajeAlElegir, pedirRespuesta } from '@/lib/eve/cliente';

type Msg = { id: number; role: 'persona' | 'eve'; texto: string; r?: Respuesta };

// Puerta de EVE: en cada carga completa de / se muestra primero el círculo vivo con la pregunta; EVE responde ahí mismo
// con los enlaces a las páginas que conviene visitar. "Omitir" (o Esc) entra al home, donde la conversación continúa.
const liberar = () => {
  const root = document.documentElement;
  if (!root.classList.contains('gate')) return;
  root.classList.add('gate-out');
  setTimeout(() => root.classList.remove('gate', 'gate-out'), 500);
};

const reduce = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Portada() {
  const router = useRouter();
  const [valor, setValor] = useState('');
  const [valorP, setValorP] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [escrito, setEscrito] = useState('');
  const [estado, setEstado] = useState('EVE · en línea');
  const [grande, setGrande] = useState(0);
  const [gran, setGran] = useState(0);
  const [yendo, setYendo] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);
  const hilo = useRef<HTMLDivElement>(null);
  const hiloP = useRef<HTMLDivElement>(null);
  const povRef = useRef<HTMLDivElement>(null);
  const n = useRef(0);

  useEffect(() => {
    const f = () => { setGrande(window.innerWidth >= 1000 ? 420 : 200); setGran(Math.round(Math.min(380, window.innerWidth * 0.72, window.innerHeight * 0.42))); };
    f();
    window.addEventListener('resize', f);
    return () => { window.removeEventListener('resize', f); clearInterval(timer.current); };
  }, []);

  const enviar = (texto: string) => {
    const q = texto.trim();
    if (!q) return;
    clearInterval(timer.current);
    const historial = msgs.map((m) => ({ rol: m.role, texto: m.texto }));
    setMsgs((m) => [...m, { id: ++n.current, role: 'persona', texto: q }]);
    setValor('');
    setValorP('');
    setEstado('EVE está pensando...');
    eve.estado('pensando');
    Promise.all([pedirRespuesta(q, historial), new Promise((ok) => setTimeout(ok, reduce() ? 0 : 900))]).then(([r]) => hablar(r));
  };

  // EVE "habla": agrega su mensaje y lo escribe a ritmo de lectura. Devuelve una promesa que se cumple al terminar de hablar.
  const hablar = (r: Respuesta): Promise<void> => new Promise((terminado) => {
      setEscrito('');
      setMsgs((m) => [...m, { id: ++n.current, role: 'eve', texto: r.texto, r }]);
      setEstado('EVE · respondiendo');
      eve.estado('respondiendo');
      const fin = () => { setEscrito(r.texto); setEstado('EVE · en línea'); eve.estado('reposo'); terminado(); };
      if (reduce()) { fin(); return; }
      // EVE "habla": el texto sale a ritmo de lectura (~60 caracteres/s) y el avatar se ilumina con swells lentos e
      // irregulares (uno cada ~0,4–0,6 s, como sílabas y pausas), no con un latido por fragmento de texto.
      let i = 0;
      let sig = 0;
      timer.current = setInterval(() => {
        i += 3;
        setEscrito(r.texto.slice(0, i));
        const now = performance.now();
        if (now >= sig) { eve.latido(1.1 + Math.random() * 0.7); sig = now + 380 + Math.random() * 240; }
        if (i >= r.texto.length) { clearInterval(timer.current); fin(); }
      }, 50);
      setTimeout(() => {
        const gate = document.documentElement.classList.contains('gate');
        (gate ? hiloP : hilo).current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }, 60);
  });

  // La persona elige un botón de siguiente paso: EVE contesta (excelente, te llevo a…, vuelve si necesitas algo más) y recién
  // cuando termina de hablar se pasa de página. Así el salto no es abrupto ni se da por hecha una elección que no se hizo.
  const elegir = (e: React.MouseEvent, a: { label: string; href: string }) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return; // abrir en pestaña nueva sigue funcionando
    e.preventDefault();
    if (yendo) return;
    setYendo(true);
    clearInterval(timer.current);
    setMsgs((m) => [...m, { id: ++n.current, role: 'persona', texto: eleccionDe(a.label) }]);
    setEstado('EVE está pensando...');
    eve.estado('pensando');
    setTimeout(() => {
      hablar({ re: '', texto: mensajeAlElegir(a), acciones: [], sugerencias: [] }).then(() => setTimeout(() => router.push(a.href), reduce() ? 0 : 1000));
    }, reduce() ? 0 : 500);
  };

  useEffect(() => {
    if (document.documentElement.classList.contains('gate')) document.getElementById('pregunta-puerta')?.focus({ preventScroll: true });
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { liberar(); eve.estado('reposo'); } };
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [gran]);

  // En la puerta la conversación se desplaza dentro del overlay: cada mensaje nuevo (y cada letra que EVE escribe) se mantiene a la vista,
  // incluido el aviso de redirección antes de pasar de página.
  useEffect(() => {
    const pov = povRef.current;
    if (pov && document.documentElement.classList.contains('gate')) pov.scrollTo({ top: pov.scrollHeight });
  }, [msgs.length, escrito, yendo]);

  const respuesta = [...msgs].reverse().find((m) => m.role === 'eve');
  // "Listo" = EVE ya terminó de escribir su última respuesta. Si lo último del hilo es la persona (pregunta o botón elegido), EVE
  // está respondiendo: ni los botones ni las sugerencias se muestran hasta que termine.
  const listo = !!respuesta && msgs[msgs.length - 1] === respuesta && escrito.length >= respuesta.texto.length;
  // Después de la primera respuesta las sugerencias salen solo de lo conversado (las propone el modelo con cada respuesta); las fijas
  // de la portada solo se ven antes de empezar. Nunca se repite una pregunta ya hecha ni lo que ya ofrecen los botones de la respuesta.
  const norm = (t: string) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
  const vistos = new Set([...msgs.filter((m) => m.role === 'persona').map((m) => norm(m.texto)), ...(respuesta?.r?.acciones ?? []).map((a) => norm(a.label))]);
  const restantes = (respuesta?.r?.sugerencias ?? []).filter((s) => { const k = norm(s); if (vistos.has(k)) return false; vistos.add(k); return true; });

  // Mismo hilo en la puerta y en el home. Al tocar un enlace la puerta se queda (sin mostrar el home) hasta que llega la página nueva.
  const renderHilo = (ref: React.RefObject<HTMLDivElement | null>, clase: string) => (
    <div className={clase} ref={ref} aria-live="polite">
      {msgs.map((m) => m.role === 'persona' ? (
        <div key={m.id} className="sz-msg sz-msg-p">{m.texto}</div>
      ) : (
        <div key={m.id} className="sz-msg sz-msg-e">
          <div className="sz-msg-h"><EveAvatar size={32} /><strong>EVE</strong></div>
          <p>{m === respuesta ? escrito : m.texto}</p>
          {m === respuesta && listo && restantes.length === 0 && (
            <div className="sz-acciones">
              {m.r?.acciones.map((a) => (
                <Link key={a.href + a.label} href={a.href} onClick={(e) => elegir(e, a)} className={a.principal ? 'sz-btn sz-btn-primary' : 'sz-chip'}>{etiqueta(a.label)}</Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const pgran = msgs.length ? Math.min(gran, 150) : gran;

  return (
    <>
      <div ref={povRef} className={`sz-pov${msgs.length ? ' sz-pov-conv' : ''}`} role="dialog" aria-modal="true" aria-label="Pregúntale a EVE">
        <button type="button" className="sz-pov-skip" onClick={() => { liberar(); eve.estado('reposo'); }}>Omitir</button>
        <div className="sz-pov-art" aria-hidden>{pgran > 0 && <EveAvatar key={'g' + pgran} size={pgran} />}</div>
        <form className="sz-ask sz-pov-ask" onSubmit={(e) => { e.preventDefault(); enviar(valorP); }}>
          <label htmlFor="pregunta-puerta" className="sz-sr">Pregúntale a EVE sobre el ecosistema</label>
          <input id="pregunta-puerta" type="text" autoComplete="off" value={valorP} placeholder={PORTADA.campo}
            onChange={(e) => { setValorP(e.target.value); eve.estado(e.target.value ? 'escuchando' : 'reposo'); eve.tecla(); }} />
          <button type="submit" aria-label="Enviar pregunta"><span aria-hidden>→</span></button>
        </form>
        {!msgs.length && (
          <div className="sz-chips sz-pov-chips">
            {PORTADA.sugerencias.map((s) => <button key={s} type="button" className="sz-chip" onClick={() => enviar(s)}>{s}</button>)}
          </div>
        )}
        {renderHilo(hiloP, 'sz-hilo sz-pov-hilo')}
        {listo && !yendo && restantes.length > 0 && (
          <div className="sz-chips sz-pov-chips">
            {restantes.slice(0, 3).map((s) => <button key={s} type="button" className="sz-chip" onClick={() => enviar(s)}>{s}</button>)}
          </div>
        )}
      </div>

      <section className="sz-hero" aria-labelledby="titular">
        <div className="sz-wrap sz-hero-in">
          <div className="sz-hero-copy">
            <p className="sz-ante">{PORTADA.antetitulo}</p>
            <h1 id="titular" className="sz-h1 sz-h1-xl">
              {PORTADA.titular[0]} <span className="sz-acc">{PORTADA.titular[1]}</span>
            </h1>
            <p className="sz-lead">{PORTADA.bajada}</p>
            <p className="sz-estado" aria-live="polite"><i aria-hidden /> {estado}</p>

            <form className="sz-ask" onSubmit={(e) => { e.preventDefault(); enviar(valor); }}>
              <label htmlFor="pregunta" className="sz-sr">Pregúntale a EVE sobre el ecosistema</label>
              <input
                id="pregunta" type="text" autoComplete="off" value={valor} placeholder={PORTADA.campo}
                onChange={(e) => { setValor(e.target.value); eve.estado(e.target.value ? 'escuchando' : 'reposo'); eve.tecla(); }}
                onBlur={() => { if (!valor) eve.estado('reposo'); }}
              />
              <button type="submit" aria-label="Enviar pregunta"><span aria-hidden>→</span></button>
            </form>
            <p className="sz-aviso">Guardamos esta conversación para mejorar las respuestas. Al seguir, aceptas la <Link href="/contacto">política de tratamiento de datos</Link>.</p>

            {!msgs.length && (
              <div className="sz-chips">
                {PORTADA.sugerencias.map((s) => <button key={s} type="button" className="sz-chip" onClick={() => enviar(s)}>{s}</button>)}
              </div>
            )}

            {renderHilo(hilo, 'sz-hilo')}
            {listo && !yendo && restantes.length > 0 && (
              <div className="sz-chips">
                {restantes.slice(0, 3).map((s) => <button key={s} type="button" className="sz-chip" onClick={() => enviar(s)}>{s}</button>)}
              </div>
            )}
          </div>
          <div className="sz-hero-art" aria-hidden>{grande > 0 && <EveAvatar key={grande} size={grande} />}</div>
        </div>
        <div className="sz-pulso" aria-hidden>
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none"><path d="M0 30 L180 30 L195 30 L205 8 L215 52 L225 30 L420 30 L440 30 L450 14 L460 46 L470 30 L690 30 L705 30 L715 4 L726 56 L737 30 L760 30 L775 12 L785 48 L795 30 L1200 30" /></svg>
        </div>
      </section>
    </>
  );
}
