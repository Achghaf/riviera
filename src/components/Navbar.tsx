'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import styles from './Navbar.module.css';

interface NavbarProps {
  onCartOpen: () => void;
}

export default function Navbar({ onCartOpen }: NavbarProps) {
  const totalItems = useCartStore((s) => s.totalItems());
  const { email, login, logout, isAdmin } = useAuthStore((s) => ({
    email: s.email,
    login: s.login,
    logout: s.logout,
    isAdmin: s.isAdmin,
  }));

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleAuth = () => {
    if (email) {
      logout();
      return;
    }
    const val = window.prompt('Entrez votre e‑mail pour vous connecter');
    if (val && val.includes('@')) login(val.trim());
  };

  const initials = email ? email.split('@')[0].slice(0, 2).toUpperCase() : '';

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          {/* Logo */}
          <a href="#" className={styles.logo}>
            <div className={styles.logoMark} aria-hidden>
              <svg viewBox="0 0 24 24" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="10" r="3.5" fill="#FFD166" />
                <g stroke="#FFD166" strokeWidth="1.2" strokeLinecap="round">
                  <line x1="12" y1="1.5" x2="12" y2="4.5" />
                  <line x1="12" y1="15.5" x2="12" y2="18.5" />
                  <line x1="3.6" y1="5.6" x2="5.8" y2="7.8" />
                  <line x1="18.2" y1="13.2" x2="20.4" y2="15.4" />
                  <line x1="3.6" y1="14.4" x2="5.8" y2="12.2" />
                  <line x1="18.2" y1="8.8" x2="20.4" y2="6.6" />
                </g>
              </svg>
            </div>
            <div>
              <div className={styles.logoText}>RIVIERA</div>
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

            {/* Login / User */}
            <button className={styles.profileBtn} onClick={handleAuth} aria-label={email ? 'Mon compte' : 'Connexion'}>
                {hydrated && email ? (
                  <span className={styles.userAvatar}>{initials}</span>
                ) : (
                  <svg viewBox="0 0 24 24"><path d="M12 12a5 5 0 100-10 5 5 0 000 10z"/><path d="M2 22a10 10 0 0120 0"/></svg>
                )}
                <span className={styles.profileLabel}>{hydrated && email ? 'Mon compte' : 'Se connecter'}</span>
            </button>

            {/* Admin dashboard link */}
            {hydrated && isAdmin() && (
              <Link href="/admin" aria-label="Admin" className={styles.iconBtnLink}>
                <button className={styles.iconBtn} aria-label="Admin Dashboard">
                  <svg viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zM13 21h8V11h-8v10zM13 3v6h8V3h-8zM3 21h8v-6H3v6z"/></svg>
                </button>
              </Link>
            )}

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
