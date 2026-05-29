'use client';

import { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS as INIT_PRODUCTS, Product, Category } from '@/lib/data';
import { useAuthStore } from '@/store/authStore';
import styles from './page.module.css';

const CATEGORY_FILTERS: Array<Category | 'Tous'> = ['Tous', 'Accessoires', 'Vêtements', 'Soins', 'Chaussures', 'Maison'];
const SORT_OPTIONS = [
  { value: 'recent', label: 'Derniers ajouts' },
  { value: 'priceAsc', label: 'Prix croissant' },
  { value: 'priceDesc', label: 'Prix décroissant' },
  { value: 'name', label: 'Nom A → Z' },
];

export default function AdminPage() {
  const email = useAuthStore((s) => s.email);
  const isAdmin = !!email && ['bnsachraf1@gmail.com'].includes(email.toLowerCase());
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'Tous'>('Tous');
  const [sortOption, setSortOption] = useState('recent');

  useEffect(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('summer_store_products') : null;
      if (saved) {
        setProducts(JSON.parse(saved));
      } else {
        setProducts(INIT_PRODUCTS.map((p) => ({ ...p })));
      }
    } catch (e) {
      setProducts(INIT_PRODUCTS.map((p) => ({ ...p })));
    }
  }, []);

  const resetProducts = () => setProducts(INIT_PRODUCTS.map((p) => ({ ...p })));

  const handleUpdate = (id: number, field: keyof Product, value: any) => {
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleDelete = (id: number) => setProducts((prev) => prev.filter((p) => p.id !== id));

  const handleDuplicate = (id: number) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    const nextId = Math.max(0, ...products.map((p) => p.id)) + 1;
    setProducts((prev) => [{ ...product, id: nextId, name: `${product.name} (Copie)` }, ...prev]);
  };

  const handleAdd = () => {
    const nextId = Math.max(0, ...products.map((p) => p.id)) + 1;
    setProducts((prev) => [{ id: nextId, name: 'Nouveau produit', price: 0, cat: 'Accessoires', badge: null, img: '' }, ...prev]);
  };

  const handleSave = () => {
    try {
      localStorage.setItem('summer_store_products', JSON.stringify(products));
      console.log('Admin saved products:', products);
      alert('Modifications sauvegardées dans le navigateur.');
    } catch (e) {
      console.error('Failed to save products', e);
      alert('Échec de la sauvegarde. Ouvrez la console pour plus de détails.');
    }
  };

  const handleExport = async () => {
    const payload = JSON.stringify(products, null, 2);
    await navigator.clipboard.writeText(payload);
    alert('JSON des produits copié dans le presse-papiers.');
  };

  const metrics = useMemo(() => {
    const total = products.length;
    const totalValue = products.reduce((sum, item) => sum + item.price, 0);
    const average = total ? totalValue / total : 0;
    const bestseller = products.filter((p) => p.badge === 'Bestseller').length;
    const newItems = products.filter((p) => p.badge === 'Nouveau').length;

    return {
      total,
      totalValue,
      average,
      bestseller,
      newItems,
    };
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (categoryFilter !== 'Tous') {
      filtered = filtered.filter((p) => p.cat === categoryFilter);
    }

    if (search.trim()) {
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (sortOption === 'priceAsc') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceDesc') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    }

    return filtered;
  }, [products, categoryFilter, search, sortOption]);

  if (!isAdmin) {
    return (
      <main className={styles.page}>
        <div className={styles.emptyState}>
          <h2>Accès refusé</h2>
          <p>Vous n&apos;êtes pas administrateur. Connectez-vous avec un compte administrateur pour accéder au tableau de bord.</p>
          <p><Link href="/">Retour à l&apos;accueil</Link></p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <div className={styles.titleGroup}>
          <h1>Tableau de bord Admin</h1>
          <p>Gérez vos produits, surveillez les performances et publiez votre catalogue depuis un seul endroit.</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.primaryBtn} onClick={handleAdd}>Ajouter un produit</button>
          <button className={styles.secondaryBtn} onClick={resetProducts}>Réinitialiser</button>
          <button className={styles.ghostBtn} onClick={handleExport}>Exporter JSON</button>
        </div>
      </section>

      <div className={styles.metrics}>
        <div className={styles.metricCard}>
          <strong>{metrics.total}</strong>
          <span>Produits actifs</span>
        </div>
        <div className={styles.metricCard}>
          <strong>{metrics.totalValue.toFixed(2)}€</strong>
          <span>Valeur totale du catalogue</span>
        </div>
        <div className={styles.metricCard}>
          <strong>{metrics.average.toFixed(2)}€</strong>
          <span>Prix moyen</span>
        </div>
        <div className={styles.metricCard}>
          <strong>{metrics.bestseller} / {metrics.newItems}</strong>
          <span>Bestsellers / Nouveautés</span>
        </div>
      </div>

      <section className={styles.panel}>
        <div className={styles.searchCard}>
          <label htmlFor="admin-search">Recherche par nom de produit</label>
          <input
            id="admin-search"
            className={styles.searchInput}
            type="search"
            placeholder="Ex : Chapeau de Paille..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.filtersCard}>
          <label>Filtrer par catégorie</label>
          <div className={styles.filterRow}>
            {CATEGORY_FILTERS.map((category) => (
              <button
                key={category}
                type="button"
                className={`${styles.filterChip} ${categoryFilter === category ? styles.active : ''}`}
                onClick={() => setCategoryFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 18 }}>
            <label htmlFor="sort-products">Trier les produits</label>
            <select
              id="sort-products"
              className={styles.selectInput}
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className={styles.productGrid}>
        {filteredProducts.length === 0 ? (
          <div className={styles.emptyState}>
            <h2>Aucun produit trouvé</h2>
            <p>Essayez un autre filtre ou ajoutez un nouveau produit pour commencer.</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <article key={product.id} className={styles.productCard}>
              <div className={styles.productMedia}>
                <Image src={product.img || 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80&auto=format'} alt={product.name} fill style={{ objectFit: 'cover' }} sizes="150px" />
              </div>
              <div className={styles.productContent}>
                <div className={styles.productHeading}>
                  <h3>{product.name}</h3>
                  <span className={styles.productBadge}>{product.badge ?? 'Standard'}</span>
                </div>
                <div className={styles.inputRow}>
                  <div className={styles.inputSplit}>
                    <input
                      className={styles.textInput}
                      value={product.name}
                      onChange={(e) => handleUpdate(product.id, 'name', e.target.value)}
                    />
                    <input
                      className={styles.textInput}
                      type="number"
                      min="0"
                      step="0.01"
                      value={String(product.price)}
                      onChange={(e) => handleUpdate(product.id, 'price', parseFloat(e.target.value || '0'))}
                    />
                  </div>
                  <div className={styles.inputSplit}>
                    <select
                      className={styles.selectInput}
                      value={product.cat}
                      onChange={(e) => handleUpdate(product.id, 'cat', e.target.value as Category)}
                    >
                      {CATEGORY_FILTERS.filter((item): item is Category => item !== 'Tous').map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <input
                      className={styles.textInput}
                      placeholder="Badge"
                      value={product.badge ?? ''}
                      onChange={(e) => handleUpdate(product.id, 'badge', e.target.value || null)}
                    />
                  </div>
                </div>
                <div className={styles.inputRow}>
                  <input
                    className={styles.textInput}
                    placeholder="Image URL"
                    value={product.img}
                    onChange={(e) => handleUpdate(product.id, 'img', e.target.value)}
                  />
                </div>
                <div className={styles.productFooter}>
                  <span className={styles.priceTag}>{product.price.toFixed(2)}€</span>
                  <div className={styles.cardActions}>
                    <button type="button" className={styles.duplicateBtn} onClick={() => handleDuplicate(product.id)}>Dupliquer</button>
                    <button type="button" className={styles.deleteBtn} onClick={() => handleDelete(product.id)}>Supprimer</button>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </section>

      <div style={{ marginTop: 28 }}>
        <button className={styles.secondaryBtn} onClick={handleSave}>Enregistrer les modifications</button>
      </div>
    </main>
  );
}
