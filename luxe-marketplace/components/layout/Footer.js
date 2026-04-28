import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="space-y-4">
          <div className="text-sm uppercase tracking-[0.38em] text-white/45">Luxe Marketplace</div>
          <p className="max-w-sm text-sm leading-7 text-white/55">
            Premium frontend-only templates, polished UI kits, and contributor-ready workflows for a modern digital products business.
          </p>
        </div>
        <div>
          <div className="mb-4 text-sm uppercase tracking-[0.28em] text-white/45">Navigate</div>
          <div className="space-y-3 text-sm text-white/65">
            <Link href="/">Home</Link>
            <Link href="/shop" className="block">Marketplace</Link>
            <Link href="/dashboard" className="block">Dashboard</Link>
          </div>
        </div>
        <div>
          <div className="mb-4 text-sm uppercase tracking-[0.28em] text-white/45">Company</div>
          <div className="space-y-3 text-sm text-white/65">
            <Link href="/about">About</Link>
            <Link href="/contact" className="block">Contact</Link>
            <Link href="/login" className="block">Portal Login</Link>
          </div>
        </div>
        <div>
          <div className="mb-4 text-sm uppercase tracking-[0.28em] text-white/45">Backend</div>
          <p className="text-sm leading-7 text-white/55">
            Powered by `NEXT_PUBLIC_API_URL` for Google Apps Script endpoints with Sheets storage and Stripe-ready placeholders.
          </p>
        </div>
      </div>
    </footer>
  );
}
