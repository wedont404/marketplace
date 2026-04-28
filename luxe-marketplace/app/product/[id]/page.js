import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, CheckCircle2, Download, PlayCircle, Star } from "lucide-react";
import { getTemplate, getTemplates } from "@/lib/api";
import { PageShell } from "@/components/layout/PageShell";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { currency } from "@/lib/utils";

export async function generateStaticParams() {
  const all = await getTemplates();
  return all.map((item) => ({ id: item.id }));
}

export default async function ProductDetailsPage({ params }) {
  const product = await getTemplate(params.id);
  const related = (await getTemplates()).filter((item) => item.id !== params.id).slice(0, 3);

  if (!product) {
    notFound();
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-5">
            <div className="overflow-hidden rounded-[32px] border border-white/10">
              <img src={product.images[0]} alt={product.name} className="h-[420px] w-full object-cover" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {product.images.slice(1).map((image) => (
                <div key={image} className="overflow-hidden rounded-[28px] border border-white/10">
                  <img src={image} alt={product.name} className="h-64 w-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge>{product.category}</Badge>
                <Badge>{product.framework}</Badge>
                <Badge>{product.darkMode}</Badge>
              </div>
              <h1 className="mt-5 text-5xl font-semibold">{product.name}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/62">{product.description}</p>
            </div>

            <Card>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-white/50">Premium license</div>
                    <div className="mt-2 text-4xl font-semibold">{currency(product.price)}</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <Star className="h-4 w-4 fill-[rgb(244,195,74)] text-[rgb(244,195,74)]" />
                    4.9 average rating
                  </div>
                </div>
                <div className="grid gap-3">
                  {product.details.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm text-white/65">
                      <CheckCircle2 className="h-4 w-4 text-[rgb(244,195,74)]" />
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant="accent" className="flex-1">
                    <Link href="/dashboard" className="gap-2">
                      Buy / Download
                      <Download className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1">
                    <a href={product.demoLink} target="_blank" rel="noreferrer" className="gap-2">
                      Live Demo
                      <PlayCircle className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <div className="text-lg font-semibold">Reviews</div>
                <div className="mt-6 space-y-4">
                  {(product.reviews || []).length ? (
                    product.reviews.map((review) => (
                      <div key={review.id} className="rounded-[20px] border border-white/10 bg-white/[0.02] p-4">
                        <div className="font-medium">{review.userName}</div>
                        <div className="mt-2 text-sm text-white/60">{review.review}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-white/50">Reviews section is ready for Google Sheets integration.</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="text-sm uppercase tracking-[0.28em] text-white/45">Related products</div>
            <h2 className="mt-2 text-3xl font-semibold">More premium templates</h2>
          </div>
          <Button asChild variant="ghost">
            <Link href="/shop" className="gap-2">
              View all
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
