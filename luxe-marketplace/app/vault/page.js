"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getAdminProfiles } from "@/lib/api";
import { adminProfiles as fallbackProfiles } from "@/lib/data";
import { PageShell } from "@/components/layout/PageShell";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { getAdminPath } from "@/components/admin/AdminWorkspace";

export default function VaultPage() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState(fallbackProfiles);

  useEffect(() => {
    getAdminProfiles().then(setProfiles);
  }, []);

  return (
    <PageShell>
      <ProtectedRoute allow={["Admin"]}>
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-10 text-center">
            <div className="text-sm uppercase tracking-[0.28em] text-white/40">Choose Workspace</div>
            <h1 className="mt-4 text-5xl font-semibold">Select your private profile</h1>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {profiles.map((profile) => (
              <Link
                key={profile.adminId}
                href={getAdminPath(profile.email)}
                className="rounded-[32px] border border-white/10 p-8 transition hover:-translate-y-1"
                style={{
                  background: `linear-gradient(180deg, ${profile.surface}, rgba(6,11,19,0.92))`,
                  boxShadow: `inset 0 0 0 1px ${profile.accent}2a`
                }}
              >
                <div className="mb-10 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-black/20 text-3xl font-semibold">
                  {profile.name?.charAt(0)}
                </div>
                <div className="text-2xl font-semibold">{profile.name}</div>
                <div className="mt-2 text-sm text-white/55">{profile.title}</div>
                <div className="mt-6 text-xs uppercase tracking-[0.24em]" style={{ color: profile.accent }}>
                  {String(user?.email).toLowerCase() === String(profile.email).toLowerCase() ? "Authorized" : "Restricted"}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </ProtectedRoute>
    </PageShell>
  );
}
