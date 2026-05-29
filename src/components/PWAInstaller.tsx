'use client';

import { useEffect } from 'react';

export default function PWAInstaller() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Service worker registration failed - this is expected if sw.js doesn't exist yet
      });
    }
  }, []);

  return null;
}
