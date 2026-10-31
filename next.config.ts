import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  // Panorama se fusionó dentro de /ecosistema (addendum del 30 oct): 301 permanente, el contenido vive en el ancla #panorama.
  async redirects() {
    return [{ source: '/panorama', destination: '/ecosistema#panorama', statusCode: 301 }];
  },
};
export default config;
