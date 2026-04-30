"use client";

import { useMemo, useState } from "react";
import { templates } from "@/lib/data";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { FilterBar } from "@/components/marketplace/FilterBar";
import { ProductCard } from "@/components/marketplace/ProductCard";

const initialFilters = {
  search: "",
  category: "All",
  framework: "All",
  price: "All",
  darkMode: "All",
  animationLevel: "All"
};

export default function ShopPage() {
  const [filters, setFilters] = useState(initialFilters);

  const filtered = useMemo(() => {
    return templates.filter((product) => {
      const matchSearch =
        [product.name, product.description, product.tags.join(" ")].join(" ").toLowerCase().includes(filters.search.toLowerCase());
      const matchCategory = filters.category === "All" || product.category === filters.category;
      const matchFramework = filters.framework === "All" || product.framework === filters.framework;
      const matchDark = filters.darkMode === "All" || product.darkMode === filters.darkMode;
      const matchAnimation = filters.animationLevel === "All" || product.animationLevel === filters.animationLevel;
      const matchPrice =
        filters.price === "All" ||
        (filters.price === "0-50" && product.price <= 50) ||
        (filters.price === "51-100" && product.price >= 51 && product.price <= 100) ||
        (filters.price === "101+" && product.price >= 101);

      return matchSearch && matchCategory && matchFramework && matchDark && matchAnimation && matchPrice;
    });
  }, [filters]);

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Marketplace"
          title="Frontend products presented like premium software"
          description="Browse templates fetched from your Google Apps Script backend or fall back to curated local data during setup."
        />

        <div className="mt-10">
          <FilterBar
            filters={filters}
            onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))}
          />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
