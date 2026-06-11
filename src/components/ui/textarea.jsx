import React from "react";
import { cn } from "../../lib/utils";

export const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn("flex min-h-28 w-full rounded-2xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";
