'use client';
import { useState, useEffect, useRef } from 'react';
import { PRODUCTS, type Category } from '@/lib/data';
import ProductCard from './ProductCard';
import styles from './Products.module.css';

const FILTERS = ['Tous', 'Accessoires', 'Vêtements', 'Soins', 'Chaussures', 'Maison'];

interface ProductsProps {
  activeFilter: string;
  onToast: (msg: string) => void;
  onFilterChange: (f: string) => void;
}

export default function Products({ activeFilter, onToast, onFilterChange }: ProductsProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [allProducts, setAllProducts] = useState(PRODUCTS);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    el.querySelectorAll('[class*="card"]').forEach((child) => {
      observer.observe(child);
      try {
        const rect = child.getBoundingClientRect();
        const vh = (window.innerHeight || document.documentElement.clientHeight);
        // If the card is already within the viewport, reveal it immediately
        if (rect.top < vh) child.classList.add('visible');
      } catch (e) {
        // ignore if running in an unexpected environment
      }
    });
    return () => observer.disconnect();
  }, [activeFilter]);

  useEffect(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('summer_store_products') : null;
      if (saved) setAllProducts(JSON.parse(saved));
      else setAllProducts(PRODUCTS);
    } catch (e) {
      setAllProducts(PRODUCTS);
    }
  }, []);

  const filtered = activeFilter === 'Tous'
    ? allProducts
    : allProducts.filter((p) => p.cat === activeFilter);

  return (
    <section className={styles.section} id="products">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>Notre Sélection</span>
          <h2 className={styles.title}>Produits <em>Premium</em></h2>
          <p className={styles.sub}>Des produits soigneusement sélectionnés pour sublimer votre été.</p>
        </div>

        <div className={styles.filterBar}>
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`${styles.filterBtn} ${activeFilter === f ? styles.active : ''}`}
              onClick={() => onFilterChange(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className={styles.grid} ref={gridRef}>
          {filtered.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              delay={(i % 8) * 70}
              onToast={onToast}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
