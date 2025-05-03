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

// Import core embedder and transformer
import remarkEmbedder from "@remark-embedder/core";
// @ts-ignore - Assume types are missing for this package
import oembedTransformer from "@remark-embedder/transformer-oembed";

// Import other plugins directly or from index
import rehypeExternalLinks from "./plugins/rehype-external-links.mjs"; // Assuming these are correct now
import rehypeAutolinkHeadings from "./plugins/rehype-autolink-headings.mjs";
// Attempt to use preset directly for linting

import {
  remarkLint, // Use the wrapper again
  unifiedPrettier,
  remarkPrism,
  remarkToc,
  remarkSmartypants,
  remarkImages,
  remarkGfm,
  remarkDropcap,
  remarkCapitalizeHeadings,
  remarkCallout,
} from "./plugins/index"; // Adjusted path if necessary

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), tailwind(), react(), icon(), partytown()],
  markdown: {
    rehypePlugins: [
      // @ts-ignore
      [...rehypeExternalLinks],
      // @ts-ignore
      [...rehypeAutolinkHeadings],
    ],
    remarkPlugins: [
      remarkLint, // Use the wrapper from index.ts again
      unifiedPrettier,
      remarkPrism,
      remarkToc,
      remarkSmartypants,
      remarkImages, // Assuming this exports [plugin, options] or just plugin correctly now
      remarkGfm,
      // @ts-ignore - Accessing .default due to potential CJS/ESM interop issues
      [remarkEmbedder.default, { transformers: [oembedTransformer.default] }],
      remarkDropcap,
      remarkCapitalizeHeadings,
      remarkCallout,
    ],
  },
});
