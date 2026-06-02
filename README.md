# izumi0uu's blog

## production build env

- `npm run build` now supports the repository default state even when `.env.production` is absent.
- For explicit production overrides, copy `.env.production.example` to `.env.production`.
- Public production metadata falls back to the built-in canonical site URL when no production file is present.

## testing

- Unified test entrypoints now live on `Vitest + Playwright`.
- Run `npm run test` for the full gate, `npm run test:smoke` for repo-level contracts, and `npm run test:e2e` for browser coverage.
- See [docs/TESTING.md](/Users/idah/projects/izumi0uu.github.io/docs/TESTING.md) for the current layout and notes.

## linting

- Run `npm run lint` to lint `Astro`, `TS/TSX`, and `MDX` source files from `src/`.
- Generated output under `src/paraglide` is ignored so the lint baseline stays focused on maintained source code.

## seo

- Open Graph metadata now resolves to a real static fallback image at `/images/default/default-open-graph-image.webp`.
- Feed endpoints are generated at `/api/feed.json` and `/api/feed.xml`.

## content source

- The current source of truth is local MDX content under `src/content/post` and `src/content/project`.
- Astro content collections in `src/content/config.ts` load that content at build time; there is no active runtime CMS in the production path.
- See [docs/CONTENT_SOURCE_OF_TRUTH.md](/Users/idah/projects/izumi0uu.github.io/docs/CONTENT_SOURCE_OF_TRUTH.md) for the current platform decision and change policy.

## file organization - utils, constants, utils

Maintain Domain-Based Organization: Continue organizing files by domain across all three directories.

Be Mindful of Circular Dependencies: While TypeScript handles this well at compile time, it's still worth being cautious about creating complex dependency cycles.

Consider Colocating Related Files: For very tightly coupled features, consider keeping related types, constants, and utils closer together.

## i18n

- `/` 现在会先读取本地首选语言，再一次性跳转到对应 locale；`/en/` 仅作为 `noscript` fallback，不再抢跑造成默认语言闪烁。
- Header 里的搜索和主题切换文案由 `.astro` 服务端传入，locale 前缀页面的静态 HTML 与 hydration 文案保持一致。
- 缺失翻译时，语言切换仍会回退到目标语言首页，并通过 session notice 提示用户当前内容尚未翻译。

## font management

字体链路现在优先保证稳定性，避免首屏和路由切换时发生多次 fallback 抖动：

### 🏗️ 字体系统架构

#### 基础层 (Foundation Layer)

- **foundation.css**: 定义字体系统的 CSS 变量和设计令牌
  - `--font-family-sans`: 混合中英文字体栈 (Inter + 系统 CJK 回退)
  - `--font-family-mono`: 等宽字体栈 (JetBrains Mono)
  - 为整个系统提供统一的字体变量

#### 加载层 (Loading Layer)

按优先级顺序加载字体资源：

1. **FontLoader.astro** (本地字体 - 最高优先级)

   - 使用 `astro-font` 优化本地字体加载
   - 加载 Inter Variable Font (400-900 权重) + JetBrains Mono (400, 700)
   - `preload: true` 确保关键字体优先加载
   - `display: fallback` 缩短晚到字体替换窗口，降低路由切换时的抖动
   - 绑定选择器：`.font-en`、`.en-only`、`code`、`pre`、`kbd`

2. **FontUtils.astro** (工具层)
   - 提供语言特定的字体类：`.zh-only`、`.en-only`、`.font-mixed`
   - 扩展语义化字体类：`.font-sans`、`.font-mono`
   - 高级优化类：`.font-inter-optimized`、`.font-mono-optimized`
   - 中文优先走系统 CJK 字体栈，不再依赖 Google Fonts 的关键路径加载

#### 应用层 (Application Layer)

- **BaseHead.astro**: 统一管理字体加载顺序

  ```astro
  <FontLoader />
  <!-- 1. 本地 Latin / Mono 字体优先 -->
  <FontUtils />
  <!-- 2. 工具类扩展 + 系统 CJK 回退 -->
  ```

### 🔄 运行机制与协调作用

#### 字体加载策略

1. **关键路径只保留本地字体**: Inter 和 JetBrains Mono 走本地 `woff2`
2. **中文使用系统字体回退**: 减少远端字体晚到后再次替换字形
3. **性能优化**:
   - 本地字体使用 `preload` 优先加载
   - `display: fallback` 缩短可见 swap 窗口
   - 去掉 Google Fonts 的关键路径请求，减少 CLS 风险

#### 字体绑定与选择器

```css
/* 自动绑定 (FontLoader) */
.font-en, .en-only → Inter Variable Font
code, pre, kbd, .font-code → JetBrains Mono

/* 手动绑定 (FontUtils) */
.zh-only → system CJK stack
.font-mixed, .font-sans → CSS变量字体栈
.font-mono → 等宽字体栈;
```

#### 多语言字体协调

- **英文内容**: 使用 Inter 获得最佳排版效果
- **中文内容**: 优先使用系统自带的 CJK 字体，降低远端字体替换抖动
- **混合内容**: 通过 CSS 变量实现智能字体栈回退
- **代码内容**: 统一使用 JetBrains Mono

### 🎯 使用指南

#### 基本用法

```html
<!-- 纯英文元素 -->
<div class="en-only">English Content</div>

<!-- 纯中文元素 -->
<div class="zh-only">中文内容</div>

<!-- 中英混合元素 (默认) -->
<div class="font-mixed">Mixed 混合内容</div>

<!-- 代码元素 -->
<code>console.log('hello world')</code>
```

#### 高级优化

```html
<!-- Inter高级特性优化 -->
<div class="font-inter-optimized">Advanced Typography</div>

<!-- 代码字体优化 (禁用连字) -->
<code class="font-mono-optimized">=> != === !==</code>
```

**base layer (zh-only/en-only)**：确保字体正确加载和应用
**fine layer (font-\* 系列)**：为开发者提供更多语义化和丰富的工具

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/izumi0uu/izumi0uu.github.io)
