"use client";

import { Download, Pencil, Shield, Trash2, Users2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { contributors, templates, uploads } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { PageShell } from "@/components/layout/PageShell";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AnalyticsPanel } from "@/components/marketplace/AnalyticsPanel";
import { AssetsLibrary } from "@/components/marketplace/AssetsLibrary";
import { UploadTemplateModal } from "@/components/marketplace/UploadTemplateModal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const { user, isAdmin } = useAuth();
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

  return (
    <PageShell>
      <ProtectedRoute>
        <section className="mx-auto max-w-7xl space-y-8 px-6 py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.28em] text-white/45">Team Workspace</div>
              <h1 className="mt-2 text-4xl font-semibold">Contributor Portal & Admin Control Room</h1>
              <p className="mt-3 max-w-3xl text-white/60">
                Secure template operations for uploads, ZIP asset management, reusable resources, and contributor oversight.
              </p>
            </div>
            <UploadTemplateModal triggerLabel={isAdmin ? "Admin Upload" : "New Upload"} contributorName={user?.name || "Contributor"} />
          </div>

          <AnalyticsPanel />

          <div className="grid gap-6 xl:grid-cols-[0.7fr,1.3fr]">
            {isAdmin ? (
              <Card>
                <CardContent className="space-y-5">
                  <div className="flex items-center gap-3">
                    <Users2 className="h-5 w-5 text-[rgb(244,195,74)]" />
                    <h2 className="text-xl font-semibold">Contributors</h2>
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
            ) : null}

            <Card className={isAdmin ? "" : "xl:col-span-2"}>
              <CardContent className="space-y-5">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-[rgb(130,171,255)]" />
                  <h2 className="text-xl font-semibold">{isAdmin ? "Uploads & ZIP access" : "My uploads & ZIP access"}</h2>
                </div>
                <div className="space-y-4">
                  {contributorUploads.map((item) => (
                    <div key={item.uploadId} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="font-medium">{item.templateName}</div>
                          <div className="mt-1 text-sm text-white/50">
                            Contributor: {item.ownerName} • Uploaded {formatDate(item.uploadDate)}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm">
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                          {isAdmin ? (
                            <Button variant="outline" size="sm">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </Button>
                          ) : null}
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
            <CardContent className="grid gap-6 md:grid-cols-3">
              <div>
                <div className="text-sm uppercase tracking-[0.28em] text-white/45">Latest uploads</div>
                <div className="mt-3 text-lg font-medium">Nebula SaaS Launch Kit</div>
                <p className="mt-2 text-sm text-white/55">Synced to the Uploads sheet with ZIP storage links and contributor metadata.</p>
              </div>
              <div>
                <div className="text-sm uppercase tracking-[0.28em] text-white/45">Performance analytics</div>
                <div className="mt-3 text-lg font-medium">Placeholder dashboard</div>
                <p className="mt-2 text-sm text-white/55">Ready for upload counts, conversion rate, monthly revenue, and top contributor reporting.</p>
              </div>
              <div>
                <div className="text-sm uppercase tracking-[0.28em] text-white/45">Permissions</div>
                <div className="mt-3 text-lg font-medium">Role-aware workflow</div>
                <p className="mt-2 text-sm text-white/55">Admins manage all uploads and contributors, while contributors are scoped to their own assets and ZIPs.</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </ProtectedRoute>
    </PageShell>
  );
}
