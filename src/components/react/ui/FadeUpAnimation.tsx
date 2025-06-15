"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/ui/styles";

// 定义组件的属性接口
interface FadeUpAnimationProps {
  className?: string;
  title?: string;
  children?: React.ReactNode;
}

/**
 * 一个通用的文本内容入场动画组件。
 * 元素会以交错（staggered）的方式淡入并向上浮动。
 */
const FadeUpAnimation = ({ className, title = "Show Title", children }: FadeUpAnimationProps) => {
  // 核心动画变体，用于实现交错的淡入上浮效果
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: i * 0.2, // 每个元素的延迟时间
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div
      className={cn("relative z-10 mx-auto w-full max-w-3xl px-4 text-center md:px-6", className)}
    >
      <motion.div custom={0} variants={fadeUpVariants} initial="hidden" animate="visible">
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:mb-8 md:text-8xl">
          <span className="text-content">{title}</span>
        </h1>
        <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

export { FadeUpAnimation };
