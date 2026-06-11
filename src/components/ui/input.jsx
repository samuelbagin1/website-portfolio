import React from "react";
import { cn } from "../../lib/utils";

export const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn("flex h-10 w-full rounded-2xl border border-border bg-input px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium", className)}
    {...props}
  />
));
Input.displayName = "Input";
