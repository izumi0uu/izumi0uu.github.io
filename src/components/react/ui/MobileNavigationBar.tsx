"use client";
import React, { forwardRef } from "react";
import { cn } from "@/utils/ui/styles";

interface MobileNavIconProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  isActive: boolean;
  variant?: "primary" | "secondary" | "surface";
}

/**
 * 移动端汉堡菜单图标组件
 */
const MobileNavIcon = forwardRef<HTMLButtonElement, MobileNavIconProps>(
  ({ className, isActive, style, onClick, variant = "primary", ...rest }) => {
    // 根据变体选择颜色主题
    const variantStyles = {
      primary: {
        button: "bg-primary hover:bg-primary-container border-primary/20 focus:ring-primary/30",
        lines: "bg-on-primary group-hover:bg-on-primary-container",
      },
      secondary: {
        button: "bg-surface hover:bg-surface-container border-outline/20 focus:ring-outline/30",
        lines: "bg-on-surface group-hover:bg-on-surface-variant",
      },
      surface: {
        button:
          "bg-surface-container hover:bg-surface-container-high border-outline-variant/20 focus:ring-primary/30",
        lines: "bg-content group-hover:bg-content-secondary",
      },
    };

    const currentVariant = variantStyles[variant];

    return (
      <button
        className={cn(
          // 基础布局和交互
          "group relative flex h-10 min-h-10 w-10 min-w-10 items-center justify-center",
          "rounded-md border transition-all duration-300 ease-out",
          "cursor-pointer outline-none",

          // 焦点和悬停状态
          "focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
          "transform-gpu active:scale-95",

          // 主题变体样式
          currentVariant.button,

          // 可访问性
          "aria-label",

          className
        )}
        style={style}
        onClick={onClick}
        aria-label={isActive ? "close menu" : "open menu"}
        aria-expanded={isActive}
        type="button"
        {...rest}
      >
        {/* 第一条线 */}
        <div
          className={cn(
            // 基础样式
            "absolute h-0.5 w-6 transition-all duration-300 ease-out",
            currentVariant.lines,

            // 默认位置（上方）
            !isActive && "translate-x-0 -translate-y-1.5 rotate-0",

            // 激活状态（旋转45度，居中）
            isActive && "translate-x-0 translate-y-0 rotate-45"
          )}
        />

        {/* 第二条线 */}
        <div
          className={cn(
            // 基础样式
            "absolute h-0.5 w-6 transition-all duration-300 ease-out",
            currentVariant.lines,

            // 默认位置（下方）
            !isActive && "translate-x-0 translate-y-1.5 rotate-0",

            // 激活状态（旋转-45度，居中）
            isActive && "translate-x-0 translate-y-0 -rotate-45"
          )}
        />
      </button>
    );
  }
);

MobileNavIcon.displayName = "MobileNavIcon";

/**
 * 移动端导航栏容器组件
 */
interface MobileNavigationBarProps {
  children?: React.ReactNode;
  className?: string;
  position?: "top" | "bottom";
}

const MobileNavigationBar: React.FC<MobileNavigationBarProps> = ({
  children,
  className,
  position = "top",
}) => {
  const positionStyles = {
    top: "top-0 border-b border-outline/10",
    bottom: "bottom-0 border-t border-outline/10",
  };

  return (
    <nav
      className={cn(
        // 基础定位和布局
        "fixed right-0 left-0 z-50",
        "flex items-center justify-between",
        "bg-surface-container",
        "px-4 py-3",

        // 响应式显示（仅在移动端显示）
        "block md:hidden",

        // 位置样式
        positionStyles[position],

        // 语义化颜色
        "text-on-surface",

        className
      )}
      role="navigation"
      aria-label="mobile navigation"
    >
      {children}
    </nav>
  );
};

/**
 * 移动端导航菜单项组件
 */
interface MobileNavMenuItemProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
}

const MobileNavMenuItem: React.FC<MobileNavMenuItemProps> = ({
  children,
  href,
  onClick,
  isActive = false,
  className,
}) => {
  const Component = href ? "a" : "button";

  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(
        // 基础样式
        "flex flex-grow items-center gap-3 rounded-lg px-4 py-2",
        "transition-all duration-200 ease-out",
        "w-full text-left",

        // 交互状态
        "hover:bg-surface-container-high active:scale-[0.98]",
        "focus:ring-2 focus:ring-primary/30 focus:outline-none",

        // 激活状态
        isActive
          ? "bg-primary-container font-medium text-on-primary-container"
          : "text-content hover:text-on-surface",

        // 链接特定样式（移除默认链接样式）
        href && "no-underline",

        className
      )}
      role="menuitem"
    >
      {children}
    </Component>
  );
};

/**
 * 移动端下拉菜单组件
 */
interface MobileNavMenuProps {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
}

const MobileNavMenu: React.FC<MobileNavMenuProps> = ({ isOpen, children, className }) => {
  return (
    <div
      className={cn(
        // 基础布局
        "fixed top-16 right-0 left-0 z-40",
        "border-b border-outline/20 bg-surface",
        "shadow-lg backdrop-blur-sm",

        // 动画效果
        "transform-gpu transition-all duration-300 ease-out",
        "overflow-hidden",

        // 显示/隐藏状态
        isOpen ? "max-h-screen translate-y-0 opacity-100" : "max-h-0 -translate-y-full opacity-0",

        // 响应式
        "block md:hidden",

        className
      )}
      role="menu"
      aria-hidden={!isOpen}
    >
      <div className="max-h-[70vh] space-y-1 overflow-y-auto py-4">{children}</div>
    </div>
  );
};

export {
  MobileNavIcon,
  MobileNavigationBar,
  MobileNavMenuItem,
  MobileNavMenu,
  type MobileNavIconProps,
  type MobileNavigationBarProps,
  type MobileNavMenuItemProps,
  type MobileNavMenuProps,
};
