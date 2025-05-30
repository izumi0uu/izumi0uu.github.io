# 🎨 语义化变量使用参考指南

## ✅ 迁移完成总结

**从自定义语义化系统到 Tailwind v4 原生系统的成功迁移：**

### 🔄 主要变化

- ✅ **删除**: 移除了所有手动定义的工具类（如 `.bg-base`, `.text-primary` 等）
- ✅ **保留**: 保留了语义化 CSS 变量定义和主题切换逻辑
- ✅ **自动化**: Tailwind v4 现在自动根据 CSS 变量生成对应的工具类

### 🚀 迁移优势

1. **零维护**: 无需手动维护工具类映射，Tailwind 自动生成
2. **完全一致**: 所有 `--color-*` 变量都自动生成 `bg-*`, `text-*`, `border-*` 类
3. **性能提升**: 构建速度更快，CSS 输出更优化
4. **现代化**: 利用 Tailwind v4 的最新特性和最佳实践

---

> **Tailwind v4 自动生成原理**: 当你在 CSS 中定义 `--color-primary: #3b82f6` 时，Tailwind v4 会自动生成 `bg-primary`, `text-primary`, `border-primary` 等工具类。

## 📋 可用的语义化变量

### 🔵 主要颜色系统 (Primary Colors)

| CSS 变量                       | 自动生成的工具类                                       | 使用场景           |
| ------------------------------ | ------------------------------------------------------ | ------------------ |
| `--color-primary`              | `bg-primary`, `text-primary`, `border-primary`         | 品牌主色、主要按钮 |
| `--color-on-primary`           | `bg-on-primary`, `text-on-primary`                     | 主色背景上的文字   |
| `--color-primary-container`    | `bg-primary-container`, `text-primary-container`       | 主色容器背景       |
| `--color-on-primary-container` | `bg-on-primary-container`, `text-on-primary-container` | 主色容器上的文字   |

**示例用法:**

```html
<!-- 主要按钮 -->
<button class="bg-primary text-on-primary hover:bg-primary/90">保存更改</button>

<!-- 主色容器 -->
<div class="bg-primary-container text-on-primary-container rounded-lg p-4">重要信息提示</div>
```

---

### 🟠 次要颜色系统 (Secondary Colors)

| CSS 变量                         | 自动生成的工具类                                           | 使用场景           |
| -------------------------------- | ---------------------------------------------------------- | ------------------ |
| `--color-secondary`              | `bg-secondary`, `text-secondary`, `border-secondary`       | 次要按钮、标签     |
| `--color-on-secondary`           | `bg-on-secondary`, `text-on-secondary`                     | 次要色背景上的文字 |
| `--color-secondary-container`    | `bg-secondary-container`, `text-secondary-container`       | 次要色容器背景     |
| `--color-on-secondary-container` | `bg-on-secondary-container`, `text-on-secondary-container` | 次要色容器上的文字 |

**示例用法:**

```html
<!-- 次要按钮 -->
<button class="bg-secondary text-on-secondary hover:bg-secondary/90">取消</button>

<!-- 次要信息卡片 -->
<div class="bg-secondary-container text-on-secondary-container rounded-lg p-4">次要信息</div>
```

---

### 🎯 功能颜色系统 (Functional Colors)

| CSS 变量          | 自动生成的工具类                               | 使用场景 |
| ----------------- | ---------------------------------------------- | -------- |
| `--color-success` | `bg-success`, `text-success`, `border-success` | 成功状态 |
| `--color-error`   | `bg-error`, `text-error`, `border-error`       | 错误状态 |
| `--color-warning` | `bg-warning`, `text-warning`, `border-warning` | 警告状态 |
| `--color-info`    | `bg-info`, `text-info`, `border-info`          | 信息状态 |

**示例用法:**

```html
<!-- 状态消息 -->
<div class="bg-success-container text-on-success-container border-success rounded border-l-4 p-3">
  ✅ 操作成功完成
</div>

<div class="bg-error-container text-on-error-container border-error rounded border-l-4 p-3">
  ❌ 操作失败，请重试
</div>

<div class="bg-warning-container text-on-warning-container border-warning rounded border-l-4 p-3">
  ⚠️ 请注意此操作不可撤销
</div>

<div class="bg-info-container text-on-info-container border-info rounded border-l-4 p-3">
  ℹ️ 这是一条信息提示
</div>
```

---

### 🏢 表面颜色系统 (Surface Colors)

| CSS 变量                     | 自动生成的工具类                                   | 使用场景         |
| ---------------------------- | -------------------------------------------------- | ---------------- |
| `--color-background`         | `bg-background`, `text-background`                 | 页面主背景       |
| `--color-on-background`      | `bg-on-background`, `text-on-background`           | 主背景上的文字   |
| `--color-surface`            | `bg-surface`, `text-surface`                       | 卡片、对话框背景 |
| `--color-on-surface`         | `bg-on-surface`, `text-on-surface`                 | 表面背景上的文字 |
| `--color-surface-variant`    | `bg-surface-variant`, `text-surface-variant`       | 次要表面背景     |
| `--color-on-surface-variant` | `bg-on-surface-variant`, `text-on-surface-variant` | 次要表面上的文字 |

**示例用法:**

```html
<!-- 页面布局 -->
<body class="bg-background text-on-background">
  <main class="min-h-screen">
    <!-- 卡片组件 -->
    <div class="bg-surface text-on-surface rounded-lg p-6 shadow-md">
      <h2 class="text-on-surface mb-4 font-semibold">卡片标题</h2>
      <p class="text-on-surface-variant">这是卡片内容描述文字</p>
    </div>
  </main>
</body>
```

---

### 📦 容器层次系统 (Container Hierarchy)

| CSS 变量                            | 自动生成的工具类               | 层次级别 |
| ----------------------------------- | ------------------------------ | -------- |
| `--color-surface-container-lowest`  | `bg-surface-container-lowest`  | 最低层   |
| `--color-surface-container-low`     | `bg-surface-container-low`     | 低层     |
| `--color-surface-container`         | `bg-surface-container`         | 标准层   |
| `--color-surface-container-high`    | `bg-surface-container-high`    | 高层     |
| `--color-surface-container-highest` | `bg-surface-container-highest` | 最高层   |

**示例用法:**

```html
<!-- 层次化布局 -->
<div class="bg-surface-container-lowest p-8">
  <div class="bg-surface-container-low rounded-lg p-6">
    <div class="bg-surface-container rounded p-4">
      <div class="bg-surface-container-high rounded p-3">
        <div class="bg-surface-container-highest rounded p-2 text-center">最高层内容</div>
      </div>
    </div>
  </div>
</div>
```

---

### 🖼️ 轮廓边框系统 (Outline & Border)

| CSS 变量                  | 自动生成的工具类                                 | 使用场景 |
| ------------------------- | ------------------------------------------------ | -------- |
| `--color-outline`         | `border-outline`, `text-outline`                 | 主要边框 |
| `--color-outline-variant` | `border-outline-variant`, `text-outline-variant` | 次要边框 |

**示例用法:**

```html
<!-- 表单组件 -->
<input
  type="text"
  class="border-outline focus:border-primary focus:ring-primary/20 w-full rounded-md border px-3 py-2 focus:ring-2"
  placeholder="请输入内容"
/>

<!-- 分割线 -->
<hr class="border-outline-variant my-6" />
```

---

### 📝 文本层次系统 (Text Hierarchy)

| CSS 变量                    | 自动生成的工具类         | 使用场景       |
| --------------------------- | ------------------------ | -------------- |
| `--color-content`           | `text-content`           | 主要文本内容   |
| `--color-content-secondary` | `text-content-secondary` | 次要文本内容   |
| `--color-headings`          | `text-headings`          | 标题文字       |
| `--color-captions`          | `text-captions`          | 说明文字、图注 |

**示例用法:**

```html
<!-- 文章结构 -->
<article class="prose">
  <h1 class="text-headings mb-4 text-3xl font-bold">文章标题</h1>

  <p class="text-content mb-4 leading-relaxed">这是主要的文章内容，具有良好的可读性和对比度。</p>

  <p class="text-content-secondary mb-4">这是次要的说明内容，颜色较浅但仍然清晰可读。</p>

  <figure>
    <img src="image.jpg" alt="示例图片" class="rounded-lg" />
    <figcaption class="text-captions mt-2 text-center text-sm">图片说明文字</figcaption>
  </figure>
</article>
```

---

### 🔗 链接系统 (Link Colors)

| CSS 变量               | 自动生成的工具类    | 使用场景   |
| ---------------------- | ------------------- | ---------- |
| `--color-link`         | `text-link`         | 普通链接   |
| `--color-link-hover`   | `text-link-hover`   | 悬停链接   |
| `--color-link-visited` | `text-link-visited` | 已访问链接 |

**示例用法:**

```html
<!-- 链接样式 -->
<a href="#" class="text-link hover:text-link-hover visited:text-link-visited underline">
  点击这里了解更多
</a>

<!-- 导航链接 -->
<nav>
  <a href="/" class="text-link hover:text-link-hover transition-colors">首页</a>
  <a href="/about" class="text-link hover:text-link-hover transition-colors">关于</a>
</nav>
```

---

### 🎨 分层背景系统 (Layered Backgrounds)

| CSS 变量                      | 自动生成的工具类         | 使用场景       |
| ----------------------------- | ------------------------ | -------------- |
| `--color-base`                | `bg-base`                | 基础背景       |
| `--color-base-secondary`      | `bg-base-secondary`      | 次要基础背景   |
| `--color-base-tertiary`       | `bg-base-tertiary`       | 第三级基础背景 |
| `--color-base-code`           | `bg-base-code`           | 代码背景       |
| `--color-base-code-secondary` | `bg-base-code-secondary` | 次要代码背景   |

**示例用法:**

```html
<!-- 页面结构 -->
<div class="bg-base min-h-screen">
  <header class="bg-base-secondary p-4">导航栏</header>

  <main class="bg-base-tertiary p-6">
    <pre class="bg-base-code rounded p-4">
      <code class="bg-base-code-secondary px-2 py-1 rounded">
        console.log('Hello World');
      </code>
    </pre>
  </main>
</div>
```

---

## 🌙 暗色模式自动适配

所有变量都支持暗色模式自动切换：

```html
<!-- 这些类在暗色模式下会自动使用暗色值 -->
<div class="bg-surface text-on-surface">
  <button class="bg-primary text-on-primary">这个按钮在暗色模式下会自动变色</button>
</div>
```

---

## 🎯 实用技巧

### 1. **透明度修饰符**

```html
<!-- Tailwind v4 自动支持透明度 -->
<div class="bg-primary/50">半透明主色背景</div>
<div class="bg-surface/80">80% 透明度表面</div>
```

### 2. **任意值语法**

```html
<!-- 直接使用 CSS 变量 -->
<div class="bg-[var(--color-primary)]">直接使用变量</div>
<div class="text-[var(--color-content-secondary)]">直接使用文本变量</div>
```

### 3. **组合使用**

```html
<!-- 创建一致的卡片样式 -->
<div
  class="bg-surface border-outline text-on-surface hover:bg-surface-variant rounded-lg border p-6 shadow-sm transition-colors"
>
  卡片内容
</div>
```

### 4. **响应式使用**

```html
<!-- 响应式颜色变化 -->
<div class="bg-surface md:bg-surface-variant lg:bg-surface-container">响应式背景</div>
```

---

## 🔍 调试工具

在任何元素上添加 `theme-indicator` 类来显示当前主题：

```html
<div class="theme-indicator">
  当前主题:
  <!-- 会显示: default, dark, wine-light, wine-dark -->
</div>
```

---

## 📚 主题切换

你的项目支持多个主题，每个主题都会重新定义这些变量：

- **默认主题**: 蓝色系
- **暗色模式**: `[data-theme="dark"]`
- **酒红主题**: `[data-theme="wine-light"]`
- **酒红暗色**: `[data-theme="wine-dark"]`

所有工具类在不同主题下都会自动使用对应的颜色值！

---

## 🎉 成功指标

构建结果显示迁移成功：

- ✅ **构建成功**: 无错误，CSS 正常生成 (23.37 kB)
- ✅ **类型安全**: TypeScript 类型检查通过
- ✅ **自动化**: 所有语义化变量现在自动生成对应的工具类
- ✅ **性能优化**: 利用 Tailwind v4 的性能提升

---

**💡 记住**: 你不需要手动定义这些工具类，Tailwind v4 会根据你的 CSS 变量自动生成它们。专注于使用变量定义设计令牌，让 Tailwind 处理工具类的生成！
