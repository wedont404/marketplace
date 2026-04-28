import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PageShell>
      <section className="mx-auto flex max-w-4xl flex-col items-center px-6 py-28 text-center">
        <div className="text-sm uppercase tracking-[0.3em] text-white/45">404</div>
        <h1 className="mt-4 text-5xl font-semibold">This template page was not found</h1>
        <p className="mt-4 max-w-xl text-white/60">
          The requested product or route does not exist yet. Head back to the marketplace and keep exploring.
        </p>
        <Button asChild variant="accent" className="mt-8">
          <Link href="/shop">Return to marketplace</Link>
        </Button>
      </section>
    </PageShell>
  );
}
