import Link from "next/link";
import { ArrowRight, Award, Layers3, ShieldCheck, Sparkles, Stars, WandSparkles } from "lucide-react";
import { getTemplates } from "@/lib/api";
import { testimonials } from "@/lib/data";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal } from "@/components/animated/Reveal";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { currency } from "@/lib/utils";

const categories = [
  "Landing Page Templates",
  "Dashboard UI Systems",
  "Full Frontend Website Kits",
  "Animated Premium UI Packs",
  "Reusable Components"
];

export default async function HomePage() {
  const templates = await getTemplates();
  const featured = templates.filter((item) => item.featured).slice(0, 3);

  return (
    <PageShell>
      <section className="relative overflow-hidden">
        <div className="hero-orb absolute left-12 top-12 h-60 w-60 rounded-full bg-[rgba(92,151,255,0.35)]" />
        <div className="hero-orb absolute right-12 top-28 h-72 w-72 rounded-full bg-[rgba(244,195,74,0.2)]" />
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.2fr,0.8fr] lg:py-28">
          <Reveal className="space-y-8">
            <Badge>Luxury Frontend Marketplace</Badge>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] md:text-7xl">
                Premium Frontend Templates <span className="text-gradient">Ready to Launch</span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-white/62">
                A curated marketplace for high-end landing pages, dashboards, UI kits, and frontend systems designed to feel sharp, expensive, and launch-ready.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild variant="accent" size="lg">
                <Link href="/shop" className="gap-2">
                  Explore Templates
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/shop">View Live Demos</Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Premium kits", value: "120+" },
                { label: "Avg. rating", value: "4.9/5" },
                { label: "Contributor teams", value: "18" }
              ].map((item) => (
                <div key={item.label} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-3xl font-semibold">{item.value}</div>
                  <div className="mt-2 text-sm text-white/55">{item.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <Card className="surface-grid relative overflow-hidden p-3">
              <CardContent className="grid gap-4 p-3">
                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-white/45">Featured Bundle</div>
                      <div className="mt-2 text-2xl font-semibold">Launch Suite</div>
                    </div>
                    <Stars className="h-8 w-8 text-[rgb(244,195,74)]" />
                  </div>
                  <div className="mt-8 flex items-end justify-between">
                    <div>
                      <div className="text-sm text-white/45">Starting from</div>
                      <div className="mt-2 text-4xl font-semibold">{currency(199)}</div>
                    </div>
                    <Badge>Template Bundle</Badge>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { label: "Motion-first design", icon: WandSparkles },
                    { label: "Google Sheets backend", icon: ShieldCheck },
                    { label: "Frontend-only products", icon: Layers3 },
                    { label: "Luxury-grade presentation", icon: Award }
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                        <Icon className="h-5 w-5 text-[rgb(130,171,255)]" />
                        <div className="mt-4 text-base font-medium">{item.label}</div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Featured Templates"
            title="Curated products with launch-level polish"
            description="Designed to bridge the gap between inspiration galleries and commercially viable frontend systems."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featured.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.1}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Categories"
            title="Built for modern template buyers"
            description="A catalog shaped around the kinds of frontend products designers, founders, and developers actually need."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {categories.map((category, index) => (
            <Reveal key={category} delay={index * 0.06}>
              <Card>
                <CardContent className="min-h-36 space-y-6">
                  <Sparkles className="h-5 w-5 text-[rgb(244,195,74)]" />
                  <div className="text-lg font-medium leading-8">{category}</div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Why choose us",
              body: "We combine premium art direction, smooth motion, and practical frontend structure so every product feels both beautiful and sellable."
            },
            {
              title: "Pricing and bundles",
              body: "Sell single templates, bundle collections, and future Stripe checkout flows with clear upgrade paths."
            },
            {
              title: "Team-ready workflows",
              body: "Contributors upload assets, admins manage catalog quality, and Google Sheets keeps operations lightweight."
            }
          ].map((item) => (
            <Card key={item.title}>
              <CardContent>
                <div className="text-xl font-semibold">{item.title}</div>
                <p className="mt-4 text-sm leading-7 text-white/60">{item.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="Trusted by teams shipping polished launches"
            align="center"
          />
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.08}>
              <Card>
                <CardContent>
                  <p className="text-lg leading-8 text-white/75">“{item.quote}”</p>
                  <div className="mt-8">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-white/45">{item.role}</div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 pt-16">
        <Card className="overflow-hidden">
          <CardContent className="flex flex-col items-start justify-between gap-8 p-8 md:flex-row md:items-center md:p-10">
            <div>
              <Badge>Future Payments</Badge>
              <h3 className="mt-4 text-3xl font-semibold">Stripe-ready pricing architecture</h3>
              <p className="mt-3 max-w-2xl text-white/60">
                The storefront already includes product pricing, order placeholders, and purchase flows so you can wire in Stripe later without redesigning the experience.
              </p>
            </div>
            <Button asChild variant="accent" size="lg">
              <Link href="/contact">Start Selling</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
