'use client';
import { useState } from 'react';
import styles from './Newsletter.module.css';

interface NewsletterProps {
  onToast: (msg: string) => void;
}

export default function Newsletter({ onToast }: NewsletterProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onToast(`Merci ! Vous êtes inscrit(e) avec ${email}`);
    setEmail('');
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.text}>
            <span className={styles.tag}>Newsletter</span>
            <h2 className={styles.title}>Restez dans la <em>tendance</em></h2>
            <p className={styles.sub}>Recevez nos offres exclusives et nouveautés en avant-première.</p>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              className={styles.input}
              type="email"
              placeholder="Votre adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className={styles.btn} type="submit">S&apos;inscrire</button>
          </form>
          <p className={styles.hint}>Pas de spam. Désabonnement en un clic.</p>
        </div>
      </div>
    </section>
  );
}
