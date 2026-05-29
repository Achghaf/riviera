'use client';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import styles from './Navbar.module.css';

interface NavbarProps {
  onCartOpen: () => void;
}

export default function Navbar({ onCartOpen }: NavbarProps) {
  const totalItems = useCartStore((s) => s.totalItems());
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          {/* Logo */}
          <a href="#" className={styles.logo}>
            <div className={styles.logoMark}>
              <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div>
              <div className={styles.logoText}>Summer Store</div>
              <div className={styles.logoSub}>Boutique Estivale</div>
            </div>
          </a>

          {/* Desktop links */}
          <ul className={styles.links}>
            {['Collection', 'Nouveautés', 'Promotions', 'À Propos'].map((l) => (
              <li key={l}><a href="#products">{l}</a></li>
            ))}
          </ul>

          {/* Actions */}
          <div className={styles.actions}>
            <button className={styles.iconBtn} aria-label="Rechercher">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
            <button className={styles.iconBtn} onClick={onCartOpen} aria-label="Panier">
              <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
            </button>
            <button
              className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className={styles.mobileMenu}>
            <ul>
              {['Collection', 'Nouveautés', 'Promotions', 'À Propos'].map((l) => (
                <li key={l}><a href="#products" onClick={() => setMenuOpen(false)}>{l}</a></li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
