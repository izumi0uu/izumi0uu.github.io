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

## file organization - utils, constants, utils

Maintain Domain-Based Organization: Continue organizing files by domain across all three directories.

Be Mindful of Circular Dependencies: While TypeScript handles this well at compile time, it's still worth being cautious about creating complex dependency cycles.

Consider Colocating Related Files: For very tightly coupled features, consider keeping related types, constants, and utils closer together.

## i18n

TODO(FIX):
1.paraglideMiddleware 暂时不支持Astro的SSG模式2.不是默认语言的页面在路由跳转会发生默认语言到指定语言的闪烁切换

use ParaglideJS's runtime functions's copy in the client-side script.

partially use the custom functions to handle the session storage and other things.

## font management

TODO(FIX): 1.字体加载在路由切换/首次加载会切换fallback三次

字体管理系统采用分层架构，确保最佳的性能和用户体验：

### 🏗️ 字体系统架构

#### 基础层 (Foundation Layer)

- **foundation.css**: 定义字体系统的 CSS 变量和设计令牌
  - `--font-family-sans`: 混合中英文字体栈 (Inter + Noto Sans SC)
  - `--font-family-mono`: 等宽字体栈 (JetBrains Mono)
  - 为整个系统提供统一的字体变量

#### 加载层 (Loading Layer)

按优先级顺序加载字体资源：

1. **FontLoader.astro** (本地字体 - 最高优先级)

   - 使用 `astro-font` 优化本地字体加载
   - 加载 Inter Variable Font (400-900 权重) + JetBrains Mono (400, 700)
   - `preload: true` 确保关键字体优先加载
   - `display: swap` 防止字体加载阻塞渲染
   - 绑定选择器：`.font-en`、`.en-only`、`code`、`pre`、`kbd`

2. **GoogleFontsLoader.astro** (中文字体)

   - 从 Google Fonts 加载 Noto Sans SC (400, 500, 700)
   - 使用 `preconnect` 优化连接性能
   - 专门处理中文字符显示

3. **FontUtils.astro** (工具层)
   - 提供语言特定的字体类：`.zh-only`、`.en-only`、`.font-mixed`
   - 扩展语义化字体类：`.font-sans`、`.font-mono`
   - 高级优化类：`.font-inter-optimized`、`.font-mono-optimized`

#### 应用层 (Application Layer)

- **BaseHead.astro**: 统一管理字体加载顺序

  ```astro
  <FontLoader />
  <!-- 1. 本地字体优先 -->
  <GoogleFontsLoader />
  <!-- 2. 中文字体补充 -->
  <FontUtils />
  <!-- 3. 工具类扩展 -->
  ```

### 🔄 运行机制与协调作用

#### 字体加载策略

1. **渐进式加载**: 本地字体 → 网络字体 → 工具类增强
2. **回退机制**: 每个字体都配置了合适的 fallback 字体栈
3. **性能优化**:
   - 本地字体使用 `preload` 优先加载
   - Google Fonts 使用 `preconnect` 预连接
   - 所有字体使用 `display: swap` 避免 FOIT

#### 字体绑定与选择器

```css
/* 自动绑定 (FontLoader) */
.font-en, .en-only → Inter Variable Font
code, pre, kbd, .font-code → JetBrains Mono

/* 手动绑定 (FontUtils) */
.zh-only → Noto Sans SC
.font-mixed, .font-sans → CSS变量字体栈
.font-mono → 等宽字体栈;
```

#### 多语言字体协调

- **英文内容**: 使用 Inter 获得最佳排版效果
- **中文内容**: 使用 Noto Sans SC 确保可读性
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
