import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

export interface SplitTextProps {
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
  const root = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    // 1. 创建 GSAP 上下文
    const ctx = gsap.context(() => {
      // --- 所有 GSAP 相关代码放入此函数内 (这部分逻辑不变) ---

      const el = root.current;
      if (!el) return;

      const absoluteLines = splitType === "lines";
      if (absoluteLines) el.style.position = "relative";

      const splitter = new GSAPSplitText(el, {
        type: splitType,
        absolute: absoluteLines,
        linesClass: "split-line",
      });

      let targets: Element[];
      switch (splitType) {
        case "lines":
          targets = splitter.lines;
          break;
        case "words":
          targets = splitter.words;
          break;
        case "words, chars":
          targets = [...splitter.words, ...splitter.chars];
          break;
        default:
          targets = splitter.chars;
      }

      const startPct = (1 - threshold) * 100;
      const m = /^(-?\d+)px$/.exec(rootMargin);
      const raw = m ? parseInt(m[1], 10) : 0;
      const sign = raw < 0 ? `-=${Math.abs(raw)}px` : `+=${raw}px`;
      const start = `top ${startPct}%${sign}`;

      gsap.set(targets, from);

      gsap.to(targets, {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
          once: true,
        },
        onComplete: onLetterAnimationComplete,
      });
    }, root);

    // --- 2. 终极清理方案 ---
    const cleanup = () => {
      // 检查 ctx 是否存在且尚未被清理
      if (ctx && ctx.revert) {
        console.log("Cleaning up GSAP context for text:", text);
        ctx.revert();
      }
    };

    // 监听 Astro 的页面替换前事件，强制执行清理
    document.addEventListener("astro:before-swap", cleanup, { once: true });

    // 3. 返回标准的 React 清理函数作为双保险
    return () => {
      // 移除我们自己添加的监听器，避免在组件因其他原因卸载时重复触发
      document.removeEventListener("astro:before-swap", cleanup);
      // 同时，也在这里执行清理，以应对非 Astro 导航导致的卸载
      cleanup();
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
  ]);

  return (
    <p
      ref={root}
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

export { SplitText };
