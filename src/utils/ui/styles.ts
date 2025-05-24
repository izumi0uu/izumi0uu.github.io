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
 * @example
 * ```ts
 * cn("px-4 py-2", condition && "bg-blue-500", { "text-white": isActive })
 * ```
 *
 * @example
 * ```ts
 * // 与 CVA 配合使用（推荐模式）
 * cn(buttonVariants({ variant, size }), className)
 * ```
 */
function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export { cn, cva, type VariantProps };
