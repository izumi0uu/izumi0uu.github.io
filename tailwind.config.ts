import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

import type { Config } from "tailwindcss";
import type { PluginUtils } from "tailwindcss/plugin";

const config: Config = {
  content: ["src/**/*.{astro,md,mdx,tsx,ts}", "astro.config.mjs"],

  darkMode: ["selector", ".default-dark"],
  /**
   * @property {Array<object|string>} plugins - 要使用的 Tailwind 插件。
   * 插件可以添加新的功能类、组件样式或变体 (variants)。
   */
  plugins: [
    require("@tailwindcss/typography"),
    plugin(({ addVariant }: PluginUtils) => {
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
      colors: {},
    },
  },
};

export default config;
