"use client";

import Link from "next/link";
import { Download, Heart, ShoppingBag } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { contributors, templates, uploads } from "@/lib/data";
import { PageShell } from "@/components/layout/PageShell";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { UploadTemplateModal } from "@/components/marketplace/UploadTemplateModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const { user } = useAuth();

  const purchased = templates.filter((item) => user?.purchasedItems?.includes(item.id));
  const favorites = templates.filter((item) => user?.favorites?.includes(item.id));
  const contributor = contributors.find((item) => item.email.toLowerCase() === user?.email?.toLowerCase());
  const ownUploads = uploads.filter((item) => item.contributorId === contributor?.contributorId);

  return (
    <PageShell>
      <ProtectedRoute>
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-6 lg:grid-cols-[0.35fr,0.65fr]">
            <Card>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-sm uppercase tracking-[0.28em] text-white/45">Account</div>
                  <h1 className="mt-2 text-3xl font-semibold">{user?.name || "Guest User"}</h1>
                  <p className="mt-2 text-sm text-white/55">{user?.email || "Please sign in to unlock downloads."}</p>
                </div>
                <div className="grid gap-3">
                  <Badge>{user?.role || "Viewer"}</Badge>
                  <Button asChild variant="outline">
                    <Link href="/shop">Browse marketplace</Link>
                  </Button>
                  {user?.role === "Contributor" ? <UploadTemplateModal contributorName={user.name} triggerLabel="Upload Template" /> : null}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardContent>
                  <div className="mb-5 flex items-center gap-3">
                    <ShoppingBag className="h-5 w-5 text-[rgb(244,195,74)]" />
                    <h2 className="text-xl font-semibold">Purchased templates</h2>
                  </div>
                  <div className="grid gap-4">
                    {purchased.length ? (
                      purchased.map((item) => (
                        <div key={item.id} className="flex flex-col gap-4 rounded-[24px] border border-white/10 bg-white/[0.03] p-5 md:flex-row md:items-center md:justify-between">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="mt-1 text-sm text-white/50">{item.framework}</div>
                          </div>
                          <div className="flex gap-3">
                            <Button asChild variant="outline">
                              <a href={item.downloadLink} target="_blank" rel="noreferrer" className="gap-2">
                                <Download className="h-4 w-4" />
                                Download ZIP
                              </a>
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-white/50">No purchased templates yet.</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <div className="mb-5 flex items-center gap-3">
                    <Heart className="h-5 w-5 text-[rgb(130,171,255)]" />
                    <h2 className="text-xl font-semibold">Favorites</h2>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {favorites.length ? favorites.map((item) => <Badge key={item.id}>{item.name}</Badge>) : <p className="text-sm text-white/50">No favorites saved yet.</p>}
                  </div>
                </CardContent>
              </Card>

              {user?.role === "Contributor" ? (
                <Card>
                  <CardContent>
                    <div className="mb-5 text-xl font-semibold">My uploads and ZIP access</div>
                    <div className="space-y-4">
                      {ownUploads.map((upload) => {
                        const template = templates.find((item) => item.id === upload.templateId);
                        return (
                          <div key={upload.uploadId} className="flex flex-col gap-4 rounded-[24px] border border-white/10 bg-white/[0.03] p-5 md:flex-row md:items-center md:justify-between">
                            <div>
                              <div className="font-medium">{template?.name || upload.templateId}</div>
                              <div className="mt-1 text-sm text-white/50">Uploaded template ZIP available for download.</div>
                            </div>
                            <div className="flex gap-3">
                              <Button variant="outline">Edit Upload</Button>
                              <Button asChild variant="accent">
                                <a href={upload.zipFileLink} target="_blank" rel="noreferrer">Download ZIP</a>
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </div>
        </section>
      </ProtectedRoute>
    </PageShell>
  );
}
