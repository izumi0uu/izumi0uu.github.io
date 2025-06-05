// src/components/react/ui/Link.tsx

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/ui/styles";

const linkVariants = cva("link-default", {
  variants: {
    variant: {
      link: "link",
      "no-underline": "link-no-underline",
      heading: "link-heading",
      nav: "link-nav",
      markdown: "link link-markdown",
      underline:
        "relative inline-flex items-center gap-1 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full",
    },
    disabled: { true: "link-disabled" },
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
   * 子元素
   */
  children?: React.ReactNode;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      className,
      variant = "link",
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
          className={linkVariants({ variant, disabled, className })}
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
        className={linkVariants({ variant, disabled, className })}
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
