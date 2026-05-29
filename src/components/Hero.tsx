'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  const [heroImg, setHeroImg] = useState('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80&auto=format');

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.tag}>
          <div className={styles.tagLine} />
          <span className={styles.tagText}>Collection Été 2025</span>
        </div>
        <h1 className={styles.heading}>
          L&apos;été commence <em>ici</em>
        </h1>
        <p className={styles.sub}>
          Découvrez notre collection exclusive de produits premium pour un été inoubliable sur la Côte d&apos;Azur.
        </p>
        <div className={styles.actions}>
          <a href="#products" className={styles.btnPrimary}>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            Découvrir la Collection
          </a>
          <a href="#categories" className={styles.btnOutline}>Voir les Catégories</a>
        </div>
        <div className={styles.stats}>
          {[
            { num: '500+', label: 'Produits' },
            { num: '12K+', label: 'Clients' },
            { num: '4.9★', label: 'Note Moyenne' },
          ].map((s) => (
            <div key={s.label}>
              <div className={styles.statNum}>{s.num}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.imageWrap}>
        <Image
          src={heroImg}
          alt="Plage ensoleillée"
          fill
          priority
          onError={() => setHeroImg('/placeholder.svg')}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className={styles.imageOverlay} />
        <div className={styles.badge}>
          <div className={styles.badgeIcon}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div className={styles.badgeText}>
            <strong>Livraison Gratuite</strong>
            <span>Dès 60€ d&apos;achat</span>
          </div>
        </div>
      </div>
    </section>
  );
}
