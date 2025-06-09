import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    const el = ref.current;
    if (!el) return;

    const absoluteLines = splitType === "lines";
    if (absoluteLines) el.style.position = "relative";

    let splitter: GSAPSplitText | null = new GSAPSplitText(el, {
      type: splitType,
      absolute: absoluteLines,
      linesClass: "split-line",
    });

    let targets: Element[] = [];
    switch (splitType) {
      case "lines":
        targets = [...splitter.lines];
        break;
      case "words":
        targets = [...splitter.words];
        break;
      case "words, chars":
        targets = [...splitter.words, ...splitter.chars];
        break;
      default:
        targets = [...splitter.chars];
    }

    targets.forEach((t) => {
      (t as HTMLElement).style.willChange = "transform, opacity";
    });

    const startPct = (1 - threshold) * 100; // e.g. 0.1 -> 90%
    const m = /^(-?\d+)px$/.exec(rootMargin);
    const raw = m ? parseInt(m[1], 10) : 0;
    const sign = raw < 0 ? `-=${Math.abs(raw)}px` : `+=${raw}px`;
    const start = `top ${startPct}%${sign}`;

    // Create ScrollTrigger instance
    const scrollTrigger = ScrollTrigger.create({
      trigger: el,
      start,
      toggleActions: "play none none none",
      once: true,
    });

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger,
      smoothChildTiming: true,
      onComplete: () => {
        if (onLetterAnimationComplete) onLetterAnimationComplete();
      },
    });

    tl.set(targets, { ...from, immediateRender: false, force3D: true });
    tl.to(targets, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      force3D: true,
    });

    return () => {
      // 清理所有资源
      setIsActive(false);

      // 清理动画
      if (tl) {
        tl.kill();
        tl.clear();
      }

      // 清理滚动触发器
      if (scrollTrigger) {
        scrollTrigger.kill();
      }

      // 清理GSAP动画
      if (targets.length) {
        gsap.killTweensOf(targets);
        targets = [];
      }

      // 还原分割
      if (splitter) {
        splitter.revert();
        splitter = null;
      }

      // 清理DOM引用
      if (el) {
        // 移除任何可能的内联样式
        el.style.position = "";
        el.style.willChange = "";
      }
    };
  }, [
    text,
    delay,
    duration,
    ease,
    splitType,
    from,
    to,
    threshold,
    rootMargin,
    onLetterAnimationComplete,
    isActive,
  ]);

  // 组件卸载时确保清理
  useEffect(() => {
    return () => {
      setIsActive(false);
    };
  }, []);

  return (
    <p
      ref={ref}
      className={`split-parent inline-block overflow-hidden whitespace-normal ${className}`}
      style={{
        textAlign,
        wordWrap: "break-word",
      }}
    >
      {text}
    </p>
  );
};

export { SplitText, type SplitTextProps };
