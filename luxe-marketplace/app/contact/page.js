"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { sendMessage } from "@/lib/api";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    await sendMessage({ ...form, date: new Date().toISOString() });
    setSubmitting(false);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeading
          eyebrow="Contact"
          title="Talk to us about partnerships, custom bundles, or launches"
          description="This form is already shaped for Google Apps Script and the `Messages` sheet schema you defined."
        />
        <Card className="mt-10">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <Input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <Input placeholder="Your email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <Textarea placeholder="Your message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              <Button type="submit" variant="accent" disabled={submitting}>
                {submitting ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
                {submitting ? "Sending..." : "Send Message"}
              </Button>
              {sent ? <p className="text-sm text-[hsl(var(--success))]">Message submitted successfully.</p> : null}
            </form>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
