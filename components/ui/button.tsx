import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "icon";
};

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" && "animated-gradient animate-gradient-flow text-white shadow-glow",
        variant === "secondary" && "bg-foreground text-background hover:opacity-90",
        variant === "ghost" && "bg-card/55 hover:bg-muted/80",
        size === "sm" && "h-9 px-3 text-sm",
        size === "md" && "h-11 px-5",
        size === "icon" && "h-10 w-10",
        className
      )}
      {...props}
    />
  );
}
