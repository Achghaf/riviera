'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import styles from './CartDrawer.module.css';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeFromCart, changeQty, subtotal } = useCartStore();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const sub = subtotal();
  const shipping = sub >= 60 ? 0 : 5.99;
  const total = sub + shipping;
  const itemCount = items.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <div className={`${styles.overlay} ${open ? styles.open : ''}`} onClick={onClose} />
      <div className={`${styles.drawer} ${open ? styles.open : ''}`} role="dialog" aria-label="Panier">
        <div className={styles.header}>
          <h2>Mon Panier</h2>
          <button className={styles.close} onClick={onClose} aria-label="Fermer">
            <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className={styles.body}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>
                <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              </div>
              <strong>Votre panier est vide</strong>
              <p>Découvrez notre collection estivale</p>
              <button className={styles.shopBtn} onClick={onClose}>Explorer la boutique</button>
            </div>
          ) : (
            <div className={styles.items}>
              {items.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.itemImg}>
                    <Image src={item.img} alt={item.name} width={72} height={72} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  </div>
                  <div className={styles.itemInfo}>
                    <div className={styles.itemCat}>{item.cat}</div>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.controls}>
                      <button className={styles.qtyBtn} onClick={() => changeQty(item.id, -1)}>−</button>
                      <span className={styles.qtyVal}>{item.qty}</span>
                      <button className={styles.qtyBtn} onClick={() => changeQty(item.id, 1)}>+</button>
                      <span className={styles.itemPrice}>{(item.price * item.qty).toFixed(2)}€</span>
                      <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>Retirer</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totals}>
              <div className={styles.totalRow}>
                <span>Sous-total ({itemCount} art.)</span>
                <span>{sub.toFixed(2)}€</span>
              </div>
              <div className={styles.totalRow}>
                <span>Livraison</span>
                <span>{shipping === 0 ? 'Gratuit 🎉' : `${shipping.toFixed(2)}€`}</span>
              </div>
              <div className={`${styles.totalRow} ${styles.grand}`}>
                <span>Total TTC</span>
                <span>{total.toFixed(2)}€</span>
              </div>
            </div>
            <button className={styles.checkout}>Commander maintenant</button>
            <button className={styles.continueShopping} onClick={onClose}>Continuer mes achats</button>
            <div className={styles.notes}>
              <span>🔒 Paiement 100% sécurisé</span>
              <span>↩ Retours gratuits sous 30j</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
