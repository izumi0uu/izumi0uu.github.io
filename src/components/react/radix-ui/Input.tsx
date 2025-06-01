import * as React from "react";

import { cn } from "@/utils/ui/styles";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "placeholder:text-muted-foreground flex h-14 w-full border-2 border-black p-4 shadow-[2px_2px_0_0_#000] transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-white dark:bg-zinc-800 dark:shadow-[2px_2px_0_0_#fff] dark:hover:shadow-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
