export type Category = 'Accessoires' | 'Vêtements' | 'Soins' | 'Chaussures' | 'Maison';

export interface Product {
  id: number;
  name: string;
  price: number;
  cat: Category;
  badge: string | null;
  img: string;
}

export const PRODUCTS: Product[] = [
  { id: 1,  name: 'Chapeau de Paille Riviera',   price: 49.99, cat: 'Accessoires', badge: 'Bestseller', img: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=600&q=80&auto=format' },
  { id: 2,  name: 'Robe Florale Méditerranée',   price: 89.99, cat: 'Vêtements',   badge: 'Nouveau',    img: 'https://images.unsplash.com/photo-1595777707802-a9f1b58f5e7f?w=600&q=80&auto=format' },
  { id: 3,  name: 'Crème Solaire SPF 50+',        price: 24.99, cat: 'Soins',       badge: null,         img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80&auto=format' },
  { id: 4,  name: 'Sandales Espadrilles',         price: 59.99, cat: 'Chaussures',  badge: null,         img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80&auto=format' },
  { id: 5,  name: 'Serviette de Plage Luxe',      price: 39.99, cat: 'Maison',      badge: null,         img: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&q=80&auto=format' },
  { id: 6,  name: 'Lunettes de Soleil Yacht',     price: 119.99,cat: 'Accessoires', badge: 'Exclusif',   img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80&auto=format' },
  { id: 7,  name: 'Sac de Plage Osier',           price: 34.99, cat: 'Accessoires', badge: null,         img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80&auto=format' },
  { id: 8,  name: 'Après-Soleil Hydratant',       price: 19.99, cat: 'Soins',       badge: null,         img: 'https://images.unsplash.com/photo-1576091160550-112173f31c74?w=600&q=80&auto=format' },
  { id: 9,  name: "Bikini Côte d'Azur",           price: 69.99, cat: 'Vêtements',   badge: 'Exclusif',   img: 'https://images.unsplash.com/photo-1515230248929-9adc003e2e8b?w=600&q=80&auto=format' },
  { id: 10, name: 'Tongs Premium',                price: 29.99, cat: 'Chaussures',  badge: null,         img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80&auto=format' },
  { id: 11, name: 'Huile Bronzante Bio',          price: 22.99, cat: 'Soins',       badge: null,         img: 'https://images.unsplash.com/photo-1550857862-d2460586dba8?w=600&q=80&auto=format' },
  { id: 12, name: 'Short de Bain Riviera',        price: 54.99, cat: 'Vêtements',   badge: 'Nouveau',    img: 'https://images.unsplash.com/photo-1591532471359-34c5cdd61c4e?w=600&q=80&auto=format' },
];

export const CATEGORIES: Array<{ name: Category; count: number; img: string }> = [
  { name: 'Accessoires', count: 3, img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80&auto=format' },
  { name: 'Vêtements',   count: 3, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80&auto=format' },
  { name: 'Soins',       count: 3, img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80&auto=format' },
  { name: 'Chaussures',  count: 2, img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80&auto=format' },
  { name: 'Maison',      count: 1, img: 'https://images.unsplash.com/photo-1565636192335-14f0ee94ec82?w=600&q=80&auto=format' },
];

export const TICKER_ITEMS = [
  'Livraison gratuite dès 60€',
  'Retour gratuit 30 jours',
  'Collection Été 2025',
  'Paiement sécurisé',
  'Produits éco-responsables',
  'Nouveautés chaque semaine',
  'Service client 7j/7',
];
