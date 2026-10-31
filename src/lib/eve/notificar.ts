import type { DatosLead } from './flujoLead';

// Entrega de una solicitud de aliado al equipo comercial. No hay base de datos: el correo es el registro y un webhook opcional
// conecta con un backoffice/CRM o con una automatización (Make, Zapier, n8n) que puede avisar por WhatsApp al comercial.
// Canales (todos por variables de entorno, ver .env.example): RESEND_API_KEY (correo) y LEAD_WEBHOOK_URL (backoffice / alerta).
export type LeadEntrante = DatosLead & {
  origen: 'eve' | 'formulario';
  recibido: string;
  consentimiento: { aceptado: true; politica: string; texto: string };
};

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

export const mensajeAlerta = (l: LeadEntrante) =>
  `Nuevo lead de aliado (${l.origen === 'eve' ? 'por EVE' : 'por formulario'}): ${l.nombre} · ${l.organizacion} · ${l.categoria} · ${l.telefono} · ${l.correo}${l.nota ? ` · «${l.nota}»` : ''}`;

async function porCorreo(l: LeadEntrante): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const para = (process.env.LEAD_EMAIL_TO || 'operaciones@scenariozero.org').split(',').map((s) => s.trim()).filter(Boolean);
  const filas: [string, string][] = [['Nombre', l.nombre], ['Organización y cargo', l.organizacion], ['Categoría', l.categoria], ['Correo', l.correo], ['WhatsApp', l.telefono], ['Mensaje', l.nota || '—'], ['Origen', l.origen === 'eve' ? 'Conversación con EVE' : 'Formulario /aliados/solicitud'], ['Recibido', l.recibido]];
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.LEAD_EMAIL_FROM || 'Scenario Zero <onboarding@resend.dev>',
        to: para,
        reply_to: l.correo,
        subject: `Nuevo lead de aliado · ${l.categoria} · ${l.organizacion}`.slice(0, 150),
        text: filas.map(([k, v]) => `${k}: ${v}`).join('\n') + '\n\nCon consentimiento expreso para ser contactado (política de datos provisional).',
        html: `<p><strong>Nuevo lead de aliado</strong></p><table cellpadding="6">${filas.map(([k, v]) => `<tr><td><strong>${esc(k)}</strong></td><td>${esc(v)}</td></tr>`).join('')}</table><p>Con consentimiento expreso para ser contactado.</p>`,
      }),
    });
    return r.ok;
  } catch { return false; }
}

async function porWebhook(l: LeadEntrante): Promise<boolean> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return false;
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(process.env.LEAD_WEBHOOK_SECRET ? { 'x-sz-secret': process.env.LEAD_WEBHOOK_SECRET } : {}) },
      body: JSON.stringify({ tipo: 'lead_aliado', ...l, alertaWhatsappA: process.env.LEAD_WHATSAPP_TO || null, mensajeAlerta: mensajeAlerta(l) }),
    });
    return r.ok;
  } catch { return false; }
}

// ok = al menos un canal lo recibió. Sin ningún canal configurado: en desarrollo se acepta (y se muestra en consola);
// en producción devuelve ok:false para que el chat no diga "enviado" cuando no llegó a nadie.
export async function notificarLead(l: LeadEntrante): Promise<{ ok: boolean; canales: string[] }> {
  const [correo, webhook] = await Promise.all([porCorreo(l), porWebhook(l)]);
  const canales = [correo && 'correo', webhook && 'webhook'].filter(Boolean) as string[];
  const configurado = !!(process.env.RESEND_API_KEY || process.env.LEAD_WEBHOOK_URL);
  if (!configurado && process.env.NODE_ENV !== 'production') {
    console.info('[lead] sin canal configurado (modo desarrollo):', JSON.stringify(l));
    return { ok: true, canales: ['consola'] };
  }
  console.info(JSON.stringify({ evento: 'lead_aliado', t: l.recibido, origen: l.origen, categoria: l.categoria, canales, ok: canales.length > 0 }));
  return { ok: canales.length > 0, canales };
}
