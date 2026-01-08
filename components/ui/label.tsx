"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "gap-2 text-[10px] uppercase tracking-widest font-bold text-white/40 leading-none group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed transition-colors group-focus-within/field:text-white/80",
        className
      )}
      {...props}
    />
  )
}

export { Label }
