import React from "react";
import { cn } from "../../lib/utils";

export const Alert = React.forwardRef(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(
      "relative w-full rounded-2xl border p-4 text-sm",
      variant === "destructive" ? "border-red-900 bg-red-950/50 text-red-200" : "border-zinc-700 bg-zinc-900 text-zinc-200",
      className
    )}
    {...props}
  />
));
Alert.displayName = "Alert";

export const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />
));
AlertTitle.displayName = "AlertTitle";

export const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
));
AlertDescription.displayName = "AlertDescription";
