/**
 * @file remark-dropcap.mjs
 * @description Add dropcap style to the first letter.
 */

import remarkDropcap from "remark-dropcap";

export const remarkDropcap = [
  remarkDropcap,
  {
    levels: [1, 2, 3],
  },
];
