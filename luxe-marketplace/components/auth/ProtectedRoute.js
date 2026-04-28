"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function ProtectedRoute({ children, allow = ["Admin", "Contributor"] }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && (!user || !allow.includes(user.role))) {
      router.push("/login");
    }
  }, [allow, loading, router, user]);

  if (loading || !user || !allow.includes(user.role)) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-sm text-white/55">
        Securing your workspace...
      </div>
    );
  }

  return children;
}
