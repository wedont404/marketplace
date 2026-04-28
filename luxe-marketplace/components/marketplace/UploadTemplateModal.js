"use client";

import { useMemo, useState } from "react";
import { LoaderCircle, UploadCloud } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { uploadTemplate } from "@/lib/api";

const initialState = {
  productTitle: "",
  description: "",
  category: "",
  framework: "",
  tags: "",
  price: "",
  demoLink: "",
  zipFileLink: "",
  previewImage: ""
};

export function UploadTemplateModal({ triggerLabel = "New Upload", contributorName = "Contributor" }) {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(initialState);

  const isReady = useMemo(
    () => Object.values(form).every((value) => String(value).trim().length > 0),
    [form]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isReady) return;

    setSubmitting(true);
    setProgress(24);
    setTimeout(() => setProgress(56), 250);
    setTimeout(() => setProgress(82), 600);

    await uploadTemplate({
      contributorName,
      productName: form.productTitle,
      description: form.description,
      category: form.category,
      framework: form.framework,
      tags: form.tags,
      price: form.price,
      demoLink: form.demoLink,
      zipFileLink: form.zipFileLink,
      previewImage: form.previewImage,
      dateUploaded: new Date().toISOString()
    });

    setProgress(100);
    setTimeout(() => {
      setSubmitting(false);
      setProgress(0);
      setForm(initialState);
      setOpen(false);
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="accent">{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="mb-6">
          <div className="text-sm uppercase tracking-[0.28em] text-white/45">Contributor Portal</div>
          <h3 className="mt-3 text-2xl font-semibold">Upload a new template package</h3>
          <p className="mt-2 text-sm leading-7 text-white/60">
            This form is future-ready for Google Drive storage and Google Sheets metadata sync through Apps Script.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <Input placeholder="Product title" value={form.productTitle} onChange={(e) => setForm({ ...form, productTitle: e.target.value })} />
            <Input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <Input placeholder="Framework used" value={form.framework} onChange={(e) => setForm({ ...form, framework: e.target.value })} />
            <Input placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <Input placeholder="Demo link" value={form.demoLink} onChange={(e) => setForm({ ...form, demoLink: e.target.value })} />
            <Input placeholder="ZIP file link or storage placeholder" value={form.zipFileLink} onChange={(e) => setForm({ ...form, zipFileLink: e.target.value })} />
            <Input placeholder="Preview image URL" value={form.previewImage} onChange={(e) => setForm({ ...form, previewImage: e.target.value })} />
            <Input placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
          </div>
          <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />

          <div className="rounded-[24px] border border-dashed border-white/10 bg-white/[0.02] p-6 text-center">
            <UploadCloud className="mx-auto h-8 w-8 text-[rgb(244,195,74)]" />
            <div className="mt-4 text-sm font-medium">Drag and drop area for ZIP and preview uploads</div>
            <p className="mt-2 text-xs text-white/45">Replace this placeholder with Drive upload handling in your Apps Script flow.</p>
          </div>

          {submitting ? <Progress value={progress} /> : null}

          <Button type="submit" variant="accent" className="w-full" disabled={!isReady || submitting}>
            {submitting ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
            {submitting ? "Syncing upload..." : "Save Upload Metadata"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
