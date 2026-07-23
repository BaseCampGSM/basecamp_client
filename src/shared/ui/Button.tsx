import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/shared/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "md" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-hover disabled:bg-zinc-300",
  secondary:
    "bg-white text-foreground border border-border hover:bg-zinc-50 disabled:text-zinc-400",
  ghost:
    "bg-transparent text-foreground hover:bg-zinc-100 disabled:text-zinc-400",
  danger: "bg-white text-danger border border-red-200 hover:bg-red-50",
};

const sizeClasses: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  sm: "h-9 px-3.5 text-sm",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";
