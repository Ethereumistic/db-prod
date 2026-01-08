import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { CornerBorders } from "@/components/ui/corner-borders"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <div className="relative group/field w-full">
      <CornerBorders groupName="field" />
      <InputPrimitive
        type={type}
        data-slot="input"
        className={cn(
          "dark:bg-input/30 border-input aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 h-10 rounded-none border bg-transparent px-3 py-1 text-sm transition-all file:h-6 file:text-xs file:font-medium md:text-sm file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
}

export { Input }
