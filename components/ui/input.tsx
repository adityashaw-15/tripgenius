import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("h-11 w-full rounded-lg border bg-card/70 px-3 text-sm outline-none transition focus:ring-2 focus:ring-primary/45", className)} {...props} />;
}

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn("h-11 w-full rounded-lg border bg-card/70 px-3 text-sm outline-none transition focus:ring-2 focus:ring-primary/45", className)} {...props} />;
}
