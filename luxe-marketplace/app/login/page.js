"use client";

import { useState } from "react";
import { LockKeyhole, UserCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { requestPasswordReset, verifyPasswordReset } from "@/lib/api";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", role: "Contributor" });
  const [reset, setReset] = useState({ identifier: "", channel: "email", code: "", newPassword: "" });
  const [resetStage, setResetStage] = useState("request");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (mode === "login") {
        await login({ identifier: form.email, password: form.password });
      } else if (mode === "forgot") {
        if (resetStage === "request") {
          const result = await requestPasswordReset(reset);
          setMessage(result?.message || "Verification code sent.");
          setResetStage("verify");
        } else {
          await verifyPasswordReset(reset);
          setMessage("Password updated. You can now sign in.");
          setMode("login");
          setResetStage("request");
          setReset({ identifier: "", channel: "email", code: "", newPassword: "" });
        }
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
                {mode === "login" ? "Secure Team Workspace Login" : mode === "forgot" ? "Reset your password" : "Create a workspace account"}
              </h1>
              <p className="text-sm leading-7 text-white/55">
                Authorized access only.
              </p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {mode === "register" ? (
                <Input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              ) : null}
              {mode === "forgot" ? (
                <>
                  <Input placeholder="Email or WhatsApp number" value={reset.identifier} onChange={(e) => setReset({ ...reset, identifier: e.target.value })} />
                  <div className="grid grid-cols-2 gap-3">
                    <Button type="button" variant={reset.channel === "email" ? "accent" : "outline"} onClick={() => setReset({ ...reset, channel: "email" })}>
                      Email
                    </Button>
                    <Button type="button" variant={reset.channel === "whatsapp" ? "accent" : "outline"} onClick={() => setReset({ ...reset, channel: "whatsapp" })}>
                      WhatsApp
                    </Button>
                  </div>
                  {resetStage === "verify" ? (
                    <>
                      <Input placeholder="Verification code" value={reset.code} onChange={(e) => setReset({ ...reset, code: e.target.value })} />
                      <Input type="password" placeholder="New password" value={reset.newPassword} onChange={(e) => setReset({ ...reset, newPassword: e.target.value })} />
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  <Input placeholder="Email or WhatsApp number" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  <Input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                </>
              )}
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
              {mode === "register" ? (
                <Input placeholder="Phone / WhatsApp number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              ) : null}
              {error ? (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  <div className="flex items-center gap-2">
                    <LockKeyhole className="h-4 w-4" />
                    {error}
                  </div>
                </div>
              ) : null}
              {message ? <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{message}</div> : null}
              <Button type="submit" variant="accent" className="w-full" disabled={loading}>
                {loading ? (
                  mode === "login" ? "Signing in..." : mode === "forgot" ? "Processing..." : "Creating account..."
                ) : (
                  mode === "login" ? "Access Workspace" : mode === "forgot" ? (resetStage === "request" ? "Send Verification Code" : "Verify & Reset Password") : "Create Account"
                )}
              </Button>
              <div className="grid gap-2 text-center text-sm text-white/55">
                <button
                  type="button"
                  className="w-full transition hover:text-white"
                  onClick={() => {
                    setMode(mode === "login" ? "register" : "login");
                    setError("");
                    setMessage("");
                  }}
                >
                  {mode === "login" ? "Need an account? Register here" : "Already have an account? Sign in"}
                </button>
                {mode !== "forgot" ? (
                  <button
                    type="button"
                    className="w-full transition hover:text-white"
                    onClick={() => {
                      setMode("forgot");
                      setResetStage("request");
                      setError("");
                      setMessage("");
                    }}
                  >
                    Forgot password? Reset by email or WhatsApp
                  </button>
                ) : (
                  <button
                    type="button"
                    className="w-full transition hover:text-white"
                    onClick={() => {
                      setMode("login");
                      setResetStage("request");
                      setError("");
                      setMessage("");
                    }}
                  >
                    Back to sign in
                  </button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
