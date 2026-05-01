"use client";

import { PageShell } from "@/components/layout/PageShell";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminWorkspace } from "@/components/admin/AdminWorkspace";

export default function TresorAdminPage() {
  return (
    <PageShell>
      <ProtectedRoute allow={["Admin"]} ownerEmail="tresor@luxe.rw">
        <AdminWorkspace ownerEmail="tresor@luxe.rw" titleOverride="Tresor Founder Control Room" />
      </ProtectedRoute>
    </PageShell>
  );
}
