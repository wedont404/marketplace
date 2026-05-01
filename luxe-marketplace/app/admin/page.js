"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { PageShell } from "@/components/layout/PageShell";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { getAdminPath } from "@/components/admin/AdminWorkspace";

export default function AdminPage() {
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    if (user?.email) {
      router.replace(getAdminPath(user.email));
    }
  }, [router, user?.email]);

  return (
    <PageShell>
      <ProtectedRoute allow={["Admin"]}>
        <section className="mx-auto max-w-7xl px-6 py-20 text-sm text-white/55">
          Redirecting to your private admin workspace...
        </section>
      </ProtectedRoute>
    </PageShell>
  );
}
