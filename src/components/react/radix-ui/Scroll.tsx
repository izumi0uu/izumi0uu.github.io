"use client";

import * as React from "react";
import { cn } from "@/utils/ui/styles";

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  scrollbars?: "vertical" | "horizontal" | "both";
  height?: string;
  maxHeight?: string;
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    { className, children, scrollbars = "vertical", height = "400px", maxHeight, style, ...props },
    ref
  ) => {
    const scrollStyles = React.useMemo(() => {
      const baseStyles = {
        height,
        maxHeight,
        ...style,
      };

      if (scrollbars === "vertical") {
        return {
          ...baseStyles,
          overflowY: "auto" as const,
          overflowX: "hidden" as const,
        };
      } else if (scrollbars === "horizontal") {
        return {
          ...baseStyles,
          overflowX: "auto" as const,
          overflowY: "hidden" as const,
        };
      } else {
        return {
          ...baseStyles,
          overflow: "auto" as const,
        };
      }
    }, [height, maxHeight, scrollbars, style]);

    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-md transition-colors",
          // 自定义滚动条样式 - 确保可见
          "[&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar]:w-3",
          "[&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-gray-800",
          "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400 hover:[&::-webkit-scrollbar-thumb]:bg-gray-500",
          "dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-500",
          // Firefox 滚动条
          "scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-gray-600",
          className
        )}
        style={{
          ...scrollStyles,
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-outline-variant)",
          // 强制显示滚动条
          scrollbarWidth: "thin",
          scrollbarColor: "var(--color-on-surface-variant) var(--color-surface-variant)",
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ScrollArea.displayName = "ScrollArea";

export { ScrollArea };
