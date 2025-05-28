import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils/ui/styles"

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container",
        destructive:
          "bg-error text-on-error hover:bg-error-container hover:text-on-error-container",
        outline:
          "border-outline bg-surface text-content hover:bg-surface-container hover:text-primary border",
        secondary:
          "bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container",
        ghost: "text-content hover:bg-surface-container hover:text-primary",
        link: "text-primary hover:text-link-hover underline-offset-4 hover:underline",
        brutal:
          "border-outline bg-primary text-on-primary rounded-sm border-2 px-8 py-4 shadow-[4px_4px_0_0_var(--color-outline)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none",
        "brutal-normal":
          "border-outline bg-surface text-content rounded-sm border-2 px-8 py-4 shadow-[4px_4px_0_0_var(--color-outline)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
