# PWA Setup Instructions

Your Next.js Summer Store has been configured for PWA (Progressive Web App). To complete the setup:

## 1. Create the Public Folder Structure

Create the following directory and files manually:

### Directory: `public/`

#### File: `public/manifest.json`
```json
{
  "name": "Summer Store — Boutique Estivale",
  "short_name": "Summer Store",
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
  "categories": ["shopping", "shopping-commerce"],
  "prefer_related_applications": false
}
```

#### File: `public/sw.js` (Service Worker)
```javascript
const CACHE_NAME = 'summer-store-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/offline.html',
      ]).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) return response;
        return fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200) return response;
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
            return response;
          })
          .catch(() => caches.match('/offline.html'));
      })
  );
});

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
```

#### File: `public/offline.html`
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Offline - Summer Store</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
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
    }
    h1 { color: #333; }
    p { color: #666; }
    button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 5px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📵 Vous êtes hors ligne</h1>
    <p>Vérifiez votre connexion Internet et réessayez.</p>
    <button onclick="window.location.reload()">Réessayer</button>
  </div>
</body>
</html>
```

#### File: `public/robots.txt`
```
User-agent: *
Allow: /
```

## 2. Add PWA Icons

Place app icons in the `public/` directory:
- `icon-192x192.png` (192x192 pixels)
- `icon-512x512.png` (512x512 pixels)

You can generate these from an online tool or use image editing software.

## 3. Build and Test

```bash
npm run build
npm start
```

Then open DevTools (F12) → Application → Manifest to verify PWA setup.

## What Was Done

✅ Updated `src/app/layout.tsx` with PWA metadata tags
✅ Created `src/components/PWAInstaller.tsx` to register the service worker
✅ Added Apple Web App meta tags for iOS support

## PWA Features Enabled

- **Installable**: Users can "Add to Home Screen" on mobile and desktop
- **Offline Support**: Service worker caches pages and shows offline fallback
- **App-like Experience**: Standalone display mode with custom theme colors
- **iOS Support**: Apple Web App meta tags for iOS compatibility
- **Maskable Icons**: Icons adapt to device shape constraints
