'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PRODUCTS as INIT_PRODUCTS, Product } from '@/lib/data';
import { useAuthStore } from '@/store/authStore';

export default function AdminPage() {
  const isAdmin = useAuthStore((s) => s.isAdmin)();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // clone initial products into local state for editing
    setProducts(INIT_PRODUCTS.map((p) => ({ ...p })));
  }, []);

  if (!isAdmin) {
    return (
      <main style={{ padding: 40 }}>
        <h2>Accès refusé</h2>
        <p>Vous n'êtes pas administrateur. Connectez-vous avec un compte administrateur pour accéder au tableau de bord.</p>
        <p><Link href="/">Retour à l'accueil</Link></p>
      </main>
    );
  }

  const updateField = (id: number, field: keyof Product, value: any) => {
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleDelete = (id: number) => setProducts((prev) => prev.filter((p) => p.id !== id));

  const handleAdd = () => {
    const nextId = Math.max(0, ...products.map((p) => p.id)) + 1;
    setProducts((prev) => [{ id: nextId, name: 'Nouveau produit', price: 0, cat: 'Accessoires', badge: null, img: '' }, ...prev]);
  };

  const handleSave = () => {
    // For now, just log the updated products.
    console.log('Admin saved products:', products);
    alert('Modifications sauvegardées localement (console pour détails).');
  };

  return (
    <main style={{ padding: 28 }}>
      <h1>Tableau de bord Admin</h1>
      <p>Modifier les produits — les changements sont stockés localement pour l'instant.</p>
      <div style={{ margin: '18px 0' }}>
        <button onClick={handleAdd} style={{ marginRight: 8 }}>Ajouter un produit</button>
        <button onClick={handleSave}>Enregistrer les modifications</button>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {products.map((p) => (
          <div key={p.id} style={{ padding: 12, border: '1px solid #e6e6e6', borderRadius: 8, display: 'grid', gridTemplateColumns: '1fr 140px', gap: 12, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input value={p.name} onChange={(e) => updateField(p.id, 'name', e.target.value)} style={{ flex: 1 }} />
                <input value={String(p.price)} onChange={(e) => updateField(p.id, 'price', parseFloat(e.target.value || '0'))} style={{ width: 100 }} />
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <select value={p.cat} onChange={(e) => updateField(p.id, 'cat', e.target.value as any)}>
                  <option>Accessoires</option>
                  <option>Vêtements</option>
                  <option>Soins</option>
                  <option>Chaussures</option>
                  <option>Maison</option>
                </select>
                <input placeholder="Badge" value={p.badge ?? ''} onChange={(e) => updateField(p.id, 'badge', e.target.value || null)} />
                <input placeholder="Image URL" value={p.img} onChange={(e) => updateField(p.id, 'img', e.target.value)} style={{ flex: 1 }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => handleDelete(p.id)} style={{ background: '#f8d7da', border: '1px solid #f5c6cb' }}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
