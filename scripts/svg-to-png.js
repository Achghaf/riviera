// Simple Node script to convert SVG icons to PNG using sharp.
// Run: npm install && npm run icons:png

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const icons = [
  { src: 'public/icon-512.svg', out: 'public/icon-512x512.png', size: 512 },
  { src: 'public/icon-192.svg', out: 'public/icon-192x192.png', size: 192 },
];

async function convert() {
  for (const ico of icons) {
    const srcPath = path.resolve(ico.src);
    const outPath = path.resolve(ico.out);
    if (!fs.existsSync(srcPath)) {
      console.warn('Missing', srcPath);
      continue;
    }
    console.log('Converting', srcPath, '→', outPath);
    await sharp(srcPath).png({ quality: 90 }).resize(ico.size, ico.size).toFile(outPath);
  }
  console.log('Done.');
}

convert().catch((err) => { console.error(err); process.exit(1); });
