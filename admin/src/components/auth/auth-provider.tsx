'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authApi, setOnUnauthorized, type AuthAdmin } from '@/lib/api/client';

interface AuthContextType {
  admin: AuthAdmin | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  admin: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AuthAdmin | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleUnauthorized = useCallback(() => {
    setAdmin(null);
    if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    setOnUnauthorized(handleUnauthorized);
    return () => setOnUnauthorized(null);
  }, [handleUnauthorized]);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await authApi.me();
        setAdmin(res.data.admin);
      } catch {
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  async function login(email: string, password: string) {
    const res = await authApi.login(email, password);
    setAdmin(res.data.admin);
  }

  async function logout() {
    try {
      await authApi.logout();
    } finally {
      setAdmin(null);
      router.push('/login');
    }
  }

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
