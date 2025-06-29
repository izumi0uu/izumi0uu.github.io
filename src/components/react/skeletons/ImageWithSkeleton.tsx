"use client";

import { useState, useCallback } from "react";
import { Skeleton } from "../radix-ui/Skeleton";
import { cn } from "@/utils/ui/styles";

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  skeletonClassName?: string;
  aspectRatio?: "video" | "square" | "auto";
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  priority?: boolean;
  quality?: number;
  placeholder?: "blur" | "empty";
  onLoad?: () => void;
  onError?: () => void;
}

export function ImageWithSkeleton({
  src,
  alt,
  width,
  height,
  className,
  skeletonClassName,
  aspectRatio = "auto",
  objectFit = "cover",
  priority = false,
  quality = 75,
  placeholder = "empty",
  onLoad,
  onError,
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  }, [onError]);

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "video":
        return "aspect-video";
      case "square":
        return "aspect-square";
      default:
        return "";
    }
  };

  const skeletonClasses = cn(
    "w-full",
    getAspectRatioClass(),
    height && !getAspectRatioClass() && `h-[${height}px]`,
    "rounded-md",
    skeletonClassName
  );

  const imageClasses = cn(
    "h-full w-full transition-opacity duration-300",
    `object-${objectFit}`,
    getAspectRatioClass(),
    isLoading && "opacity-0",
    !isLoading && "opacity-100",
    className
  );

  return (
    <div className="relative overflow-hidden">
      {/* Skeleton 骨架屏 */}
      {isLoading && <Skeleton className={skeletonClasses} />}

      {/* 错误状态 */}
      {hasError ? (
        <div
          className={cn(
            "bg-muted text-muted-foreground flex w-full items-center justify-center text-sm",
            getAspectRatioClass(),
            height && !getAspectRatioClass() && `h-[${height}px]`,
            className
          )}
        >
          <div className="text-center">
            <div className="mb-2">📷</div>
            <div>图片加载失败</div>
          </div>
        </div>
      ) : (
        /* 实际图片 */
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={imageClasses}
          loading={priority ? "eager" : "lazy"}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            ...(isLoading && { position: "absolute", top: 0, left: 0 }),
          }}
        />
      )}
    </div>
  );
}

// 针对Astro项目的特殊版本，支持Astro Image组件的属性
interface AstroImageWithSkeletonProps extends ImageWithSkeletonProps {
  fetchpriority?: "high" | "low" | "auto";
  itemprop?: string;
  "transition:name"?: string;
}

export function AstroImageWithSkeleton(props: AstroImageWithSkeletonProps) {
  const { fetchpriority, itemprop, "transition:name": transitionName, ...imageProps } = props;

  return <ImageWithSkeleton {...imageProps} priority={fetchpriority === "high"} />;
}
