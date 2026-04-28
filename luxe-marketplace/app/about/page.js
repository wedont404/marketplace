import { PageShell } from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          eyebrow="About"
          title="A premium storefront for frontend craftsmanship"
          description="Luxe Marketplace is positioned for creators who want their frontend-only products to feel as refined as the best inspiration galleries, while still being structured for real commerce."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            "We design for perceived quality first, pairing luxury visual direction with practical code structure.",
            "The contributor portal is built for internal teams managing template pipelines, ZIP assets, and reusable design systems.",
            "Google Sheets and Apps Script keep the backend accessible today while leaving room for future upgrades."
          ].map((text) => (
            <Card key={text}>
              <CardContent>
                <p className="text-base leading-8 text-white/65">{text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
