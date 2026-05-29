'use client';
import { useState, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import Categories from '@/components/Categories';
import Products from '@/components/Products';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import Toast, { type ToastItem } from '@/components/Toast';

let toastId = 0;

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [activeFilter, setActiveFilter] = useState('Tous');

  const showToast = useCallback((message: string) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleFilter = useCallback((cat: string) => {
    setActiveFilter(cat);
  }, []);

  return (
    <>
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <main>
        <Hero />
        <Ticker />
        <Categories onFilter={handleFilter} />
        <Products
          activeFilter={activeFilter}
          onToast={showToast}
          onFilterChange={setActiveFilter}
        />
        <Newsletter onToast={showToast} />
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <Toast toasts={toasts} onRemove={removeToast} />
    </>
  );
}
