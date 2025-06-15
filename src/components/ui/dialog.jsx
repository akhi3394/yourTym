import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils" // Replace with a plain merge if you don’t have this

export function Dialog({ children, ...props }) {
  return (
    <DialogPrimitive.Root {...props}>
      {children}
    </DialogPrimitive.Root>
  )
}

export function DialogTrigger({ children, ...props }) {
  return (
    <DialogPrimitive.Trigger {...props}>
      {children}
    </DialogPrimitive.Trigger>
  )
}

export function DialogContent({ className, children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white dark:bg-gray-900 p-6 shadow-lg outline-none",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}
