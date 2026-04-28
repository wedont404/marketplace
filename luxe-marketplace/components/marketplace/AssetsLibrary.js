"use client";

import { useMemo, useState } from "react";
import { reusableAssets } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function AssetsLibrary() {
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const value = query.toLowerCase();
    return reusableAssets.filter((asset) =>
      [asset.title, asset.type, asset.category, asset.framework].some((field) =>
        field.toLowerCase().includes(value)
      )
    );
  }, [query]);

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm uppercase tracking-[0.28em] text-white/45">Internal Assets</div>
          <h3 className="mt-2 text-2xl font-semibold">Reusable components and design resources</h3>
        </div>
        <div className="w-full md:w-80">
          <Input placeholder="Search the library..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((asset) => (
          <Card key={asset.id}>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge>{asset.type}</Badge>
                <span className="text-xs text-white/40">{asset.framework}</span>
              </div>
              <div className="text-lg font-medium">{asset.title}</div>
              <p className="text-sm text-white/55">{asset.category}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
