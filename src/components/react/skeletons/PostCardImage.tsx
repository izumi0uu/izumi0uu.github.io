"use client";

import { useState, useCallback } from "react";
import { Skeleton } from "../radix-ui/Skeleton";
import { cn } from "@/utils/ui/styles";

interface PostCardImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  transitionName?: string;
}

export function PostCardImage({
  src,
  alt,
  className,
  width = 298,
  height = 168,
  priority = false,
  transitionName,
}: PostCardImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  const baseImageClasses = cn(
    "rounded-box shadow-base-300 w-full object-cover shadow",
    "h-[168px] max-h-[168px] xs:h-[250px] md:h-[168px] md:max-w-[298px]",
    "transition-opacity duration-300",
    className
  );

  const skeletonClasses = cn(
    "rounded-box shadow-base-300 w-full shadow",
    "h-[168px] max-h-[168px] xs:h-[250px] md:h-[168px] md:max-w-[298px]"
  );

  return (
    <div className="relative overflow-hidden" style={{ viewTransitionName: transitionName }}>
      {/* Skeleton 加载状态 */}
      {isLoading && !hasError && <Skeleton className={skeletonClasses} />}

      {/* 错误状态 */}
      {hasError ? (
        <div
          className={cn(
            baseImageClasses,
            "bg-muted text-muted-foreground flex items-center justify-center text-sm"
          )}
        >
          <div className="text-center">
            <div className="mb-2 text-2xl">🖼️</div>
            <div>Loading failed</div>
          </div>
        </div>
      ) : (
        /* 实际图片 */
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            baseImageClasses,
            isLoading ? "absolute top-0 left-0 opacity-0" : "opacity-100"
          )}
          loading={priority ? "eager" : "lazy"}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
}
