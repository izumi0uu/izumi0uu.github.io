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
    extend: {
      fontFamily: {
        sans: ["Inter", '"Noto Sans SC"', ...defaultTheme.fontFamily.sans],
        mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
      },
    },
  },
};

export default config;
