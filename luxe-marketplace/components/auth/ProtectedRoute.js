"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function ProtectedRoute({ children, allow = ["Admin", "Contributor", "Customer"], ownerEmail }) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const blocked = !loading && (
    !user ||
    !allow.includes(user.role) ||
    (ownerEmail && String(user.email).toLowerCase() !== String(ownerEmail).toLowerCase())
  );

  useEffect(() => {
    if (blocked) {
      router.push("/login");
    }
  }, [blocked, router]);

  if (loading || blocked) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-sm text-white/55">
        Securing your workspace...
      </div>
    );
  }

  return children;
}
