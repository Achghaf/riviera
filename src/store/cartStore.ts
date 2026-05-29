import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/lib/data';

export interface CartItem extends Product {
  qty: number;
}

interface CartStore {
  items: CartItem[];
  wishlist: number[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  changeQty: (id: number, delta: number) => void;
  clearCart: () => void;
  toggleWish: (id: number) => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],

      addToCart: (product) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id);
          if (existing) {
            return { items: state.items.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i) };
          }
          return { items: [...state.items, { ...product, qty: 1 }] };
        }),

      removeFromCart: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      changeQty: (id, delta) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
          ),
        })),

      clearCart: () => set({ items: [] }),

      toggleWish: (id) =>
        set((state) => ({
          wishlist: state.wishlist.includes(id)
            ? state.wishlist.filter((w) => w !== id)
            : [...state.wishlist, id],
        })),

      totalItems: () => get().items.reduce((s, i) => s + i.qty, 0),
      subtotal: () => get().items.reduce((s, i) => s + i.price * i.qty, 0),
    }),
    { name: 'summer_store_cart' }
  )
);
