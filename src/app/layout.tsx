import type { Metadata, Viewport } from 'next';
import { Khand, Poppins, Share_Tech } from 'next/font/google';
import JsFlag from '@/components/JsFlag';
import './globals.css';
import './home.css';
import './logos.css';
import './sz.css';

const khand = Khand({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--f-display', display: 'swap' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--f-body', display: 'swap' });
const share = Share_Tech({ subsets: ['latin'], weight: '400', variable: '--f-share', display: 'swap' });

export const metadata: Metadata = {
  title: { default: 'Scenario Zero · Ecosistema de Confianza Digital y Tecnológica', template: '%s · Scenario Zero' },
  description: 'La confianza digital y tecnológica no se decreta. Se construye juntos. Ecosistema 2026-2030 con el respaldo de MinTIC.',
};
export const viewport: Viewport = { themeColor: '#000119', colorScheme: 'dark' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${khand.variable} ${poppins.variable} ${share.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');if(location.pathname==='/')document.documentElement.classList.add('gate');if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('rm')" }} />
      </head>
      <body>
        <JsFlag />
        {children}
      </body>
    </html>
  );
}
