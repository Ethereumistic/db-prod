import * as React from "react"
import { CornerBorders } from "@/components/ui/corner-borders"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <div className="relative group/field w-full">
      <CornerBorders groupName="field" />
      <textarea
        data-slot="textarea"
        className={cn(
          "border-input dark:bg-input/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 rounded-none border bg-transparent px-3 py-2 text-sm transition-all md:text-sm placeholder:text-muted-foreground flex field-sizing-content min-h-24 w-full outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
}

export { Textarea }
