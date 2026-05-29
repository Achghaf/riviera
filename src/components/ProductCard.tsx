'use client';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/lib/data';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  delay: number;
  onToast: (msg: string) => void;
}

export default function ProductCard({ product, delay, onToast }: ProductCardProps) {
  const { addToCart, toggleWish, wishlist } = useCartStore();
  const isWished = wishlist.includes(product.id);

  const handleAdd = () => {
    addToCart(product);
    onToast(`${product.name} ajouté au panier`);
  };

  const handleWish = () => {
    toggleWish(product.id);
    if (!isWished) onToast('Ajouté aux favoris ♡');
  };

  return (
    <div className={styles.card} style={{ '--delay': `${delay}ms` } as React.CSSProperties}>
      <div className={styles.imgWrap}>
        <Image src={product.img} alt={product.name} fill style={{ objectFit: 'cover' }} sizes="(max-width: 640px) 50vw, (max-width: 900px) 33vw, 25vw" />
        {product.badge && <div className={styles.badge}>{product.badge}</div>}
        <button
          className={`${styles.wishBtn} ${isWished ? styles.wished : ''}`}
          onClick={handleWish}
          aria-label="Favori"
        >
          <svg viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>
      </div>
      <div className={styles.body}>
        <div className={styles.cat}>{product.cat}</div>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.footer}>
          <span className={styles.price}>{product.price.toFixed(2)}€</span>
          <button className={styles.addBtn} onClick={handleAdd} aria-label="Ajouter au panier">
            <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
