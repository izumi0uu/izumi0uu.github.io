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
  rehypeExternalLinks,
  rehypeAutolinkHeadings,
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
} from "./plugins/index.mjs";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), tailwind(), react(), icon(), partytown()],
  markdown: {
    rehypePlugins: [rehypeExternalLinks, rehypeAutolinkHeadings],
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
