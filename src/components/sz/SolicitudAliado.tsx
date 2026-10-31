'use client';
import Link from 'next/link';
import { useState } from 'react';
import { CATEGORIAS_LEAD, POR_DEFINIR, enviarLead, validarLead } from '@/lib/eve/flujoLead';

// Mismo flujo que EVE, para quien prefiere un formulario. Envía a /api/eve/lead (equipo comercial).
export default function SolicitudAliado() {
  const [estado, setEstado] = useState<'editando' | 'enviando' | 'ok' | 'error'>('editando');
  const [error, setError] = useState('');

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const g = (k: string) => String(f.get(k) ?? '');
    const datos = validarLead({ nombre: g('nombre'), organizacion: g('organizacion'), categoria: g('categoria'), correo: g('correo'), telefono: g('telefono'), nota: g('nota') });
    if (!datos) { setError('Revisa los datos: necesitamos tu nombre, organización y cargo, un correo válido y un WhatsApp con indicativo.'); return; }
    if (f.get('consentimiento') !== 'on') { setError('Para enviarla necesitamos que aceptes la política de tratamiento de datos.'); return; }
    setError('');
    setEstado('enviando');
    setEstado((await enviarLead(datos, 'formulario', { web: g('web') })) ? 'ok' : 'error');
  };

  if (estado === 'ok') return <div className="sol-ok" role="status"><h2>Recibimos tu solicitud.</h2><p>Una persona del equipo comercial te escribirá lo antes posible al correo y al WhatsApp que nos diste. Mientras tanto, puedes seguir conversando con EVE.</p></div>;

  return (
    <form className="sol" onSubmit={enviar} noValidate>
      <label>Nombre y apellido<input name="nombre" type="text" autoComplete="name" required maxLength={80} /></label>
      <label>Organización y cargo<input name="organizacion" type="text" autoComplete="organization-title" required maxLength={160} placeholder="Ej. Banco X, directora de riesgos" /></label>
      <label>Categoría de interés
        <select name="categoria" defaultValue={POR_DEFINIR}>
          {CATEGORIAS_LEAD.map((c) => <option key={c}>{c}</option>)}
          <option>{POR_DEFINIR}</option>
        </select>
      </label>
      <label>Correo<input name="correo" type="email" autoComplete="email" required maxLength={120} /></label>
      <label>WhatsApp<input name="telefono" type="tel" autoComplete="tel" required maxLength={30} placeholder="+57 300 000 0000" /></label>
      <label>¿Algo que el equipo deba saber? (opcional)<textarea name="nota" rows={3} maxLength={400} /></label>
      <input name="web" type="text" tabIndex={-1} autoComplete="off" aria-hidden className="sol-web" />
      <label className="sol-check"><input name="consentimiento" type="checkbox" /> <span>Autorizo a Scenario Zero a usar estos datos para contactarme, según la <Link href="/politica-de-datos">política de tratamiento de datos</Link>.</span></label>
      {error && <p className="sol-error" role="alert">{error}</p>}
      {estado === 'error' && <p className="sol-error" role="alert">No pudimos enviar tu solicitud. Escríbenos desde <Link href="/contacto">contacto</Link> y la atendemos enseguida.</p>}
      <button type="submit" className="sz-btn sz-btn-primary" disabled={estado === 'enviando'}>{estado === 'enviando' ? 'Enviando…' : 'Enviar solicitud'}</button>
      <p className="sol-nota">Enviar la solicitud no garantiza un cupo ni fija un precio: los valores llegan en tu propuesta formal.</p>
    </form>
  );
}
