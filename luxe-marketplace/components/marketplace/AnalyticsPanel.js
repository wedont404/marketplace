import { BarChart3, FolderArchive, Sparkles, Users2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { label: "Templates live", value: "24", icon: FolderArchive },
  { label: "Active contributors", value: "08", icon: Users2 },
  { label: "Monthly conversion", value: "14.8%", icon: BarChart3 },
  { label: "Featured launches", value: "06", icon: Sparkles }
];

export function AnalyticsPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.label}>
            <CardContent className="flex items-start justify-between">
              <div>
                <div className="text-sm text-white/50">{item.label}</div>
                <div className="mt-4 text-3xl font-semibold">{item.value}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-[rgb(244,195,74)]">
                <Icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
