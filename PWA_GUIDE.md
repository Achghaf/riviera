# Summer Store PWA Configuration

This Next.js application has been configured as a **Progressive Web App (PWA)** with the following features:

## ✅ What's Included

### Code Changes
- **`src/app/layout.tsx`** - Added PWA metadata tags for manifest, theme colors, and iOS support
- **`src/components/PWAInstaller.tsx`** - Service worker registration component
- **`package.json`** - Updated build scripts to auto-generate PWA files
- **`init-pwa.js`** - Initialization script that creates PWA resources

### Auto-Generated PWA Files (in `/public`)
The `init-pwa.js` script automatically creates these files when you run `npm dev` or `npm build`:

1. **`public/manifest.json`** - PWA manifest with app metadata and icons
2. **`public/sw.js`** - Service worker for offline support and caching
3. **`public/offline.html`** - Fallback page when offline
4. **`public/robots.txt`** - SEO robots file

## 🚀 Getting Started

### 1. First Run
```bash
npm run dev
# OR
npm run build
```
This will automatically run `init-pwa.js` which creates all PWA files in the `public/` folder.

### 2. Add App Icons
Create two PNG images and place them in the `public/` folder:
- `public/icon-192x192.png` - Small app icon
- `public/icon-512x512.png` - Large app icon

For quick icon generation, use:
- [Favicon Generator](https://www.favicon-generator.org/)
- [PWA Image Generator](https://www.pwabuilder.com/)

### 3. Test the PWA

**In Chrome/Edge:**
1. Open DevTools (F12)
2. Go to **Application** tab
3. Check **Manifest** section
4. Look for "Install" button (if icons are present)

**On Mobile:**
1. Open the app on an Android device
2. Tap the menu (three dots)
3. Select "Install app" or "Add to Home Screen"

## 📋 PWA Features

✅ **Installable** - Users can install as an app  
✅ **Offline Support** - Service worker caches and serves pages offline  
✅ **App-like Experience** - Runs in standalone mode  
✅ **iOS Compatible** - Apple Web App meta tags included  
✅ **Fast Loading** - Service worker cache strategy  
✅ **Theme Colors** - Custom colors in address bar  

## 🔧 Customize

### Change App Name
Edit `init-pwa.js`:
```javascript
"name": "Your App Name",
"short_name": "Short Name",
"description": "Your description",
```

### Change Colors
Edit `src/app/layout.tsx` and `init-pwa.js`:
```javascript
"theme_color": "#000000",        // Your primary color
"background_color": "#ffffff",   // Your background color
```

### Update Cache Strategy
Edit `public/sw.js` to change caching behavior:
- Cache expiration
- Network-first vs Cache-first strategy
- Files to cache

## 📱 Install Prompt

The app will prompt users to install when:
1. Service worker is registered
2. Manifest is valid
3. Icons exist
4. User has engaged with the site

## 🐛 Troubleshooting

**App not installable?**
- Check if manifest.json loads (DevTools > Application > Manifest)
- Verify icon files exist in `public/` folder
- Ensure HTTPS in production
- Check browser console for errors

**Service worker not working?**
- Clear cache: DevTools > Application > Storage > Clear site data
- Unregister old workers: DevTools > Application > Service Workers
- Check `public/sw.js` file

**Icons not showing?**
- Place PNG files in `public/` folder with exact names:
  - `icon-192x192.png`
  - `icon-512x512.png`
- Test in Chrome (most reliable for PWA testing)

## 📚 More Resources

- [MDN: Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [web.dev PWA Guide](https://web.dev/progressive-web-apps/)
- [PWA Builder](https://www.pwabuilder.com/)
- [Maskable Icons](https://web.dev/maskable-icon/)
