/**
 * @file rehype-external-links.mjs
 * @description Rehype external links plugin, for the sake of security.
 */

import rehypeExternalLinksPlugin from "rehype-external-links";

export default rehypeExternalLinks = [
  rehypeExternalLinksPlugin,
  { target: "_blank", rel: ["noopener", "noreferrer"] },
];
