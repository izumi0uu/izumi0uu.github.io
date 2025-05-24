# 🚀 Tailwind CSS v3 → v4 完整迁移指南

## 📋 迁移概览

本项目从 Tailwind CSS v3 迁移到 v4，充分利用 v4 的新特性：

- **CSS-优先配置**：使用 `@theme` 指令替代 JavaScript 配置
- **原生 CSS 变量**：完全基于 CSS 变量的主题系统
- **现代 CSS 特性**：OKLCH 颜色空间、CSS 层级等
- **性能优化**：更快的构建速度和更小的输出

## 🎯 迁移步骤

### 第一阶段：依赖升级

```bash
# 1. 升级到 Tailwind CSS v4
npm uninstall tailwindcss
npm install tailwindcss@next

# 2. 安装 v4 专用工具
npm install @tailwindcss/vite  # 如果使用 Vite
npm install @tailwindcss/postcss  # 如果使用 PostCSS

# 3. 升级相关依赖
npm install autoprefixer@latest postcss@latest
```

### 第二阶段：配置文件重构

#### 1. 更新 PostCSS 配置

```javascript
// postcss.config.js (v3)
module.exports = {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {},
  },
};

// postcss.config.js (v4)
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

#### 2. 更新 Astro 配置

```typescript
// astro.config.ts (v4 集成)
import { defineConfig } from "astro/config";

export default defineConfig({
  // 移除 tailwind 集成，v4 通过 PostCSS 处理
  integrations: [
    // 其他集成...
  ],
});
```

#### 3. 替换主样式文件

```css
/* src/styles/main.css (v3) */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* src/styles/main.css (v4) */
@import "tailwindcss";
@import "./theme/theme-v4.css";
```

### 第三阶段：主题系统迁移

#### 1. 从 JavaScript 配置迁移到 CSS

**之前 (v3):**

```javascript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        "wine-primary-light": "rgb(144 75 63)",
        // ...更多颜色
      },
    },
  },
};
```

**现在 (v4):**

```css
/* src/styles/theme/theme-v4.css */
@theme {
  --color-wine-primary-light: oklch(0.451 0.063 21.69);
  /* ...更多颜色 */
}
```

#### 2. 语义化主题令牌

创建动态主题切换系统：

```css
/* 默认主题变量 */
@theme {
  --color-primary: var(--color-sky-500);
  --color-background: var(--color-white);
}

/* 主题切换 */
:root[data-theme="wine"] {
  --color-primary: var(--color-wine-primary-light);
  --color-background: var(--color-wine-background-light);
}

:root[data-theme="dark"] {
  --color-primary: var(--color-sky-400);
  --color-background: var(--color-slate-900);
}
```

### 第四阶段：利用 v4 新特性

#### 1. 自定义工具类 (@utility)

```css
@utility btn-primary {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);

  @variant hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-medium);
  }
}
```

#### 2. 自定义变体 (@custom-variant)

```css
@custom-variant theme-wine {
  :root[data-theme="wine"] & {
    @slot;
  }
}

@custom-variant motion-safe {
  @media (prefers-reduced-motion: no-preference) {
    @slot;
  }
}
```

#### 3. 现代 CSS 特性集成

```css
/* OKLCH 颜色空间 */
--color-primary: oklch(0.685 0.169 237.323);

/* CSS 层级 */
@layer theme, base, components, utilities;

/* 容器查询支持 */
@container (width >= 768px) {
  .responsive-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

## 🔧 代码更新指南

### HTML 类名迁移

大部分类名保持不变，但有一些变化：

```html
<!-- v3 → v4 变化 -->
<div class="bg-[--brand-color]"></div>
<div class="bg-(--brand-color)"></div>

<!-- 空间工具类建议迁移 -->
<div class="space-y-4"></div>
<div class="flex flex-col gap-4"></div>

<!-- 新的主题类名 -->
<button class="btn-primary theme-wine:bg-wine-primary">主题按钮</button>
```

### JavaScript 集成

#### 主题切换

```typescript
// utils/theme.ts
export function setTheme(theme: "default" | "dark" | "wine" | "wine-dark") {
  document.documentElement.setAttribute("data-theme", theme);

  // 更新 localStorage
  localStorage.setItem("theme", theme);
}

export function getTheme() {
  return localStorage.getItem("theme") || "default";
}

// 响应系统主题变化
export function setupThemeListener() {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  mediaQuery.addEventListener("change", (e) => {
    const currentTheme = getTheme();
    if (currentTheme === "default" || currentTheme === "wine") {
      setTheme(e.matches ? "dark" : "default");
    }
  });
}
```

#### CSS 变量访问

```typescript
// v4 中访问主题变量
function getThemeColor(colorName: string) {
  const styles = getComputedStyle(document.documentElement);
  return styles.getPropertyValue(`--color-${colorName}`);
}

// 动态设置颜色
function setCustomColor(colorName: string, value: string) {
  document.documentElement.style.setProperty(`--color-${colorName}`, value);
}
```

## 🎨 设计系统增强

### 1. 语义化颜色使用

```css
/* 语义化类名，主题无关 */
.text-primary {
  color: var(--color-primary);
}
.bg-surface {
  background-color: var(--color-surface);
}
.border-outline {
  border-color: var(--color-outline);
}
```

### 2. 响应式容器系统

```css
/* 增强的容器系统 */
@utility container {
  margin-inline: auto;
  padding-inline: var(--spacing-md);

  @media (width >= theme(--breakpoint-md)) {
    padding-inline: var(--spacing-lg);
  }
}
```

### 3. 现代动画系统

```css
/* 高性能动画 */
.animate-fade-in {
  animation: fade-in 300ms var(--ease-out-expo);
}

/* 支持用户偏好 */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in {
    animation: none;
  }
}
```

## 🚦 性能优化

### 构建优化

1. **自动 PurgeCSS**：v4 内置更智能的未使用样式移除
2. **更快的编译**：原生 CSS 处理，避免 JavaScript 解析
3. **更小的输出**：优化的 CSS 变量使用

### 运行时优化

```css
/* 利用 CSS 变量的运行时性能 */
.dynamic-theme {
  /* 一次定义，多处使用 */
  background: var(--color-surface);
  color: var(--color-on-surface);
  border: 1px solid var(--color-outline);
}

/* 主题切换无需重新计算样式 */
:root[data-theme="dark"] {
  --color-surface: var(--color-slate-800);
}
```

## 🔍 调试与测试

### 开发工具

```javascript
// 开发环境调试助手
if (import.meta.env.DEV) {
  // 显示当前主题
  console.log("Current theme:", document.documentElement.dataset.theme);

  // 显示可用颜色变量
  const styles = getComputedStyle(document.documentElement);
  const colors = {};

  for (let prop of styles) {
    if (prop.startsWith("--color-")) {
      colors[prop] = styles.getPropertyValue(prop);
    }
  }

  console.table(colors);
}
```

### 主题切换测试

```typescript
// components/ThemeDebugger.tsx (开发环境)
export function ThemeDebugger() {
  const themes = ['default', 'dark', 'wine', 'wine-dark'];

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-surface border border-outline rounded-lg">
      <h3>主题调试器</h3>
      {themes.map(theme => (
        <button
          key={theme}
          onClick={() => setTheme(theme)}
          className="btn-secondary mr-2"
        >
          {theme}
        </button>
      ))}
    </div>
  );
}
```

## 📚 最佳实践

### 1. 渐进式迁移

- **第一步**：更新配置文件和依赖
- **第二步**：迁移基础颜色系统
- **第三步**：利用 v4 新特性增强
- **第四步**：优化和精简代码

### 2. 向后兼容

```css
/* 保持向后兼容的变量映射 */
:root {
  /* v3 兼容性 */
  --tw-color-primary: var(--color-primary);
  --tw-color-secondary: var(--color-secondary);

  /* v4 原生变量 */
  --color-primary: var(--color-sky-500);
  --color-secondary: var(--color-slate-500);
}
```

### 3. 文档和团队协作

- 更新组件文档，说明新的类名规范
- 创建主题切换指南
- 建立 CSS 变量命名约定

## 🎯 验收标准

迁移完成后，确保：

- [ ] 所有页面视觉效果与 v3 一致
- [ ] 主题切换功能正常工作
- [ ] 构建时间有所改善
- [ ] CSS 输出大小优化
- [ ] 无控制台错误或警告
- [ ] 响应式设计保持正常
- [ ] 无障碍功能不受影响

## 🔮 未来扩展

v4 为未来提供了更多可能性：

1. **容器查询**：响应容器大小而非视窗大小
2. **CSS 作用域**：更好的样式隔离
3. **原生嵌套**：无需 PostCSS 插件
4. **现代颜色函数**：color-mix()、color-contrast() 等

---

**注意**：迁移过程中如遇到问题，请参考 [Tailwind CSS v4 官方迁移指南](https://tailwindcss.com/docs/upgrade-guide) 或在项目中创建 issue。
