"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Select({ children, ...props }) {
  return <SelectPrimitive.Root {...props}>{children}</SelectPrimitive.Root>;
}

export function SelectTrigger({ className, children, ...props }) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "flex h-11 w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white/80",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon>
        <ChevronDown className="h-4 w-4 text-white/60" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({ children }) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content className="z-50 min-w-[160px] overflow-hidden rounded-2xl border border-white/10 bg-[#0c1320] p-1 shadow-2xl">
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({ className, children, ...props }) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-xl py-2 pl-8 pr-3 text-sm text-white/80 outline-none transition hover:bg-white/5 focus:bg-white/5",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export const SelectValue = SelectPrimitive.Value;
