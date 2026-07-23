import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/shared/lib/cn";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-11 w-full rounded-lg border border-border bg-white px-3.5 text-sm text-foreground placeholder:text-zinc-400 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent-soft disabled:bg-zinc-50 disabled:text-zinc-400",
      className,
    )}
    {...props}
  />
));

Input.displayName = "Input";
