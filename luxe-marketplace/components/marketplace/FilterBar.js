"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function FilterBar({ filters, onFilterChange }) {
  return (
    <div className="grid gap-4 rounded-[28px] border border-white/10 bg-white/[0.03] p-5 md:grid-cols-2 xl:grid-cols-6">
      <div className="relative xl:col-span-2">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
        <Input
          value={filters.search}
          onChange={(event) => onFilterChange("search", event.target.value)}
          placeholder="Search premium templates..."
          className="pl-10"
        />
      </div>

      {[
        ["category", ["All", "Landing Page", "Dashboard", "Full Website", "UI Pack"]],
        ["framework", ["All", "Next.js", "React", "Tailwind CSS"]],
        ["price", ["All", "0-50", "51-100", "101+"]],
        ["darkMode", ["All", "Dark", "Light"]],
        ["animationLevel", ["All", "Low", "Medium", "High"]]
      ].map(([key, values]) => (
        <Select key={key} value={filters[key]} onValueChange={(value) => onFilterChange(key, value)}>
          <SelectTrigger>
            <SelectValue placeholder={key} />
          </SelectTrigger>
          <SelectContent>
            {values.map((value) => (
              <SelectItem value={value} key={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </div>
  );
}
