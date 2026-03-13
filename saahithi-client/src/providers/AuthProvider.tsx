"use client";

import { createContext, useContext, useState, useEffect } from "react";
import userApi from "@/services/user";
import authApi from "@/services/auth";

// interface User {
//   id: string;
//   email: string;
// }

interface AuthContextType {
  user: any;
  loading: boolean;
  setUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    try {
      const me = await userApi.getCurrentUser();
      setUser(me);
    } catch {
      setUser(null);
      authApi.logout();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return ctx;
}
