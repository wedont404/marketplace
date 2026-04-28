import { cn } from "@/lib/utils";

export function Badge({ className, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/70",
        className
      )}
      {...props}
    />
  );
}
