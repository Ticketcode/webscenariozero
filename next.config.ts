import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  // Por ahora solo se publica la landing de lista de espera: la raíz redirige (temporal) a ella.
  async redirects() {
    return [{ source: '/', destination: '/eventos/bogota/lista-de-espera', permanent: false }];
  },
};
export default config;
