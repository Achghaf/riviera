const fs = require('fs');
const path = require('path');
const packageJson = require('./package.json');
const appVersion = packageJson.version || '0.1.0';

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// manifest.json
fs.writeFileSync(path.join(publicDir, 'manifest.json'), JSON.stringify({
  "name": "RIVIERA — Boutique Estivale",
  "short_name": "RIVIERA",
  "version": appVersion,
  "version_name": appVersion,
  "description": "RIVIERA — votre destination pour un été inoubliable. Collection exclusive inspirée du littoral.",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {"src": "/icon-192.svg", "sizes": "192x192", "type": "image/svg+xml", "purpose": "any maskable"},
    {"src": "/icon-512.svg", "sizes": "512x512", "type": "image/svg+xml", "purpose": "any maskable"}
  ],
  "categories": ["shopping", "shopping-commerce"]
}, null, 2));

// sw.js
fs.writeFileSync(path.join(publicDir, 'sw.js'), `const CACHE_NAME = 'summer-store-v1';
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(['/','offline.html']).catch(() => {}))); self.skipWaiting(); });
self.addEventListener('fetch', e => { if(e.request.method !== 'GET') return; e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => { if(!res || res.status !== 200) return res; const clone = res.clone(); caches.open(CACHE_NAME).then(c => c.put(e.request, clone)); return res; }).catch(() => caches.match('/offline.html')))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(names => Promise.all(names.map(n => n !== CACHE_NAME && caches.delete(n))))); e.clientsClaim && e.clientsClaim(); });`);

// offline.html
fs.writeFileSync(path.join(publicDir, 'offline.html'), `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Offline</title><style>body{font-family:system-ui;background:linear-gradient(135deg,#667eea,#764ba2);min-height:100vh;display:flex;align-items:center;justify-content:center}div{text-align:center;background:#fff;padding:40px;border-radius:10px}</style></head><body><div><h1>📵 Offline</h1><p>Check your connection</p><button onclick="location.reload()">Retry</button></div></body></html>`);
