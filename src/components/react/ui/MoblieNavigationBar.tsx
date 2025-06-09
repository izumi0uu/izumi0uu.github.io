"use client";
import React, { forwardRef, useEffect, useRef } from "react";
import { cn } from "@/utils/ui/styles";

interface MobileNavIconProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  isActive: boolean;
  variant?: "primary" | "secondary" | "surface";
}

/**
 * 🍔 移动端汉堡菜单图标组件
 *
 * 特性：
 * - 完全语义化，使用主题系统的颜色变量
 * - 流畅的旋转动画（关闭→X型）
 * - 支持多种主题变体
 * - 键盘导航友好
 * - 响应式设计
 */
const MobileNavIcon = forwardRef<HTMLButtonElement, MobileNavIconProps>(
  ({ className, isActive, style, onClick, variant = "primary", ...rest }, ref) => {
    // 创建内部引用来跟踪按钮元素
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    // 组合外部ref和内部ref
    const handleRef = (element: HTMLButtonElement | null) => {
      buttonRef.current = element;

      // 转发ref
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    // 在组件卸载时清理引用
    useEffect(() => {
      return () => {
        if (buttonRef.current) {
          const element = buttonRef.current as any;

          // 清理React内部属性
          if (element.__reactProps$) {
            element.__reactProps$ = undefined;
          }
          if (element.__reactFiber$) {
            element.__reactFiber$ = undefined;
          }

          // 清理引用
          buttonRef.current = null;
        }
      };
    }, []);

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
        ref={handleRef}
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
        aria-label={isActive ? "关闭菜单" : "打开菜单"}
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
 * 📱 移动端导航栏容器组件
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
  // 使用ref跟踪导航栏元素
  const navRef = useRef<HTMLElement | null>(null);

  // 在组件卸载时清理引用
  useEffect(() => {
    return () => {
      if (navRef.current) {
        const element = navRef.current as any;

        // 清理React内部属性
        if (element.__reactProps$) {
          element.__reactProps$ = undefined;
        }
        if (element.__reactFiber$) {
          element.__reactFiber$ = undefined;
        }

        // 清理引用
        navRef.current = null;
      }
    };
  }, []);

  const positionStyles = {
    top: "top-0 border-b border-outline/10",
    bottom: "bottom-0 border-t border-outline/10",
  };

  return (
    <nav
      ref={navRef}
      className={cn(
        // 基础定位和布局
        "fixed right-0 left-0 z-50",
        "flex items-center justify-between",
        "bg-surface-container/95 backdrop-blur-sm",
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
      aria-label="移动端导航"
    >
      {children}
    </nav>
  );
};

/**
 * 🧩 移动端导航菜单项组件
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
  // 使用ref跟踪菜单项元素
  const itemRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);

  // 在组件卸载时清理引用
  useEffect(() => {
    return () => {
      if (itemRef.current) {
        const element = itemRef.current as any;

        // 清理React内部属性
        if (element.__reactProps$) {
          element.__reactProps$ = undefined;
        }
        if (element.__reactFiber$) {
          element.__reactFiber$ = undefined;
        }

        // 清理引用
        itemRef.current = null;
      }
    };
  }, []);

  const Component = href ? "a" : "button";

  return (
    <Component
      ref={itemRef as any}
      href={href}
      onClick={onClick}
      className={cn(
        // 基础样式
        "flex items-center gap-3 rounded-lg px-4 py-3",
        "transition-all duration-200 ease-out",
        "w-full text-left",

        // 交互状态
        "hover:bg-surface-container-high active:scale-[0.98]",
        "focus:ring-2 focus:ring-primary/30 focus:outline-none",

        // 激活状态
        isActive
          ? "bg-primary-container font-medium text-on-primary-container"
          : "text-content hover:text-on-surface",

        className
      )}
      role="menuitem"
    >
      {children}
    </Component>
  );
};

/**
 * 📋 移动端下拉菜单组件
 */
interface MobileNavMenuProps {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
}

const MobileNavMenu: React.FC<MobileNavMenuProps> = ({ isOpen, children, className }) => {
  // 使用ref跟踪菜单元素
  const menuRef = useRef<HTMLDivElement | null>(null);

  // 在组件卸载时清理引用
  useEffect(() => {
    return () => {
      if (menuRef.current) {
        const element = menuRef.current as any;

        // 清理React内部属性
        if (element.__reactProps$) {
          element.__reactProps$ = undefined;
        }
        if (element.__reactFiber$) {
          element.__reactFiber$ = undefined;
        }

        // 清理引用
        menuRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={menuRef}
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
