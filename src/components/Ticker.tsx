import { TICKER_ITEMS } from '@/lib/data';
import styles from './Ticker.module.css';

export default function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className={styles.ticker}>
      <div className={styles.track}>
        {doubled.map((item, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.dot} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
