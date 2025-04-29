/**
 * @file astro.config.mjs
 * @description Astro framework configuration file.
 */

// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import icon from "astro-icon";
import { remarkReadingTime } from "./plugins/remark-reading-time.mjs";
import { rehypeExternalLinks } from "./plugins/rehype-external-links.ts";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), tailwind(), react(), icon()],
  markdown: {
    rehypePlugins: [remarkReadingTime(), rehypeExternalLinks],
  },
});
