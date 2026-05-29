import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Summer Store — Boutique Estivale',
  description: 'Votre destination pour tous vos besoins estivaux. Collection exclusive de produits premium pour un été inoubliable.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
