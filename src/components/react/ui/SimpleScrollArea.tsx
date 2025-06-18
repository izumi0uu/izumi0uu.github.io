import * as React from "react";
import { cn } from "@/utils/ui/styles";

interface SimpleScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: string;
  maxHeight?: string;
  scrollbars?: "vertical" | "horizontal" | "both";
}

const SimpleScrollArea = React.forwardRef<HTMLDivElement, SimpleScrollAreaProps>(
  (
    { className, children, height = "400px", maxHeight, scrollbars = "vertical", style, ...props },
    ref
  ) => {
    const scrollbarStyles = React.useMemo(() => {
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
          "relative rounded-md border transition-colors",
          // 自定义滚动条样式
          "[&::-webkit-scrollbar]:w-3",
          "[&::-webkit-scrollbar-track]:rounded-full",
          "[&::-webkit-scrollbar-thumb]:rounded-full",
          "[&::-webkit-scrollbar-thumb]:bg-gray-300",
          "[&::-webkit-scrollbar-thumb:hover]:bg-gray-400",
          "dark:[&::-webkit-scrollbar-thumb]:bg-gray-600",
          "dark:[&::-webkit-scrollbar-thumb:hover]:bg-gray-500",
          className
        )}
        style={{
          ...scrollbarStyles,
          borderColor: "var(--color-outline-variant)",
          backgroundColor: "var(--color-surface)",
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SimpleScrollArea.displayName = "SimpleScrollArea";

export { SimpleScrollArea };
