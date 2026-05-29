'use client';
import { useEffect, useState } from 'react';
import styles from './Toast.module.css';

export interface ToastItem {
  id: number;
  message: string;
}

interface ToastProps {
  toasts: ToastItem[];
  onRemove: (id: number) => void;
}

export default function Toast({ toasts, onRemove }: ToastProps) {
  return (
    <div className={styles.container}>
      {toasts.map((t) => (
        <ToastEntry key={t.id} toast={t} onRemove={onRemove} />
      ))}
    </div>
  );
}

function ToastEntry({ toast, onRemove }: { toast: ToastItem; onRemove: (id: number) => void }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onRemove(toast.id), 300);
    }, 2800);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  return (
    <div className={`${styles.toast} ${exiting ? styles.out : ''}`}>
      <span className={styles.dot} />
      {toast.message}
    </div>
  );
}
