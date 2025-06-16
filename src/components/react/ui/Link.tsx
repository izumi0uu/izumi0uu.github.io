// src/components/react/ui/Link.tsx

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/ui/styles";

export const linkVariants = cva(
  "inline-flex cursor-pointer items-center rounded-md text-sm font-medium whitespace-nowrap transition-colors disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container",
        destructive:
          "bg-error text-on-error hover:bg-error-container hover:text-on-error-container",
        outline:
          "rounded-sm border border-outline bg-surface text-content hover:bg-surface-container hover:text-primary",
        secondary:
          "bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container",
        ghost: "text-content hover:bg-surface-container hover:text-primary",
        link: "text-link underline-offset-4 hover:text-link-hover hover:underline",
        success: "bg-success text-on-success hover:bg-success/90",
        warning: "bg-warning text-on-warning hover:bg-warning/90",
        info: "bg-info text-on-info hover:bg-info/90",
        "primary-container":
          "bg-primary-container text-on-primary-container hover:bg-primary-container/80",
        "secondary-container":
          "bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80",
        "success-container":
          "bg-success-container text-on-success-container hover:bg-success-container/80",
        "error-container": "bg-error-container text-on-error-container hover:bg-error-container/80",
        "warning-container":
          "bg-warning-container text-on-warning-container hover:bg-warning-container/80",
        "info-container": "bg-info-container text-on-info-container hover:bg-info-container/80",
        brutal:
          "rounded-sm border-2 border-outline bg-primary px-8 py-4 text-on-primary shadow-[4px_4px_0_0_var(--color-outline)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none",
        "brutal-normal":
          "rounded-sm border-2 border-outline bg-surface px-8 py-4 text-content shadow-[4px_4px_0_0_var(--color-outline)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none",
        underline:
          "relative inline-flex items-center gap-1 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full",

        // 保留一些原有的变体以兼容现有代码
        markdown: "text-headings underline hover:text-link-hover",
        base: "hover:text-link-hover hover:underline",
        noUnderline: "!no-underline hover:text-link-hover",
        heading: "text-headings hover:text-link-hover",
        nav: "text-lg whitespace-nowrap text-headings underline-offset-4 hover:text-link-hover",
        disabled: "cursor-not-allowed text-content no-underline hover:text-content",
      },
      size: {
        default: "",
        sm: "h-8 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
        md: "h-10 px-4 py-2",
      },
      underlineOffset: {
        default: "underline-offset-2",
        md: "underline-offset-4",
        lg: "underline-offset-8",
      },
      isDisabled: {
        true: "cursor-not-allowed opacity-50",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      underlineOffset: "default",
    },
  }
);

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
  /**
   * 链接变体样式
   */
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "success"
    | "warning"
    | "info"
    | "primary-container"
    | "secondary-container"
    | "success-container"
    | "error-container"
    | "warning-container"
    | "info-container"
    | "brutal"
    | "brutal-normal"
    | "underline"
    | "markdown"
    | "base"
    | "noUnderline"
    | "heading"
    | "nav"
    | "disabled";
}

// 使用React.memo包装组件以减少不必要的重渲染
export const Link = React.memo(
  React.forwardRef<HTMLAnchorElement, LinkProps>(
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
            ref={ref as React.Ref<HTMLSpanElement>}
            className={cn(
              linkVariants({ variant, size, underlineOffset, isDisabled: true }),
              className
            )}
            {...(props as any)}
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
  )
);

Link.displayName = "Link";
