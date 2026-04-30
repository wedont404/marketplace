"use client";

import { useState } from "react";
import { LockKeyhole, UserCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Contributor" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "login") {
        await login({ email: form.email, password: form.password });
      } else {
        await register(form);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell>
      <section className="mx-auto flex max-w-5xl px-6 py-20">
        <Card className="mx-auto w-full max-w-xl">
          <CardContent className="p-8">
            <div className="mb-8 space-y-3 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <UserCircle2 className="h-7 w-7 text-[rgb(244,195,74)]" />
              </div>
              <h1 className="text-3xl font-semibold">
                {mode === "login" ? "Secure Team Workspace Login" : "Create a workspace account"}
              </h1>
              <p className="text-sm leading-7 text-white/55">
                Demo admin credentials: `tresor@luxe.rw / tresor123`, `cyusa@luxe.rw / cyusa123`, `asly@luxe.rw / asly123`
              </p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {mode === "register" ? (
                <Input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              ) : null}
              <Input type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <Input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              {mode === "register" ? (
                <div className="grid grid-cols-2 gap-3">
                  <Button type="button" variant={form.role === "Contributor" ? "accent" : "outline"} onClick={() => setForm({ ...form, role: "Contributor" })}>
                    Contributor
                  </Button>
                  <Button type="button" variant={form.role === "Customer" ? "accent" : "outline"} onClick={() => setForm({ ...form, role: "Customer" })}>
                    Customer
                  </Button>
                </div>
              ) : null}
              {error ? (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  <div className="flex items-center gap-2">
                    <LockKeyhole className="h-4 w-4" />
                    {error}
                  </div>
                </div>
              ) : null}
              <Button type="submit" variant="accent" className="w-full" disabled={loading}>
                {loading ? (mode === "login" ? "Signing in..." : "Creating account...") : (mode === "login" ? "Access Workspace" : "Create Account")}
              </Button>
              <button
                type="button"
                className="w-full text-sm text-white/55 transition hover:text-white"
                onClick={() => {
                  setMode(mode === "login" ? "register" : "login");
                  setError("");
                }}
              >
                {mode === "login" ? "Need an account? Register here" : "Already have an account? Sign in"}
              </button>
            </form>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
