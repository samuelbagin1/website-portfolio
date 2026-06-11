import React from "react";
import { cn } from "../../lib/utils";

export function Badge({ className, ...props }) {
  return <div className={cn("inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-0.5 text-xs font-semibold text-zinc-300", className)} {...props} />;
}
