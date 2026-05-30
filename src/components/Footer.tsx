import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <div className={styles.logoMark} aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
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
            </div>
            <p className={styles.tagline}>Votre destination premium pour un été inoubliable sur la Côte d&apos;Azur.</p>
          </div>
          <div className={styles.links}>
            {[
              { title: 'Boutique', items: ['Collection', 'Nouveautés', 'Promotions', 'Bestsellers'] },
              { title: 'Aide', items: ['Livraison', 'Retours', 'FAQ', 'Contact'] },
              { title: 'Légal', items: ['CGV', 'Confidentialité', 'Cookies', 'Mentions légales'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className={styles.colTitle}>{col.title}</h4>
                <ul className={styles.colList}>
                  {col.items.map((item) => (
                    <li key={item}><a href="#">{item}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.bottom}>
          <p>© 2025 RIVIERA. Tous droits réservés.</p>
          <p>Made with ☀️ pour un été parfait</p>
        </div>
      </div>
    </footer>
  );
}
