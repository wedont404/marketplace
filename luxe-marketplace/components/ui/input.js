import { cn } from "@/lib/utils";

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "flex h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/30 focus:bg-white/[0.05]",
        className
      )}
      {...props}
    />
  );
}
