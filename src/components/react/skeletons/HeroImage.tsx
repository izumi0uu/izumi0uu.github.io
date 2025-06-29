"use client";

import { useState, useCallback } from "react";
import { Skeleton } from "../radix-ui/Skeleton";
import { cn } from "@/utils/ui/styles";

interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  transitionName?: string;
  aspectRatio?: "video" | "square" | "wide";
}

export function HeroImage({
  src,
  alt,
  className,
  width = 1024,
  height = 576,
  priority = true,
  transitionName,
  aspectRatio = "video",
}: HeroImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "video":
        return "aspect-video";
      case "square":
        return "aspect-square";
      case "wide":
        return "aspect-[21/9]";
      default:
        return "aspect-video";
    }
  };

  const baseImageClasses = cn(
    "h-auto w-full rounded-xl border border-outline-variant object-cover shadow-xl",
    getAspectRatioClass(),
    "transition-opacity duration-300",
    className
  );

  const skeletonClasses = cn(
    "w-full rounded-xl border border-outline-variant shadow-xl",
    getAspectRatioClass()
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
            "bg-muted text-muted-foreground flex items-center justify-center"
          )}
        >
          <div className="text-center">
            <div className="mb-4 text-4xl">🖼️</div>
            <div className="text-lg font-medium">Loading failed</div>
            <div className="mt-2 text-sm opacity-70">Please check if the image link is correct</div>
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
          fetchPriority={priority ? "high" : "auto"}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
}
