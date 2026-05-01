"use client";

import { PageShell } from "@/components/layout/PageShell";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminWorkspace } from "@/components/admin/AdminWorkspace";

export default function AslyVaultPage() {
  return (
    <PageShell>
      <ProtectedRoute allow={["Admin"]} ownerEmail="asly@luxe.rw">
        <AdminWorkspace ownerEmail="asly@luxe.rw" titleOverride="Asly Creative Vault" />
      </ProtectedRoute>
    </PageShell>
  );
}
