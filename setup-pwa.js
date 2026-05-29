const fs = require('fs');
const path = require('path');
const packageJson = require('./package.json');
const appVersion = packageJson.version || '0.1.0';

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
  console.log('✓ Created public directory');
}

// Create manifest.json
const manifest = {
  "name": "Summer Store — Boutique Estivale",
  "short_name": "Summer Store",
  "version": appVersion,
  "version_name": appVersion,
  "description": "Votre destination pour tous vos besoins estivaux. Collection exclusive de produits premium pour un été inoubliable.",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "screenshots": [
    {
      "src": "/screenshot-540x720.png",
      "sizes": "540x720",
      "type": "image/png",
      "form_factor": "narrow"
    },
    {
      "src": "/screenshot-1280x720.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide"
    }
  ],
  "categories": ["shopping", "shopping-commerce"],
  "prefer_related_applications": false
};

fs.writeFileSync(
  path.join(publicDir, 'manifest.json'),
  JSON.stringify(manifest, null, 2)
);
console.log('✓ Created manifest.json');

// Create service worker
const serviceWorker = `// Service Worker for PWA functionality
const CACHE_NAME = 'summer-store-v1';
const urlsToCache = [
  '/',
  '/offline.html',
];

// Install event - cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache).catch(() => {
          // Some files might not exist yet, that's ok
        });
      })
  );
  self.skipWaiting();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            return caches.match('/offline.html').catch(() => {
              return new Response('Offline');
            });
          });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});
`;

fs.writeFileSync(
  path.join(publicDir, 'sw.js'),
  serviceWorker
);
console.log('✓ Created service worker (sw.js)');

// Create offline fallback page
const offlineHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Offline - Summer Store</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    
    .container {
      text-align: center;
      background: white;
      border-radius: 10px;
      padding: 40px 20px;
      max-width: 500px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    }
    
    h1 {
      color: #333;
      margin-bottom: 10px;
      font-size: 2em;
    }
    
    p {
      color: #666;
      margin-bottom: 30px;
      line-height: 1.6;
    }
    
    button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      transition: transform 0.2s;
    }
    
    button:active {
      transform: scale(0.98);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📵 Vous êtes hors ligne</h1>
    <p>Vous n'avez pas de connexion Internet. Vérifiez votre connexion et réessayez.</p>
    <button onclick="window.location.reload()">Réessayer</button>
  </div>
</body>
</html>
`;

fs.writeFileSync(
  path.join(publicDir, 'offline.html'),
  offlineHtml
);
console.log('✓ Created offline fallback (offline.html)');

console.log('\n✅ PWA setup complete!');
console.log('\nNext steps:');
console.log('1. Add PWA icons:');
console.log('   - icon-192x192.png (192x192)');
console.log('   - icon-512x512.png (512x512)');
console.log('2. Run: npm run build');
console.log('3. Test in browser DevTools > Application > Manifest');
