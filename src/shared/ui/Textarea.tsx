import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/shared/lib/cn";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full resize-none rounded-lg border border-border bg-white px-3.5 py-3 text-sm text-foreground placeholder:text-zinc-400 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent-soft disabled:bg-zinc-50 disabled:text-zinc-400",
      className,
    )}
    {...props}
  />
));

Textarea.displayName = "Textarea";
