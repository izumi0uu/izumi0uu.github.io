import { useEffect, useRef, useState } from "react";

import { ArrowUpToLine } from "lucide-react";
import { SELECTORS } from "@/constants/dom";
import { cn } from "@/utils/ui/styles";
import { Button, type ButtonProps } from "@/components/react/radix-ui/Button";

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

const getHalfViewportHeight = (window: Window) => Math.floor(window.innerHeight / 2);

const ToTopScroll: FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(getHalfViewportHeight(window));

  useEffect(() => {
    // ! track them both independently at same time
    // ! important: must be in this scope, outside of callback()
    let isAtTop = false;
    let isAtBottom = false;

    const callback: IntersectionObserverCallback = (entries) => {
      // entries.length === 1 || 2, count changes when exits viewport
      entries.forEach((entry) => {
        if (entry.target === topRef.current) {
          isAtTop = entry.isIntersecting;
        }

        if (entry.target === bottomRef.current) {
          isAtBottom = entry.isIntersecting;
        }
      });

      if (buttonRef.current) {
        if (isAtTop || isAtBottom) hideButton(buttonRef);
        else showButton(buttonRef);
      }
    };

    const intersect = new IntersectionObserver(callback, { threshold: 0 });

    if (topRef.current) intersect.observe(topRef.current);
    if (bottomRef.current) intersect.observe(bottomRef.current);

    return () => {
      intersect.disconnect();
    };
  }, []);

  // on resize only, vertical...?
  useEffect(() => {
    const handleResize = () => {
      window.requestAnimationFrame(() => setHeight(getHalfViewportHeight(window)));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScrollToTop = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const anchorElement = document.querySelector(SCROLL_TO_TOP_SELECTOR);
    if (!anchorElement) return;

    anchorElement.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  return (
    <>
      <div
        ref={topRef}
        className="pointer-events-none absolute top-0 w-0"
        style={{ height: `${height}px` }}
      />
      {/* mounted in <body /> in Base layout */}
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
