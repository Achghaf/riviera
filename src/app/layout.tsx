import type { Metadata } from 'next';
import PWAInstaller from '@/components/PWAInstaller';
import './globals.css';

export const metadata: Metadata = {
  title: 'Summer Store — Boutique Estivale',
  description: 'Votre destination pour tous vos besoins estivaux. Collection exclusive de produits premium pour un été inoubliable.',
  manifest: '/manifest.json',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Summer Store',
  },
  formatDetection: {
    telephone: false,
  },
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      url: '/icon-192x192.png',
      sizes: '192x192',
    },
    {
      rel: 'apple-touch-icon',
      url: '/icon-512x512.png',
      sizes: '512x512',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Summer Store" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="app-root">
        <PWAInstaller />
        <div className="page">{children}</div>
      </body>
    </html>
  );
}
