/**
 * @file astro.config.mjs
 * @description Astro framework configuration file.
 */

// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import icon from "astro-icon";
import {
  rehypeExternalLinks, // This is actually [plugin, options]
  rehypeAutolinkHeadings, // This is actually [plugin, options]
  remarkLint,
  unifiedPrettier,
  remarkPrism,
  remarkToc,
  remarkSmartypants,
  remarkImages,
  remarkGfm,
  remarkEmbedder,
  remarkDropcap,
  remarkCapitalizeHeadings,
  remarkCallout,
} from "./plugins/index.ts";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), tailwind(), react(), icon(), partytown()],
  markdown: {
    rehypePlugins: [
      // @ts-ignore - Spreading the plugin-options array
      [...rehypeExternalLinks],
      // @ts-ignore - Spreading the plugin-options array
      [...rehypeAutolinkHeadings],
    ],
    remarkPlugins: [
      remarkLint,
      unifiedPrettier,
      remarkPrism,
      remarkToc,
      remarkSmartypants,
      remarkImages,
      remarkGfm,
      remarkEmbedder,
      remarkDropcap,
      remarkCapitalizeHeadings,
      remarkCallout,
    ],
  },
});
