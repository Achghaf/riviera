import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const ADMIN_EMAILS = ['bnsachraf1@gmail.com'];

interface AuthStore {
  email: string | null;
  login: (email: string) => void;
  logout: () => void;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist((set, get) => ({
    email: null,
    login: (email: string) => set({ email }),
    logout: () => set({ email: null }),
    isAdmin: () => {
      const e = get().email;
      return !!e && ADMIN_EMAILS.includes(e.toLowerCase());
    },
  }), { name: 'summer_store_auth' })
);
