import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";
import type { ClassValue } from "clsx";

/**
 * 组合 clsx 和 tailwind-merge 的工具函数
 * 用于条件性地组合类名并解决 Tailwind CSS 类名冲突
 *
 * @param inputs - 类名输入（字符串、对象、数组等）
 * @returns 处理后的类名字符串
 *
 * e.g.
 * ```ts
 * cn("px-4 py-2", condition && "bg-blue-500", { "text-white": isActive })
 * ```
 */
const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/**
 * 创建带有变体支持的组件样式函数
 * 基于 class-variance-authority (CVA) 和 tailwind-merge 的增强版本
 *
 * @param config - CVA 配置对象
 * @returns CVA 函数，自动处理类名冲突
 *
 * e.g.
 * ```ts
 * const button = createVariants({
 *   base: "px-4 py-2 rounded-md font-medium focus:outline-none",
 *   variants: {
 *     intent: {
 *       primary: "bg-blue-500 text-white hover:bg-blue-600",
 *       secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
 *     },
 *   },
 *   defaultVariants: {
 *     intent: "primary",
 *   },
 * });
 *
 * const buttonProps: VariantProps<typeof button> = {
 *   intent: "secondary",
 * };
 *
 * const button = button(buttonProps);
 */
const createVariants = (config: Parameters<typeof cva>[0]) => {
  const variants = cva(config);
  return (...args: Parameters<typeof variants>) => cn(variants(...args));
};

export { cn, createVariants, cva, type VariantProps };
