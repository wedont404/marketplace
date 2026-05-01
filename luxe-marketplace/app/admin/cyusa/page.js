"use client";

import { PageShell } from "@/components/layout/PageShell";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminWorkspace } from "@/components/admin/AdminWorkspace";

export default function CyusaAdminPage() {
  return (
    <PageShell>
      <ProtectedRoute allow={["Admin"]} ownerEmail="cyusa@luxe.rw">
        <AdminWorkspace ownerEmail="cyusa@luxe.rw" titleOverride="Cyusa Blue Analytics Studio" />
      </ProtectedRoute>
    </PageShell>
  );
}
