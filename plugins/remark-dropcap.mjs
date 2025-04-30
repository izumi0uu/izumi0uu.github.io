/**
 * @file remark-dropcap.mjs
 * @description Remark dropcap plugin, for the sake of content dropcap.
 */

import remarkDropcap from "remark-dropcap";

export const remarkDropcap = [
  remarkDropcap,
  {
    levels: [1, 2, 3],
  },
];
