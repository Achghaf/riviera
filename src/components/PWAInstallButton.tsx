'use client';

import { useEffect, useState } from 'react';

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function beforeInstallHandler(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    }

    window.addEventListener('beforeinstallprompt', beforeInstallHandler as EventListener);
    return () => window.removeEventListener('beforeinstallprompt', beforeInstallHandler as EventListener);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    // show prompt
    // @ts-ignore
    deferredPrompt.prompt();
    // @ts-ignore
    const choice = await deferredPrompt.userChoice;
    if (choice && choice.outcome) {
      setVisible(false);
      setDeferredPrompt(null);
    }
  };

  if (!visible) return null;

  return (
    <button
      aria-label="Installer l'application"
      onClick={handleInstall}
      style={{
        position: 'fixed',
        right: 16,
        bottom: 16,
        background: 'linear-gradient(90deg,var(--teal),var(--teal-lt))',
        color: 'white',
        padding: '10px 14px',
        borderRadius: 12,
        boxShadow: 'var(--shadow-md)',
        border: 'none',
        zIndex: 1200,
      }}
    >
      Installer
    </button>
  );
}
