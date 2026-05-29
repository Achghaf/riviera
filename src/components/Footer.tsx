import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <div className={styles.logoMark}>
                <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div>
                <div className={styles.logoText}>Summer Store</div>
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
          <p>© 2025 Summer Store. Tous droits réservés.</p>
          <p>Made with ☀️ pour un été parfait</p>
        </div>
      </div>
    </footer>
  );
}
