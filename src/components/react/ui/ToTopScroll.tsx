import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowUpToLine } from "lucide-react";
import { SELECTORS } from "@/constants/dom";
import { cn } from "@/utils/ui/styles";
import { Button } from "@/components/react/radix-ui/Button";

import type { FC, MouseEvent, RefObject } from "react";

const { SCROLL_TO_TOP_SELECTOR } = SELECTORS;

const fixedClasses = ["opacity-1", "translate-y-0"];
const hiddenClasses = ["opacity-0", "translate-y-20"];

const showButton = (buttonRef: RefObject<HTMLButtonElement | null>): void => {
  buttonRef.current?.classList.add(...fixedClasses);
  buttonRef.current?.classList.remove(...hiddenClasses);
};

const hideButton = (buttonRef: RefObject<HTMLButtonElement | null>): void => {
  buttonRef.current?.classList.remove(...fixedClasses);
  buttonRef.current?.classList.add(...hiddenClasses);
};

const getHalfViewportHeight = () => Math.floor(window.innerHeight / 2);

const ToTopScroll: FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [height, setHeight] = useState(getHalfViewportHeight());

  // 使用useCallback缓存回调函数，避免不必要的重新创建
  const handleScrollToTop = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const anchorElement = document.querySelector(SCROLL_TO_TOP_SELECTOR);
    if (!anchorElement) return;

    anchorElement.scrollIntoView({ block: "start", behavior: "smooth" });
  }, []);

  // 使用useCallback缓存resize处理函数
  const handleResize = useCallback(() => {
    window.requestAnimationFrame(() => setHeight(getHalfViewportHeight()));
  }, []);

  useEffect(() => {
    // 在组件内部创建状态变量，确保每次effect运行时重置状态
    let isAtTop = false;
    let isAtBottom = false;

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.target === topRef.current) {
          isAtTop = entry.isIntersecting;
        }

        if (entry.target === bottomRef.current) {
          isAtBottom = entry.isIntersecting;
        }
      });

      // 使用最新的引用
      if (buttonRef.current) {
        if (isAtTop || isAtBottom) hideButton(buttonRef);
        else showButton(buttonRef);
      }
    };

    // 保存observer实例到ref中，便于清理
    observerRef.current = new IntersectionObserver(callback, { threshold: 0 });

    if (topRef.current) observerRef.current.observe(topRef.current);
    if (bottomRef.current) observerRef.current.observe(bottomRef.current);

    // 添加resize事件监听器
    window.addEventListener("resize", handleResize);

    // 清理函数
    return () => {
      // 明确断开observer连接
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      // 移除事件监听器
      window.removeEventListener("resize", handleResize);

      // 清除DOM引用
      if (buttonRef.current) {
        hideButton(buttonRef);
      }
    };
  }, [handleResize]); // 只依赖于handleResize

  return (
    <>
      <div
        ref={topRef}
        className="pointer-events-none absolute top-0 w-0"
        style={{ height: `${height}px` }}
      />
      <div
        ref={bottomRef}
        className="pointer-events-none absolute bottom-0 w-0"
        style={{ height: `${height}px` }}
      />

      <Button
        ref={buttonRef}
        id="to-top"
        variant="brutal"
        size="icon"
        onClick={handleScrollToTop}
        className={cn(
          "fixed right-6 bottom-6 z-50",
          hiddenClasses,
          "transition-all duration-300 ease-out",
          "backdrop-blur-sm",
          "flex items-center justify-center"
        )}
        aria-label="back to top"
        title="back to top"
      >
        <ArrowUpToLine className="h-5 w-5" />
      </Button>
    </>
  );
};

export { ToTopScroll };
