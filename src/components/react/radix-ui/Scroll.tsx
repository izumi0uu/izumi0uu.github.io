"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/utils/ui/styles";

interface ScrollAreaProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  scrollbars?: "vertical" | "horizontal" | "both";
}

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, children, scrollbars = "both", ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    {(scrollbars === "vertical" || scrollbars === "both") && (
      <ScrollAreaPrimitive.Scrollbar
        orientation="vertical"
        className="flex h-full w-2.5 touch-none border-l border-l-transparent p-0.5 transition-colors duration-[160ms] ease-out select-none hover:bg-gray-100 dark:hover:bg-gray-800"
        style={{
          backgroundColor: "rgba(0,0,0,0.05)",
        }}
      >
        <ScrollAreaPrimitive.Thumb
          className="relative flex-1 rounded-[10px] transition-colors"
          style={{
            backgroundColor: "var(--color-on-surface-variant)",
            minHeight: "44px",
          }}
        />
      </ScrollAreaPrimitive.Scrollbar>
    )}
    {(scrollbars === "horizontal" || scrollbars === "both") && (
      <ScrollAreaPrimitive.Scrollbar
        orientation="horizontal"
        className="flex h-2.5 touch-none flex-col border-t border-t-transparent p-0.5 transition-colors duration-[160ms] ease-out select-none hover:bg-gray-100 dark:hover:bg-gray-800"
        style={{
          backgroundColor: "rgba(0,0,0,0.05)",
        }}
      >
        <ScrollAreaPrimitive.Thumb
          className="relative flex-1 rounded-[10px] transition-colors"
          style={{
            backgroundColor: "var(--color-on-surface-variant)",
            minWidth: "44px",
          }}
        />
      </ScrollAreaPrimitive.Scrollbar>
    )}
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Scrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.Scrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none transition-colors select-none",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 w-full flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.Thumb
      className="relative flex-1 rounded-full"
      style={{
        backgroundColor: "var(--color-on-surface-variant)",
      }}
    />
  </ScrollAreaPrimitive.Scrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.Scrollbar.displayName;

export { ScrollArea, ScrollBar };
