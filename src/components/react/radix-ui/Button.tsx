import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/ui/styles";

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
          "rounded-sm border border-outline bg-surface text-content hover:bg-surface-container hover:text-primary",
        secondary:
          "bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container",
        ghost: "text-content hover:bg-surface-container hover:text-primary",
        link: "text-link underline-offset-4 hover:text-link-hover hover:underline",
        success: "bg-success text-on-success hover:bg-success/90",
        warning: "bg-warning text-on-warning hover:bg-warning/90",
        info: "bg-info text-on-info hover:bg-info/90",
        "primary-container":
          "bg-primary-container text-on-primary-container hover:bg-primary-container/80",
        "secondary-container":
          "bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80",
        "success-container":
          "bg-success-container text-on-success-container hover:bg-success-container/80",
        "error-container": "bg-error-container text-on-error-container hover:bg-error-container/80",
        "warning-container":
          "bg-warning-container text-on-warning-container hover:bg-warning-container/80",
        "info-container": "bg-info-container text-on-info-container hover:bg-info-container/80",
        brutal:
          "rounded-sm border-2 border-outline bg-primary px-8 py-4 text-on-primary shadow-[4px_4px_0_0_var(--color-outline)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none",
        "brutal-normal":
          "rounded-sm border-2 border-outline bg-surface px-8 py-4 text-content shadow-[4px_4px_0_0_var(--color-outline)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "success"
    | "warning"
    | "info"
    | "primary-container"
    | "secondary-container"
    | "success-container"
    | "error-container"
    | "warning-container"
    | "info-container"
    | "brutal"
    | "brutal-normal";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  ref?: React.Ref<HTMLButtonElement>;
  children?: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants, type ButtonProps };
