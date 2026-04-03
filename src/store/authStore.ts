import { create } from 'zustand';
import type { AuthUser } from '../types';

interface AuthStore {
  user: AuthUser | null;
  rememberMe: boolean;
  _initialized: boolean;
  setUser: (user: AuthUser, rememberMe: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  rememberMe: false,
  _initialized: false,
  setUser: (user, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem('auth-user', JSON.stringify({ user, rememberMe }));
      sessionStorage.removeItem('auth-user');
    } else {
      sessionStorage.setItem('auth-user', JSON.stringify({ user, rememberMe }));
      localStorage.removeItem('auth-user');
    }
    set({ user, rememberMe });
  },
  logout: () => {
    localStorage.removeItem('auth-user');
    sessionStorage.removeItem('auth-user');
    set({ user: null, rememberMe: false });
  },
}));

export function initAuthFromStorage() {
  const stored =
    localStorage.getItem('auth-user') || sessionStorage.getItem('auth-user');
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as { user: AuthUser; rememberMe: boolean };
      useAuthStore.setState({ user: parsed.user, rememberMe: parsed.rememberMe });
    } catch {
      // ignore corrupted data
    }
  }
  useAuthStore.setState({ _initialized: true });
}
