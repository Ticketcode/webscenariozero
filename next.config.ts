import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  // Panorama se fusionó dentro de /ecosistema (addendum del 30 oct): 301 permanente, el contenido vive en el ancla #panorama.
  async redirects() {
    return [
      { source: '/panorama', destination: '/ecosistema#panorama', statusCode: 301 },
      // La lista de espera (Ticketcode) se reemplazó por la solicitud de aliado: EVE toma los datos y los pasa al equipo comercial.
      { source: '/eventos/:slug/lista-de-espera', destination: '/aliados/solicitud', statusCode: 301 },
    ];
  },
};
export default config;
