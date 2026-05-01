"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Download, Pencil, Save, Shield, Trash2, Users2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { adminProfiles as fallbackProfiles, contributors, templates, uploads } from "@/lib/data";
import { getAdminProfiles, getDbConnections, getHtmlShowcases, saveAdminProfile, saveDbConnection, saveHtmlShowcase } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { AnalyticsPanel } from "@/components/marketplace/AnalyticsPanel";
import { AssetsLibrary } from "@/components/marketplace/AssetsLibrary";
import { UploadTemplateModal } from "@/components/marketplace/UploadTemplateModal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const adminPaths = {
  "tresor@luxe.rw": "/admin/tresor",
  "cyusa@luxe.rw": "/admin/cyusa",
  "asly@luxe.rw": "/admin/asly"
};

export function getAdminPath(email) {
  return adminPaths[String(email || "").toLowerCase()] || "/admin";
}

export function AdminWorkspace({ ownerEmail, titleOverride }) {
  const { user, isAdmin } = useAuth();
  const [profiles, setProfiles] = useState(fallbackProfiles);
  const [showcases, setShowcases] = useState([]);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    async function load() {
      setProfiles(await getAdminProfiles());
      setShowcases(await getHtmlShowcases());
      setConnections(await getDbConnections());
    }

    load();
  }, []);

  const currentProfile = useMemo(
    () => profiles.find((profile) => String(profile.email).toLowerCase() === String(ownerEmail).toLowerCase()) || profiles[0],
    [ownerEmail, profiles]
  );

  const contributor = contributors.find((item) => item.email.toLowerCase() === user?.email?.toLowerCase());
  const contributorUploads = uploads
    .filter((upload) => (isAdmin ? true : upload.contributorId === contributor?.contributorId))
    .map((upload) => {
      const owner = contributors.find((item) => item.contributorId === upload.contributorId);
      const template = templates.find((item) => item.id === upload.templateId);

      return {
        ...upload,
        ownerName: owner?.name || "Unknown",
        templateName: template?.name || "Unknown template"
      };
    });

  const handleProfileChange = async (adminId, field, value) => {
    const nextProfiles = profiles.map((profile) =>
      profile.adminId === adminId ? { ...profile, [field]: value } : profile
    );
    setProfiles(nextProfiles);
    const updated = nextProfiles.find((profile) => profile.adminId === adminId);
    await saveAdminProfile(updated);
  };

  const handleShowcaseChange = async (indexId, field, value) => {
    const next = showcases.map((item) => item.indexId === indexId ? { ...item, [field]: value } : item);
    setShowcases(next);
    const updated = next.find((item) => item.indexId === indexId);
    await saveHtmlShowcase(updated);
  };

  const handleConnectionChange = async (connectionId, field, value) => {
    const next = connections.map((item) => item.connectionId === connectionId ? { ...item, [field]: value } : item);
    setConnections(next);
    const updated = next.find((item) => item.connectionId === connectionId);
    await saveDbConnection(updated);
  };

  return (
    <section className="mx-auto max-w-7xl space-y-8 px-6 py-20">
      <div
        className="rounded-[36px] border border-white/10 p-8"
        style={{
          background: `linear-gradient(140deg, ${currentProfile?.surface || "#08101d"}, rgba(6,11,19,0.96))`,
          boxShadow: `inset 0 0 0 1px ${(currentProfile?.accent || "#f3c34a")}22`
        }}
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-sm uppercase tracking-[0.28em] text-white/45">Private Admin Workspace</div>
            <h1 className="mt-2 text-4xl font-semibold">{titleOverride || currentProfile?.title || "Admin Control Room"}</h1>
            <p className="mt-3 max-w-3xl text-white/60">
              Restricted to {currentProfile?.name}. This page is meant for direct website editing, premium catalog control, and HTML showcase management.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Badge style={{ borderColor: `${currentProfile?.accent}44`, color: currentProfile?.accent }}>{currentProfile?.themeName}</Badge>
              <Badge>{currentProfile?.email}</Badge>
              <Badge>Direct Site Editor</Badge>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <UploadTemplateModal triggerLabel="Admin Upload" contributorName={user?.name || "Contributor"} contributorEmail={user?.email || ""} />
            <Button asChild variant="outline">
              <Link href="/shop">Preview Public Marketplace</Link>
            </Button>
          </div>
        </div>
      </div>

      <AnalyticsPanel />

      <Card>
        <CardContent className="space-y-6">
          <div>
            <div className="text-sm uppercase tracking-[0.28em] text-white/45">Admin styles</div>
            <h2 className="mt-2 text-2xl font-semibold">Three editable admin identities</h2>
            <p className="mt-2 text-sm text-white/55">Each profile is editable and persisted to Google Sheets through Apps Script.</p>
          </div>
          <div className="grid gap-4 xl:grid-cols-3">
            {profiles.map((profile) => (
              <div
                key={profile.adminId}
                className="rounded-[28px] border border-white/10 p-5"
                style={{
                  background: `linear-gradient(180deg, ${profile.surface}, rgba(8,12,18,0.88))`,
                  boxShadow: `inset 0 0 0 1px ${profile.accent}33`
                }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <Badge style={{ borderColor: `${profile.accent}44`, color: profile.accent }}>{profile.themeName}</Badge>
                  <div className="h-4 w-4 rounded-full" style={{ backgroundColor: profile.accent }} />
                </div>
                <div className="space-y-3">
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white"
                    value={profile.name}
                    onChange={(e) => handleProfileChange(profile.adminId, "name", e.target.value)}
                  />
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white"
                    value={profile.title}
                    onChange={(e) => handleProfileChange(profile.adminId, "title", e.target.value)}
                  />
                  <textarea
                    className="min-h-24 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white"
                    value={profile.styleNote}
                    onChange={(e) => handleProfileChange(profile.adminId, "styleNote", e.target.value)}
                  />
                  <div className="pt-2 text-xs text-white/45">{profile.email}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[0.7fr,1.3fr]">
        <Card>
          <CardContent className="space-y-5">
            <div className="flex items-center gap-3">
              <Users2 className="h-5 w-5 text-[rgb(244,195,74)]" />
              <h2 className="text-xl font-semibold">Contributors & roles</h2>
            </div>
            {contributors.map((member) => (
              <div key={member.contributorId} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-white/50">{member.email}</div>
                  </div>
                  <Badge>{member.role}</Badge>
                </div>
                <div className="mt-3 text-sm text-white/55">Total uploads: {member.uploadsCount}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-5">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-[rgb(130,171,255)]" />
              <h2 className="text-xl font-semibold">Uploads & ZIP access</h2>
            </div>
            <div className="space-y-4">
              {contributorUploads.map((item) => (
                <div key={item.uploadId} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="font-medium">{item.templateName}</div>
                      <div className="mt-1 text-sm text-white/50">
                        Contributor: {item.ownerName} | Uploaded {formatDate(item.uploadDate)}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                      <Button asChild variant="accent" size="sm">
                        <a href={item.zipFileLink} target="_blank" rel="noreferrer">
                          <Download className="mr-2 h-4 w-4" />
                          Download Source Code ZIP
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <AssetsLibrary />

      <Card>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.28em] text-white/45">Index HTML menu</div>
              <h2 className="mt-2 text-2xl font-semibold">Preview-ready index.html showcase library</h2>
            </div>
            <div className="text-sm text-white/50">Each card is ready to hold an `index.html` path, preview image, backend spec, and RWF price.</div>
          </div>
          <div className="grid gap-4 xl:grid-cols-3">
            {showcases.map((item) => (
              <div key={item.indexId} className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]">
                <img src={item.previewImage} alt={item.name} className="h-44 w-full object-cover" />
                <div className="space-y-3 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <input
                      className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-lg font-semibold text-white"
                      value={item.name}
                      onChange={(e) => handleShowcaseChange(item.indexId, "name", e.target.value)}
                    />
                    <Badge>{item.category}</Badge>
                  </div>
                  <input
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white"
                    value={item.previewTitle || ""}
                    onChange={(e) => handleShowcaseChange(item.indexId, "previewTitle", e.target.value)}
                    placeholder="Preview title"
                  />
                  <textarea
                    className="min-h-20 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white"
                    value={item.previewDescription || ""}
                    onChange={(e) => handleShowcaseChange(item.indexId, "previewDescription", e.target.value)}
                    placeholder="Preview description"
                  />
                  <input
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white"
                    value={item.indexHtmlPath || ""}
                    onChange={(e) => handleShowcaseChange(item.indexId, "indexHtmlPath", e.target.value)}
                    placeholder="index.html path"
                  />
                  <input
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white"
                    value={item.sourcePath || ""}
                    onChange={(e) => handleShowcaseChange(item.indexId, "sourcePath", e.target.value)}
                    placeholder="source folder path"
                  />
                  <textarea
                    className="min-h-20 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white"
                    value={item.backendSpec || ""}
                    onChange={(e) => handleShowcaseChange(item.indexId, "backendSpec", e.target.value)}
                    placeholder="Backend specification"
                  />
                  <input
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white"
                    value={item.priceRwf}
                    onChange={(e) => handleShowcaseChange(item.indexId, "priceRwf", e.target.value)}
                    placeholder="Price in RWF"
                  />
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-base font-medium text-[rgb(244,195,74)]">
                      {new Intl.NumberFormat("en-RW", { style: "currency", currency: "RWF", maximumFractionDigits: 0 }).format(Number(item.priceRwf || 0))}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/45">
                      <Save className="h-3.5 w-3.5" />
                      Auto-saved
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4">
          <div>
            <div className="text-sm uppercase tracking-[0.28em] text-white/45">Database connections</div>
            <h2 className="mt-2 text-2xl font-semibold">Ready for Google Sheets and other targets</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {connections.map((connection) => (
              <div key={connection.connectionId} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center justify-between">
                  <input
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 font-medium text-white"
                    value={connection.name}
                    onChange={(e) => handleConnectionChange(connection.connectionId, "name", e.target.value)}
                  />
                  <Badge>{connection.status}</Badge>
                </div>
                <input
                  className="mt-3 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white"
                  value={connection.type}
                  onChange={(e) => handleConnectionChange(connection.connectionId, "type", e.target.value)}
                />
                <input
                  className="mt-3 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white"
                  value={connection.target}
                  onChange={(e) => handleConnectionChange(connection.connectionId, "target", e.target.value)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
