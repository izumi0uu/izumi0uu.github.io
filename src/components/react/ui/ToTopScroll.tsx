import { useEffect, useState } from "react";
import { ArrowUpToLine } from "lucide-react";
import { cn } from "@/utils/ui/styles";
import { Button } from "@/components/react/radix-ui/Button";

import type { FC, MouseEvent } from "react";

const getShouldShowButton = () => {
  const threshold = Math.floor(window.innerHeight / 2);
  const documentElement = document.documentElement;
  const scrollTop = Math.max(window.scrollY, documentElement.scrollTop, document.body.scrollTop);
  const scrollBottom = documentElement.scrollHeight - (scrollTop + window.innerHeight);

  return scrollTop > threshold && scrollBottom > threshold;
};

const ToTopScroll: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScrollToTop = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    let frameId = 0;

    const syncVisibility = () => {
      frameId = 0;
      setIsVisible((currentValue) => {
        const nextValue = getShouldShowButton();
        return currentValue === nextValue ? currentValue : nextValue;
      });
    };

    const requestSync = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(syncVisibility);
    };

    requestSync();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
    };
  }, []);

  return (
    <Button
      id="to-top"
      data-testid="to-top-scroll"
      data-state={isVisible ? "visible" : "hidden"}
      variant="brutal"
      size="icon"
      onClick={handleScrollToTop}
      className={cn(
        "fixed right-6 bottom-6 z-50 flex items-center justify-center backdrop-blur-sm transition-all duration-300 ease-out",
        isVisible
          ? "pointer-events-auto opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 translate-y-20"
      )}
      aria-hidden={!isVisible}
      aria-label="back to top"
      title="back to top"
      tabIndex={isVisible ? 0 : -1}
    >
      <ArrowUpToLine className="h-5 w-5" />
    </Button>
  );
};

export { ToTopScroll };
