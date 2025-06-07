// src/components/react/ui/Link.tsx

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/ui/styles";

export const linkVariants = cva("transition-colors", {
  variants: {
    variant: {
      default: [
        "text-link no-underline",
        "hover:text-link-hover hover:underline",
        "focus:text-link-hover focus:underline",
        "active:text-link-hover active:underline",
      ].join(" "),

      markdown: [
        "truncate text-headings underline",
        "hover:text-link-hover",
        "focus:text-link-hover",
        "active:text-link-hover",
      ].join(" "),

      base: [
        "hover:text-link-hover hover:underline",
        "focus:text-link-hover focus:underline",
        "active:text-link-hover active:underline",
      ].join(" "),

      noUnderline: [
        "hover:text-link-hover",
        "focus:text-link-hover",
        "active:text-link-hover",
        "!no-underline",
      ].join(" "),

      heading: [
        "text-headings",
        "hover:text-link-hover",
        "focus:text-link-hover",
        "active:text-link-hover",
      ].join(" "),

      nav: [
        "text-lg whitespace-nowrap text-headings underline-offset-4",
        "hover:text-link-hover",
        "focus:text-link-hover focus:underline",
        "active:text-link-hover",
      ].join(" "),

      underline:
        "relative inline-flex items-center gap-1 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full",

      disabled: "cursor-not-allowed text-content no-underline hover:text-content",
    },
    size: {
      default: "text-base",
      sm: "text-sm",
      lg: "text-lg",
    },
    underlineOffset: {
      default: "underline-offset-2",
      md: "underline-offset-4",
      lg: "underline-offset-8",
    },
    isDisabled: {
      true: "cursor-not-allowed text-content-secondary no-underline hover:text-content-secondary",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    underlineOffset: "default",
  },
});

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  /**
   * 是否在新标签页打开链接
   * @default false
   */
  external?: boolean;
  /**
   * 自定义target行为
   * 如果设置了external=true，此属性会被忽略
   */
  target?: string;
  /**
   * 自定义rel属性
   * 如果设置了external=true且没有提供rel，会自动添加"noopener noreferrer"
   */
  rel?: string;
  /**
   * 链接是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 子元素
   */
  children?: React.ReactNode;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      className,
      variant = "default",
      size,
      underlineOffset,
      disabled,
      external = false,
      target,
      rel,
      href,
      children,
      ...props
    },
    ref
  ) => {
    // 自动检测外部链接（如果href以http开头且不是当前域名）
    const isExternalUrl =
      href &&
      (href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:"));

    // 最终的target和rel属性
    const finalTarget = external || (isExternalUrl && !target) ? "_blank" : target;
    const finalRel = external || isExternalUrl ? rel || "noopener noreferrer" : rel;

    // 如果disabled，渲染span而不是a
    if (disabled) {
      return (
        <span
          className={cn(
            linkVariants({ variant, size, underlineOffset, isDisabled: true }),
            className
          )}
          {...(props as any)}
          ref={ref as any}
        >
          {children || href}
        </span>
      );
    }

    return (
      <a
        ref={ref}
        className={cn(linkVariants({ variant, size, underlineOffset }), className)}
        href={href}
        target={finalTarget}
        rel={finalRel}
        {...props}
      >
        {children || href}
      </a>
    );
  }
);

Link.displayName = "Link";
