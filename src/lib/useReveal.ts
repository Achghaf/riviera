'use client';
import { useEffect, useRef } from 'react';

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // For children with reveal classes
            entry.target.querySelectorAll('[class*="d1"], [class*="d2"], [class*="d3"], [class*="d4"], [class*="d5"], [class*="d6"]').forEach((child) => {
              child.classList.add('visible');
            });
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    // Observe the container and all child reveal elements
    observer.observe(el);
    const children = Array.from(el.querySelectorAll('[class*="card"], [class*="reveal"]'));
    children.forEach((child, idx) => {
      observer.observe(child);
      try {
        const rect = child.getBoundingClientRect();
        const vh = (window.innerHeight || document.documentElement.clientHeight);
        // Reveal if already within viewport or among the first few items
        if (rect.top < vh + 40 || idx < 6) {
          child.classList.add('visible');
          // reveal nested delay classes as well
          child.querySelectorAll('[class*="d1"], [class*="d2"], [class*="d3"], [class*="d4"], [class*="d5"], [class*="d6"]').forEach((c) => c.classList.add('visible'));
        }
      } catch (e) {
        // ignore in non-browser environments
      }
    });

    return () => observer.disconnect();
  }, []);

  return ref;
}
