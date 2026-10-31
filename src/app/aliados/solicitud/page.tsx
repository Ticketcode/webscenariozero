import type { Metadata } from 'next';
import { PageHead, Shell } from '@/components/sz/Shell';
import SolicitudAliado from '@/components/sz/SolicitudAliado';

export const metadata: Metadata = { title: 'Quiero ser aliado · Scenario Zero', description: 'Déjanos tus datos y una persona del equipo comercial te contacta para conversar sobre tu categoría de aliado.' };

export default function Solicitud() {
  return (
    <Shell>
      <PageHead antetitulo="LOS PRIMEROS ALIADOS" titular="Cuéntanos de tu organización." bajada="Déjanos tus datos y una persona del equipo comercial te escribe para conversar sobre tu categoría. También puedes hacerlo conversando con EVE." />
      <section className="sz-sec"><div className="sz-wrap"><SolicitudAliado /></div></section>
    </Shell>
  );
}
