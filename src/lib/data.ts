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
  { id: 1,  name: 'Chapeau de Paille Riviera',   price: 49.99, cat: 'Accessoires', badge: 'Bestseller', img: 'https://images.unsplash.com/photo-1565839847953-8b1e4f1a4e24?w=600&q=80&auto=format' },
  { id: 2,  name: 'Robe Florale Méditerranée',   price: 89.99, cat: 'Vêtements',   badge: 'Nouveau',    img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80&auto=format' },
  { id: 3,  name: 'Crème Solaire SPF 50+',        price: 24.99, cat: 'Soins',       badge: null,         img: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80&auto=format' },
  { id: 4,  name: 'Sandales Espadrilles',         price: 59.99, cat: 'Chaussures',  badge: null,         img: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&q=80&auto=format' },
  { id: 5,  name: 'Serviette de Plage Luxe',      price: 39.99, cat: 'Maison',      badge: null,         img: 'https://images.unsplash.com/photo-1616690248513-8a6a7c9d4c44?w=600&q=80&auto=format' },
  { id: 6,  name: 'Lunettes de Soleil Yacht',     price: 119.99,cat: 'Accessoires', badge: 'Exclusif',   img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80&auto=format' },
  { id: 7,  name: 'Sac de Plage Osier',           price: 34.99, cat: 'Accessoires', badge: null,         img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80&auto=format' },
  { id: 8,  name: 'Après-Soleil Hydratant',       price: 19.99, cat: 'Soins',       badge: null,         img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80&auto=format' },
  { id: 9,  name: "Bikini Côte d'Azur",           price: 69.99, cat: 'Vêtements',   badge: 'Exclusif',   img: 'https://images.unsplash.com/photo-1566241832378-917a0f30db2c?w=600&q=80&auto=format' },
  { id: 10, name: 'Tongs Premium',                price: 29.99, cat: 'Chaussures',  badge: null,         img: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&q=80&auto=format' },
  { id: 11, name: 'Huile Bronzante Bio',          price: 22.99, cat: 'Soins',       badge: null,         img: 'https://images.unsplash.com/photo-1562887245-1b8e7c018d6f?w=600&q=80&auto=format' },
  { id: 12, name: 'Short de Bain Riviera',        price: 54.99, cat: 'Vêtements',   badge: 'Nouveau',    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80&auto=format' },
];

export const CATEGORIES: Array<{ name: Category; count: number; img: string }> = [
  { name: 'Accessoires', count: 3, img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80&auto=format' },
  { name: 'Vêtements',   count: 3, img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80&auto=format' },
  { name: 'Soins',       count: 3, img: 'https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?w=600&q=80&auto=format' },
  { name: 'Chaussures',  count: 2, img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80&auto=format' },
  { name: 'Maison',      count: 1, img: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80&auto=format' },
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
