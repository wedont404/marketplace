"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogOut, Menu, Shield, ShoppingBag, User2, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getAdminPath } from "@/components/admin/AdminWorkspace";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Marketplace" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function Header() {
  const pathname = usePathname();
  const { user, logout, isAdmin } = useAuth();
  const [open, setOpen] = useState(false);

  const accountLinks = user
    ? [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        ...(isAdmin ? [{ href: getAdminPath(user?.email), label: "Team Workspace", icon: Shield }] : [])
      ]
    : [{ href: "/login", label: "Login", icon: User2 }];

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#060b13]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg font-semibold">
            L
          </div>
          <div>
            <div className="font-semibold tracking-[0.24em] text-white/90">LUXE</div>
            <div className="text-xs uppercase tracking-[0.28em] text-white/45">Marketplace</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm text-white/60 transition hover:text-white",
                pathname === item.href && "text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {accountLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Button key={link.href} asChild variant="ghost">
                <Link href={link.href} className="gap-2">
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              </Button>
            );
          })}
          <Button asChild variant="accent">
            <Link href="/shop" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              Explore Templates
            </Link>
          </Button>
          {user ? (
            <Button onClick={logout} variant="outline" size="icon" aria-label="Logout">
              <LogOut className="h-4 w-4" />
            </Button>
          ) : null}
        </div>

        <button
          className="rounded-full border border-white/10 bg-white/5 p-3 text-white/80 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/5 bg-[#060b13]/95 lg:hidden"
          >
            <div className="space-y-4 px-6 py-5">
              {navItems.concat(accountLinks).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-sm text-white/70"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {user ? (
                <Button onClick={logout} variant="outline" className="w-full">
                  Logout
                </Button>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
