/**
 * @file remark-embedder.mjs
 * @description Remark embedder plugin, automatically convert URL to embed content, such as YouTube videos, CodePen, Twitter, etc., to enhance the interactivity of the article.
 */

import remarkEmbedder from "remark-embedder";

export const remarkEmbedder = [
  remarkEmbedder,
  {
    validate: false,
    options: {},
  },
];
