"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "@/lib/api";

const AuthContext = createContext(null);
const STORAGE_KEY = "luxe-marketplace-user";

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = async ({ identifier, password }) => {
    const authUser = await loginUser({ identifier, password });

    if (!authUser) {
      throw new Error("Invalid credentials");
    }

    setUser(authUser);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
    router.push(authUser.role === "Admin" ? "/admin" : "/dashboard");
    return authUser;
  };

  const register = async (payload) => {
    const authUser = await registerUser(payload);
    setUser(authUser);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
    router.push(authUser.role === "Admin" ? "/admin" : "/dashboard");
    return authUser;
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
    router.push("/login");
  };

  const updateUser = (patch) => {
    setUser((current) => {
      const next = { ...current, ...patch };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      updateUser,
      isAdmin: user?.role === "Admin",
      isContributor: user?.role === "Contributor"
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
