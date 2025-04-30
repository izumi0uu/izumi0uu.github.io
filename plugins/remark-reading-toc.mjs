/**
 * @file remark-reading-toc.mjs
 * @description Remark reading toc plugin, for the sake of reading experience.
 */

import remarkToc from "remark-toc";

export const remarkToc = [remarkToc, { maxDepth: 2, orderedList: false }];

export const remarkReadingToc = [
  remarkToc,
  { maxDepth: 2, orderedList: false },
];
