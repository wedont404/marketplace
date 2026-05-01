"use client";

import { PageShell } from "@/components/layout/PageShell";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminWorkspace } from "@/components/admin/AdminWorkspace";

export default function CyusaVaultPage() {
  return (
    <PageShell>
      <ProtectedRoute allow={["Admin"]} ownerEmail="cyusa@luxe.rw">
        <AdminWorkspace ownerEmail="cyusa@luxe.rw" titleOverride="Cyusa Analytics Vault" />
      </ProtectedRoute>
    </PageShell>
  );
}
