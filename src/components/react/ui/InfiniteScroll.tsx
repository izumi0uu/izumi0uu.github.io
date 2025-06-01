"use client";

import React, { useRef, useEffect, useState } from "react";
import { clsx } from "clsx";

interface InfiniteScrollItem {
  content: React.ReactNode;
}

interface InfiniteScrollProps {
  // ----- Layout / Style Props -----
  width?: string; // Width of the outer wrapper
  maxHeight?: string; // Max-height of the outer wrapper
  negativeMargin?: string; // Negative margin to reduce spacing between items
  // ----- Items Prop -----
  items?: InfiniteScrollItem[]; // Array of items with { content: ... }
  itemMinHeight?: number; // Fixed height for each item
  // ----- Tilt Props -----
  isTilted?: boolean; // Whether the container is in "skewed" perspective
  tiltDirection?: "left" | "right"; // tiltDirection: "left" or "right"
  // ----- Autoplay Props -----
  autoplay?: boolean; // Whether it should automatically scroll
  autoplaySpeed?: number; // Speed (pixels/frame approx.)
  autoplayDirection?: "down" | "up"; // "down" or "up"
  pauseOnHover?: boolean; // Pause autoplay on hover
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  width = "30rem",
  maxHeight = "100%",
  negativeMargin = "-0.5em",
  items = [],
  itemMinHeight = 150,
  isTilted = false,
  tiltDirection = "left",
  autoplay = false,
  autoplaySpeed = 0.5,
  autoplayDirection = "down",
  pauseOnHover = false,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [gsapReady, setGsapReady] = useState(false);

  const getTiltTransform = (): string => {
    if (!isTilted) return "none";
    return tiltDirection === "left"
      ? "rotateX(20deg) rotateZ(-20deg) skewX(20deg)"
      : "rotateX(20deg) rotateZ(20deg) skewX(-20deg)";
  };

  // 动态导入 GSAP，避免 require 问题
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadGSAP = async () => {
      try {
        // 使用动态 import 而不是 require
        const [{ default: gsap }, { Observer }] = await Promise.all([
          import("gsap"),
          import("gsap/Observer"),
        ]);

        // 注册插件
        gsap.registerPlugin(Observer);

        // 将 GSAP 实例存储到 window 对象
        (window as any).gsap = gsap;
        (window as any).Observer = Observer;

        setGsapReady(true);
      } catch (error) {
        console.error("Failed to load GSAP:", error);
      }
    };

    loadGSAP();
  }, []);

  useEffect(() => {
    // 确保 GSAP 已加载且在客户端环境
    if (!gsapReady || typeof window === "undefined") return;

    const gsap = (window as any).gsap;
    const Observer = (window as any).Observer;

    if (!gsap || !Observer) {
      console.warn("GSAP or Observer not available");
      return;
    }

    const container = containerRef.current;
    if (!container) return;
    if (items.length === 0) return;

    // Get all child elements of container as HTMLDivElement[]
    const divItems = gsap.utils.toArray(container.children) as HTMLDivElement[];
    if (!divItems.length) return;

    const firstItem = divItems[0];
    const itemStyle = getComputedStyle(firstItem);
    const itemHeight = firstItem.offsetHeight;
    const itemMarginTop = parseFloat(itemStyle.marginTop) || 0;
    const totalItemHeight = itemHeight + itemMarginTop;
    const totalHeight = itemHeight * items.length + itemMarginTop * (items.length - 1);

    const wrapFn = gsap.utils.wrap(-totalHeight, totalHeight);

    divItems.forEach((child: HTMLDivElement, i: number) => {
      const y = i * totalItemHeight;
      gsap.set(child, { y });
    });

    const observer = Observer.create({
      target: container,
      type: "wheel,touch,pointer",
      preventDefault: true,
      onPress: ({ target }: any) => {
        (target as HTMLElement).style.cursor = "grabbing";
      },
      onRelease: ({ target }: any) => {
        (target as HTMLElement).style.cursor = "grab";
      },
      onChange: ({ deltaY, isDragging, event }: any) => {
        const d = event.type === "wheel" ? -deltaY : deltaY;
        const distance = isDragging ? d * 5 : d * 10;
        divItems.forEach((child) => {
          gsap.to(child, {
            duration: 0.5,
            ease: "expo.out",
            y: `+=${distance}`,
            modifiers: {
              y: gsap.utils.unitize(wrapFn),
            },
          });
        });
      },
    });

    let rafId: number;
    if (autoplay) {
      const directionFactor = autoplayDirection === "down" ? 1 : -1;
      const speedPerFrame = autoplaySpeed * directionFactor;

      const tick = () => {
        divItems.forEach((child: HTMLDivElement) => {
          gsap.set(child, {
            y: `+=${speedPerFrame}`,
            modifiers: {
              y: gsap.utils.unitize(wrapFn),
            },
          });
        });
        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);

      if (pauseOnHover) {
        const stopTicker = () => rafId && cancelAnimationFrame(rafId);
        const startTicker = () => {
          rafId = requestAnimationFrame(tick);
        };

        container.addEventListener("mouseenter", stopTicker);
        container.addEventListener("mouseleave", startTicker);

        return () => {
          observer.kill();
          stopTicker();
          container.removeEventListener("mouseenter", stopTicker);
          container.removeEventListener("mouseleave", startTicker);
        };
      } else {
        return () => {
          observer.kill();
          rafId && cancelAnimationFrame(rafId);
        };
      }
    }

    return () => {
      observer.kill();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [
    gsapReady, // 添加 gsapReady 依赖
    items,
    autoplay,
    autoplaySpeed,
    autoplayDirection,
    pauseOnHover,
    isTilted,
    tiltDirection,
    negativeMargin,
  ]);

  return (
    <>
      {/* 仅保留渐变遮罩的复杂样式，其他都用 Tailwind */}
      <style>
        {`
          .gradient-mask-top {
            background: linear-gradient(to bottom, black, transparent);
          }
          .gradient-mask-bottom {
            background: linear-gradient(to top, black, transparent);
          }
        `}
      </style>

      <div
        ref={wrapperRef}
        className={clsx(
          "relative flex w-full items-center justify-center",
          "overflow-hidden",
          "transform-gpu will-change-transform [backface-visibility:hidden]",
          "[transform-style:preserve-3d]"
        )}
        style={{
          maxHeight,
          overscrollBehavior: "none",
        }}
      >
        {/* 顶部渐变遮罩 */}
        <div className="gradient-mask-top pointer-events-none absolute top-0 z-10 h-1/4 w-full" />

        {/* 底部渐变遮罩 */}
        <div className="gradient-mask-bottom pointer-events-none absolute bottom-0 z-10 h-1/4 w-full" />

        <div
          ref={containerRef}
          className={clsx(
            "flex flex-col px-4",
            "cursor-grab active:cursor-grabbing",
            "origin-center",
            "transform-gpu will-change-transform [backface-visibility:hidden]",
            "[transform-style:preserve-3d]"
          )}
          style={{
            width,
            transform: getTiltTransform(),
            overscrollBehavior: "contain",
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className={clsx(
                "relative flex items-center justify-center",
                "border-outline rounded-2xl border-2",
                "p-4",
                "text-center text-xl font-semibold",
                "select-none",
                "box-border",
                "transform-gpu will-change-transform [backface-visibility:hidden]",
                "[transform-style:preserve-3d]"
              )}
              style={{
                height: `${itemMinHeight}px`,
                marginTop: negativeMargin,
              }}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export { InfiniteScroll };
