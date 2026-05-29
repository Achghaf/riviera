'use client';
import { useState } from 'react';
import Image from 'next/image';
import { CATEGORIES } from '@/lib/data';
import { useReveal } from '@/lib/useReveal';
import styles from './Categories.module.css';

interface CategoriesProps {
  onFilter: (cat: string) => void;
}

export default function Categories({ onFilter }: CategoriesProps) {
  const ref = useReveal<HTMLDivElement>();
  const [brokenImages, setBrokenImages] = useState<Set<string>>(new Set());

  const handleImageError = (catName: string) => {
    setBrokenImages((prev) => new Set(prev).add(catName));
  };

  return (
    <section className={styles.section} id="categories">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>Explorez</span>
          <h2 className={styles.title}>Nos <em>Catégories</em></h2>
          <p className={styles.sub}>De la plage à la ville, trouvez tout ce qu&apos;il vous faut pour un été parfait.</p>
        </div>
        <div className={styles.grid} ref={ref}>
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.name}
              className={`${styles.card} ${styles[`d${i + 1}`]}`}
              onClick={() => { onFilter(cat.name); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              <Image
                src={brokenImages.has(cat.name) ? '/placeholder.svg' : cat.img}
                alt={cat.name}
                fill
                style={{ objectFit: 'cover' }}
                onError={() => handleImageError(cat.name)}
              />
              <div className={styles.overlay} />
              <div className={styles.label}>
                <strong>{cat.name}</strong>
                <span>{cat.count} produits</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
