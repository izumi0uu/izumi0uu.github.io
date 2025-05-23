import defaultTheme from "tailwindcss/defaultTheme";
import plugin, { type PluginUtils } from "tailwindcss/plugin";

import type { Config } from "tailwindcss";

/**
 * Tailwind CSS 配置文件
 *
 * 颜色系统设计原则：
 * 1. 主色：用于主要交互元素，如按钮、链接等
 * 2. 次色：用于次要交互元素，如次要按钮、标签等
 * 3. 第三色：用于特殊强调，如特殊标记、徽章等
 * 4. 表面色：用于背景和容器，提供层次感
 * 5. 错误色：用于错误状态和警告提示
 *
 * 命名规范：
 * - light/dark: 表示明暗模式
 * - on-*: 表示在该背景上的前景色
 * - container-*: 表示容器类型的背景色
 */

const config: Config = {
  content: ["src/**/*.{astro,md,mdx,tsx,ts}", "astro.config.mjs"],

  darkMode: ["selector", ".default-dark"],
  /**
   * @property {Array<object|string>} plugins - 要使用的 Tailwind 插件。
   * 插件可以添加新的功能类、组件样式或变体 (variants)。
   */
  plugins: [
    require("@tailwindcss/typography"),
    plugin(({ addVariant }) => {
      addVariant("not-first", "&:not(:first-child)");
      addVariant("not-last", "&:not(:last-child)");
    }),
  ],
  theme: {
    /**
     * @property {object} tabSize - 定义 `tab-*` 功能类的值。
     * 用于控制代码块等元素的制表符宽度。
     */
    tabSize: {
      1: "1",
      2: "2",
      4: "4",
      8: "8",
    },
    /**
     * @property {object} screens - 定义响应式断点。
     * 注意：这里没有使用 `extend`，而是直接定义 `screens` 对象，
     * 这意味着我们完全覆盖了 Tailwind 的默认断点设置，但通过 `...defaultTheme.screens` 保留了默认断点，
     * 如果放在 `extend` 中，`xs` 会被添加到默认断点的末尾，顺序可能不符合预期。
     */
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        // 默认字体堆栈 (中英文混合)
        sans: ["Inter", '"Noto Sans SC"', ...defaultTheme.fontFamily.sans],
        // 代码字体
        mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
        // 纯英文字体
        en: ["Inter", ...defaultTheme.fontFamily.sans],
        // 纯中文字体
        zh: ['"Noto Sans SC"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // --- 酒红主题原始颜色 ---

        // --- 亮色模式主要颜色 ---
        "wine-primary-light": "rgb(144 75 63)",
        "wine-on-primary-light": "rgb(255 255 255)",
        "wine-primary-container-light": "rgb(255 218 212)",
        "wine-on-primary-container-light": "rgb(58 9 4)",
        "wine-primary-fixed-light": "rgb(255 180 167)",
        "wine-secondary-light": "rgb(119 86 81)",
        "wine-on-secondary-light": "rgb(255 255 255)",
        "wine-secondary-container-light": "rgb(245 221 217)",
        "wine-on-secondary-container-light": "rgb(40 18 15)",
        "wine-tertiary-light": "rgb(159 119 25)",
        "wine-on-tertiary-light": "rgb(255 255 255)",
        "wine-tertiary-container-light": "rgb(251 224 166)",

        // --- 亮色模式表面和背景 ---
        "wine-background-light": "rgb(255 248 246)",
        "wine-on-background-light": "rgb(35 25 24)",
        "wine-surface-light": "rgb(255 248 246)",
        "wine-on-surface-light": "rgb(35 25 24)",
        "wine-surface-variant-light": "rgb(245 221 217)",
        "wine-on-surface-variant-light": "rgb(83 67 64)",
        "wine-outline-light": "rgb(133 115 112)",

        // --- 亮色模式容器系统 ---
        "wine-surface-container-highest-light": "rgb(220 200 195)",
        "wine-surface-container-high-light": "rgb(235 215 210)",
        "wine-surface-container-low-light": "rgb(252 238 234)",
        "wine-surface-container-lowest-light": "rgb(255 250 248)",
        "wine-surface-container-light": "rgb(246 230 226)",
        "wine-surface-dim-light": "rgb(245 235 230)",
        "wine-surface-bright-light": "rgb(255 255 255)",
        "wine-surface-tint-light": "rgb(144 75 63)",

        // --- 暗色模式主要颜色 ---
        "wine-primary-dark": "rgb(255 180 167)",
        "wine-on-primary-dark": "rgb(86 30 21)",
        "wine-primary-container-dark": "rgb(114 51 40)",
        "wine-on-primary-container-dark": "rgb(255 218 212)",

        // --- 暗色模式次要颜色 ---
        "wine-secondary-dark": "rgb(227 188 182)",
        "wine-on-secondary-dark": "rgb(68 42 37)",
        "wine-secondary-container-dark": "rgb(93 63 58)",
        "wine-on-secondary-container-dark": "rgb(255 218 212)",

        // --- 暗色模式第三颜色 ---
        "wine-tertiary-dark": "rgb(229 190 93)",
        "wine-on-tertiary-dark": "rgb(67 48 0)",
        "wine-tertiary-container-dark": "rgb(92 70 0)",
        "wine-on-tertiary-container-dark": "rgb(251 224 166)",

        // --- 暗色模式错误颜色 ---
        "wine-error-dark": "rgb(255 180 171)",
        "wine-on-error-dark": "rgb(105 0 5)",
        "wine-error-container-dark": "rgb(147 0 10)",
        "wine-on-error-container-dark": "rgb(255 180 171)",

        // --- 暗色模式背景和表面 ---
        "wine-background-dark": "rgb(26 17 16)",
        "wine-on-background-dark": "rgb(241 223 219)",
        "wine-surface-dark": "rgb(26 17 16)",
        "wine-on-surface-dark": "rgb(241 223 219)",
        "wine-surface-variant-dark": "rgb(83 67 64)",
        "wine-on-surface-variant-dark": "rgb(214 194 189)",
        "wine-outline-dark": "rgb(158 139 135)",
        "wine-outline-variant-dark": "rgb(83 67 64)",

        // --- 暗色模式容器系统 ---
        "wine-surface-container-highest-dark": "rgb(70 50 45)",
        "wine-surface-container-high-dark": "rgb(55 35 30)",
        "wine-surface-container-low-dark": "rgb(30 20 18)",
        "wine-surface-container-lowest-dark": "rgb(20 10 8)",
        "wine-surface-container-dark": "rgb(35 25 23)",
        "wine-surface-dim-dark": "rgb(15 8 6)",
        "wine-surface-bright-dark": "rgb(45 25 20)",
        "wine-surface-tint-dark": "rgb(255 180 167)",

        // === 主题变量映射 ===
        // 主色
        primary: "var(--th-primary)",
        "on-primary": "var(--th-on-primary)",
        "primary-container": "var(--th-primary-container)",
        "on-primary-container": "var(--th-on-primary-container)",

        // 次要颜色
        secondary: "var(--th-secondary)",
        "on-secondary": "var(--th-on-secondary)",
        "secondary-container": "var(--th-secondary-container)",
        "on-secondary-container": "var(--th-on-secondary-container)",

        // 第三色
        tertiary: "var(--th-tertiary)",
        "on-tertiary": "var(--th-on-tertiary)",
        "tertiary-container": "var(--th-tertiary-container)",
        "on-tertiary-container": "var(--th-on-tertiary-container)",

        // 错误色
        error: "var(--th-error)",
        "on-error": "var(--th-on-error)",
        "error-container": "var(--th-error-container)",
        "on-error-container": "var(--th-on-error-container)",

        // 强调色
        accent: "var(--th-accent)",
        "on-accent": "var(--th-on-accent)",

        // 背景和表面
        background: "var(--th-background)",
        "on-background": "var(--th-on-background)",
        surface: "var(--th-surface)",
        "on-surface": "var(--th-on-surface)",
        "surface-variant": "var(--th-surface-variant)",
        "on-surface-variant": "var(--th-on-surface-variant)",
        "surface-dim": "var(--th-surface-dim)",
        "surface-bright": "var(--th-surface-bright)",
        "surface-tint": "var(--th-surface-tint)",

        // 轮廓
        outline: "var(--th-outline)",
        "outline-variant": "var(--th-outline-variant)",

        // 语义化颜色映射
        content: "var(--th-content)",
        headings: "var(--th-headings)",
        captions: "var(--th-captions)",
        links: "var(--th-links)",
        "links-hover": "var(--th-links-hover)",
        "links-visited": "var(--th-links-visited)",

        // 分层背景系统
        "base-100": "var(--th-base-100)",
        "base-200": "var(--th-base-200)",
        "base-300": "var(--th-base-300)",
        "base-code": "var(--th-base-code)",

        // 容器系统
        "surface-container-lowest": "var(--th-surface-container-lowest)",
        "surface-container-low": "var(--th-surface-container-low)",
        "surface-container": "var(--th-surface-container)",
        "surface-container-high": "var(--th-surface-container-high)",
        "surface-container-highest": "var(--th-surface-container-highest)",
      },
    },
    typography: ({ theme }: PluginUtils) => ({
      // 默认的 `prose` 样式配置
      DEFAULT: {
        css: {
          // 移除代码块前后默认添加的引号
          "code::before": { content: '""' },
          "code::after": { content: '""' },
          // 可以在这里添加更多自定义的 `prose` 样式
          // 例如：
          // h1: { color: theme('colors.headings') },
          // a: { color: theme('colors.links.DEFAULT'), '&:hover': { color: theme('colors.links.hover') } },
        },
      },
      // 自定义一个名为 `prose-a-img` 的排版变体
      // 使用方式：<div class="prose prose-a-img">...</div>
      "a-img": {
        css: {
          "a:hover img": {
            outline: `4px solid ${theme("colors.wine-primary-light")}`,
          },
        },
      },
    }),
  },
};

export default config;
