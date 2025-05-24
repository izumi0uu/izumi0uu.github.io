# 🎨 Styles 工具类使用指南

## 📖 概述

简化后的 `styles.ts` 专为**直接 CVA 使用模式**设计，与 shadcn/ui 等主流组件库保持一致。

## 🛠️ 导出内容

```typescript
export { cn, cva, type VariantProps };
```

### ✅ 核心功能

1. **`cn` 函数** - 类名组合与冲突解决
2. **`cva` 函数** - 直接导出 class-variance-authority
3. **`VariantProps` 类型** - 变体属性类型推导

---

## 🎯 与你的组件代码完美配合

### **Button 组件示例**

```typescript
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/ui/styles";

// ✅ 直接使用 cva
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        brutal: "rounded-sm border-2 border-black bg-blue-500 px-8 py-4 text-white shadow-[4px_4px_0_0_#000] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        // ✅ 使用 cn 处理类名冲突
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
```

---

## 🔧 cn() 函数详细用法

### **基础组合**

```typescript
import { cn } from "@/utils/ui/styles";

// 简单组合
cn("px-4 py-2", "bg-blue-500");
// => "px-4 py-2 bg-blue-500"

// 条件性组合
cn("px-4 py-2", isActive && "bg-blue-500");
// => isActive ? "px-4 py-2 bg-blue-500" : "px-4 py-2"

// 对象语法
cn("px-4 py-2", {
  "bg-blue-500": isActive,
  "bg-gray-200": !isActive,
});
```

### **类名冲突自动解决**

```typescript
// ✅ 自动解决 Tailwind 冲突
cn("bg-red-500", "bg-blue-500");
// => "bg-blue-500" (后者覆盖前者)

cn("px-4", "px-8", "py-2");
// => "px-8 py-2" (px-8 覆盖 px-4)
```

### **与 CVA 配合使用 (推荐)**

```typescript
// ✅ 标准模式：CVA + cn + 外部类名
className={cn(buttonVariants({ variant, size }), className)}

// ✅ 复杂场景：条件性添加类名
className={cn(
  buttonVariants({ variant, size }),
  isLoading && "opacity-50 cursor-not-allowed",
  hasError && "border-red-500",
  className
)}
```

---

## 🎨 使用最佳实践

### **1. 组件开发模式**

```typescript
// ✅ 推荐：定义变体 → 导出类型 → 在组件中使用
const cardVariants = cva("rounded-lg border", {
  variants: {
    variant: {
      default: "bg-card text-card-foreground",
      outline: "border-2"
    }
  }
});

export interface CardProps extends VariantProps<typeof cardVariants> {
  className?: string;
}

export const Card = ({ variant, className, ...props }: CardProps) => (
  <div className={cn(cardVariants({ variant }), className)} {...props} />
);
```

### **2. 类名合并优先级**

```typescript
// ✅ 正确顺序：基础样式 → 变体 → 条件样式 → 外部类名
cn(
  "base-styles", // 1. 基础样式
  variants({ variant }), // 2. 变体样式
  condition && "extra", // 3. 条件样式
  className // 4. 外部覆盖（优先级最高）
);
```

### **3. 类型安全**

```typescript
// ✅ 利用 VariantProps 获得类型推导
type ButtonVariants = VariantProps<typeof buttonVariants>;
// => { variant?: "default" | "destructive" | "brutal"; size?: "default" | "sm" | "lg" }
```

---

## 🚀 进阶技巧

### **复合变体支持**

```typescript
const complexVariants = cva("base", {
  variants: {
    variant: { primary: "bg-blue-500", secondary: "bg-gray-500" },
    size: { sm: "text-sm", lg: "text-lg" },
  },
  compoundVariants: [
    {
      variant: "primary",
      size: "lg",
      class: "font-bold", // 特定组合的额外样式
    },
  ],
});
```

### **响应式变体**

```typescript
// ✅ 结合响应式类名
cn(
  buttonVariants({ variant: "default" }),
  "w-full md:w-auto", // 响应式宽度
  "text-sm lg:text-base" // 响应式文字大小
);
```

---

## ✅ 总结

这个简化的 `styles.ts` 提供了：

- 🎯 **专注核心**：只保留必需的 `cn` 函数
- 🔧 **完美兼容**：与你的直接 CVA 代码无缝配合
- 📚 **标准实践**：符合 shadcn/ui 等社区标准
- 🚀 **类型安全**：完整的 TypeScript 类型支持

**推荐使用模式**：`cn(variants(props), className)` - 简单、直观、强大！
