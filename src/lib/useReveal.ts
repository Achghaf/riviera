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
    el.querySelectorAll('[class*="card"], [class*="reveal"]').forEach((child) => {
      observer.observe(child);
    });

    return () => observer.disconnect();
  }, []);

  return ref;
}
