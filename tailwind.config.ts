/**
 * Tailwind CSS v4 config file
 *
 * v4 uses CSS-first configuration, this file only retains necessary plugins and options
 */

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["src/**/*.{astro,md,mdx,tsx,ts}", "astro.config.mjs"],

  // v4 plugins config
  plugins: [
    // Typography plugin still uses JavaScript configuration in v4
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
  ],
} satisfies Config;

export default config;
