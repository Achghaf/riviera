'use client';

import { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS as INIT_PRODUCTS, Product, Category } from '@/lib/data';
import { useAuthStore } from '@/store/authStore';
import Modal from '@/components/Modal';
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
  // Determine admin client-side to avoid hydration mismatch
  const [ready, setReady] = useState(false);
  const [isAdminLocal, setIsAdminLocal] = useState(false);

  useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('summer_store_auth') : null;
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const e = parsed?.state?.email || email;
          setIsAdminLocal(!!e && ['bnsachraf1@gmail.com'].includes(String(e).toLowerCase()));
        } catch (e) {
          setIsAdminLocal(!!email && ['bnsachraf1@gmail.com'].includes(String(email).toLowerCase()));
        }
      } else {
        setIsAdminLocal(!!email && ['bnsachraf1@gmail.com'].includes(String(email).toLowerCase()));
      }
    } catch (e) {
      setIsAdminLocal(!!email && ['bnsachraf1@gmail.com'].includes(String(email).toLowerCase()));
    }
    setReady(true);
  }, [email]);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'Tous'>('Tous');
  const [sortOption, setSortOption] = useState('recent');
  const [showMergePreview, setShowMergePreview] = useState(false);
  
  // Modal states
  const [modal, setModal] = useState<{ isOpen: boolean; title: string; message: string; onConfirm: () => void; isDangerous?: boolean }>({ isOpen: false, title: '', message: '', onConfirm: () => {}, isDangerous: false });
  const [brokenImages, setBrokenImages] = useState<Set<number>>(new Set());
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

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
 
  const [modal, setModal] = useState<{ isOpen: boolean; title: string; message: string; onConfirm: () => void; isDangerous?: boolean }>({ isOpen: false, title: '', message: '', onConfirm: () => {}, isDangerous: false });
  const [brokenImages, setBrokenImages] = useState<Set<number>>(new Set());
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [showMergePreview, setShowMergePreview] = useState(false);

  const handleDeleteConfirmed = (id: number, name: string) => {
    setModal({
      isOpen: true,
      title: 'Supprimer le produit',
      message: `Êtes-vous sûr de vouloir supprimer "${name}" ? Cette action est irréversible.`,
      isDangerous: true,
      onConfirm: () => {
        handleDelete(id);
        setModal({ ...modal, isOpen: false });
      },
    });
  };

  const resetProductsConfirmed = () => {
    setModal({
      isOpen: true,
      title: 'Réinitialiser le catalogue',
      message: 'Êtes-vous sûr de vouloir réinitialiser tous les produits aux valeurs par défaut ? Les modifications non sauvegardées seront perdues.',
      isDangerous: true,
      onConfirm: () => {
        resetProducts();
        setModal({ ...modal, isOpen: false });
      },
    });
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      // Try server save first
      let serverOk = false;
      try {
        const res = await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(products) });
        serverOk = res.ok;
      } catch (e) {
        serverOk = false;
      }

      // Persist locally as well
      localStorage.setItem('summer_store_products', JSON.stringify(products));
      try {
        if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
          const bc = new BroadcastChannel('summer_store_products_channel');
          bc.postMessage({ type: 'update', products });
          bc.close();
        }
      } catch (e) {
        // ignore
      }

      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
      console.log('Admin saved products:', products, 'serverOk:', serverOk);
    } catch (e) {
      console.error('Failed to save products', e);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleExport = async () => {
    const payload = JSON.stringify(products, null, 2);
    await navigator.clipboard.writeText(payload);
    setModal({
      isOpen: true,
      title: 'Exportation réussie',
      message: 'JSON des produits copié dans le presse-papiers.',
      onConfirm: () => setModal({ ...modal, isOpen: false }),
    });
  };

  // Preview merged catalog for admin
  const mergedPreview = useMemo(() => {
    try {
      const saved = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('summer_store_products') || 'null') : null;
      if (Array.isArray(saved)) {
        const ids = new Set(saved.map((p: any) => p.id));
        return [...saved, ...INIT_PRODUCTS.filter((p) => !ids.has(p.id))].slice(0, 6);
      }
    } catch (e) {
      // ignore
    }
    return INIT_PRODUCTS.slice(0, 6);
  }, []);

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

  if (!ready) {
    return (
      <main className={styles.page}>
        <div className={styles.emptyState}>Chargement…</div>
      </main>
    );
  }

  if (!isAdminLocal) {
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
      <Modal
        isOpen={modal.isOpen}
        title={modal.title}
        message={modal.message}
        isDangerous={modal.isDangerous}
        onConfirm={modal.onConfirm}
        onCancel={() => setModal({ ...modal, isOpen: false })}
      />

      <section className={styles.header}>
        <div className={styles.titleGroup}>
          <h1>Tableau de bord Admin</h1>
          <p>Gérez vos produits, surveillez les performances et publiez votre catalogue depuis un seul endroit.</p>
        </div>
        <div className={styles.actions}>
          <Link href="/">
            <button className={styles.ghostBtn} type="button">Retour à l&apos;accueil</button>
          </Link>
          <button className={styles.primaryBtn} onClick={handleAdd}>Ajouter un produit</button>
          <button className={styles.secondaryBtn} onClick={resetProductsConfirmed}>Réinitialiser</button>
          <button className={styles.ghostBtn} onClick={() => setShowMergePreview(!showMergePreview)}>
            {showMergePreview ? 'Masquer' : 'Aperçu'} catalogue fusionné
          </button>
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

      {showMergePreview && (
        <section className={styles.mergePreview}>
          <div className={styles.mergeHeader}>
            <h3>Aperçu du catalogue fusionné</h3>
            <p>Vos produits personnalisés + produits par défaut (6 premiers)</p>
          </div>
          <div className={styles.productGrid}>
            {mergedPreview.map((product) => (
              <div key={product.id} className={styles.previewCard}>
                <div className={styles.previewImg}>
                  <Image
                    src={brokenImages.has(product.id) ? '/placeholder.svg' : (product.img || '/placeholder.svg')}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="150px"
                    onError={() => setBrokenImages((prev) => new Set(prev).add(product.id))}
                  />
                </div>
                <div className={styles.previewInfo}>
                  <div className={styles.previewName}>{product.name}</div>
                  <div className={styles.previewPrice}>{product.price.toFixed(2)}€</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

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
                <Image
                  src={brokenImages.has(product.id) ? '/placeholder.svg' : (product.img || '/placeholder.svg')}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="150px"
                  onError={() => setBrokenImages((prev) => new Set(prev).add(product.id))}
                />
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
                    <button type="button" className={styles.deleteBtn} onClick={() => handleDeleteConfirmed(product.id, product.name)}>Supprimer</button>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </section>

      <div className={styles.footer}>
        <button
          className={`${styles.primaryBtn} ${saveStatus === 'saving' ? styles.loading : ''} ${saveStatus === 'saved' ? styles.success : ''} ${saveStatus === 'error' ? styles.error : ''}`}
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
        >
          {saveStatus === 'saving' && '⏳ Enregistrement...'}
          {saveStatus === 'saved' && '✓ Sauvegardé'}
          {saveStatus === 'error' && '✗ Erreur'}
          {saveStatus === 'idle' && 'Enregistrer les modifications'}
        </button>
      </div>
    </main>
  );
}
