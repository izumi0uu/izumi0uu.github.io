import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/ui/styles";

const buttonVariants = cva("button", {
  variants: {
    variant: {
      default: "button-default",
      destructive: "button-destructive",
      outline: "button-outline",
      secondary: "button-secondary",
      ghost: "button-ghost",
      link: "button-link",
      success: "button-success",
      warning: "button-warning",
      info: "button-info",
      "primary-container": "button-primary-container",
      "secondary-container": "button-secondary-container",
      "success-container": "button-success-container",
      "error-container": "button-error-container",
      "warning-container": "button-warning-container",
      "info-container": "button-info-container",
      brutal: "button-brutal",
      "brutal-normal": "button-brutal-normal",
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
});

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
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseUp?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseMove?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseOver?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseOut?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseDoubleClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onClick, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        onClick={onClick}
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants, type ButtonProps };
