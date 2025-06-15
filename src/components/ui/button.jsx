// button.jsx (JS version)
import React, { forwardRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

const Button = forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return <Comp ref={ref} className={cn("...", className)} {...props} />
})

Button.displayName = "Button"
export { Button }
