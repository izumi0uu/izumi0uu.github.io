import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

import type { Config } from "tailwindcss";
import type { PluginUtils } from "tailwindcss/types/config";

const config: Config = {
  content: ["src/**/*.{astro,md,mdx,tsx,ts}", "astro.config.mjs"],
  theme: {
    extend: {},
  },
};

export default config;
