"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/utils/ui/styles";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-md border-2 border-black bg-white shadow-[2px_2px_0_0_#000] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-white dark:bg-zinc-900 dark:shadow-[2px_2px_0_0_#fff] dark:hover:shadow-none",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block size-7 rounded-sm bg-blue-500 transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 dark:bg-white"
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
