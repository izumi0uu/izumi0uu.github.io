import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

import type { Config } from "tailwindcss";

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
        sans: ["Inter", '"Noto Sans SC"', ...defaultTheme.fontFamily.sans],
        mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        // === 酒红主题原始颜色 ===

        // --- 亮色模式主要颜色 ---
        "wine-primary-light": "rgb(144 75 63)",
        "wine-on-primary-light": "rgb(255 255 255)",
        "wine-primary-container-light": "rgb(255 218 212)",
        "wine-on-primary-container-light": "rgb(58 9 4)",
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

        // --- 亮色模式功能与容器色 ---
        "wine-primary-fixed-light": "rgb(255 180 167)",
        "wine-error-light": "rgb(186 26 26)",
        "wine-on-error-light": "rgb(255 255 255)",
        "wine-error-container-light": "rgb(255 218 214)",
        "wine-on-error-container-light": "rgb(65 0 2)",
        "wine-surface-container-low-light": "rgb(252 238 234)",
        "wine-surface-container-light": "rgb(246 230 226)",

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

        // === 主题变量映射 (可被CSS变量动态更改) ===
        primary: "var(--th-primary)",
        secondary: "var(--th-secondary)",
        accent: "var(--th-accent)",
        background: "var(--th-background)",
        surface: "var(--th-surface)",
        "surface-variant": "var(--th-surface-variant)",
        "on-primary": "var(--th-on-primary)",
        "on-secondary": "var(--th-on-secondary)",
        "on-background": "var(--th-on-background)",
        "on-surface": "var(--th-on-surface)",
        "on-surface-variant": "var(--th-on-surface-variant)",
        content: "var(--th-content)",
        headings: "var(--th-headings)",
        captions: "var(--th-captions)",
        links: "var(--th-links)",
        "links-hover": "var(--th-links-hover)",
        "base-100": "var(--th-base-100)",
        "base-200": "var(--th-base-200)",
        "base-300": "var(--th-base-300)",
        "base-code": "var(--th-base-code)",
      },
    },
  },
};

export default config;
