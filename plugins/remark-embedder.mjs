/**
 * @file remark-embedder.mjs
 * @description Automatically embed external content (YouTube, Twitter, etc.).
 */

import remarkEmbedder from "@remark-embedder/core";

export const remarkEmbedder = [
  remarkEmbedder,
  {
    validate: false,
    options: {},
  },
];
