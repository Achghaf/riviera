import type { Metadata } from 'next';
import PWAInstaller from '@/components/PWAInstaller';
import PWAInstallButton from '@/components/PWAInstallButton';
import './globals.css';

export const metadata: Metadata = {
  title: 'RIVIERA — Boutique Estivale',
  description: 'RIVIERA — votre destination pour un été inoubliable. Collection exclusive de produits premium inspirés du littoral.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'RIVIERA',
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
      rel: 'icon',
      url: '/icon-192.svg',
      sizes: '192x192',
      type: 'image/svg+xml',
    },
    {
      rel: 'icon',
      url: '/icon-512.svg',
      sizes: '512x512',
      type: 'image/svg+xml',
    },
    {
      rel: 'apple-touch-icon',
      url: '/icon-192.svg',
      sizes: '192x192',
      type: 'image/svg+xml',
    },
    {
      rel: 'apple-touch-icon',
      url: '/icon-512.svg',
      sizes: '512x512',
      type: 'image/svg+xml',
    },
  ],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="RIVIERA" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="app-root">
        <PWAInstaller />
        <div className="page">{children}</div>
        <PWAInstallButton />
      </body>
    </html>
  );
}
