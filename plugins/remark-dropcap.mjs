/**
 * @file remark-dropcap.mjs
 * @description Add dropcap style to the first letter.
 */

import remarkDropcapPlugin from "remark-dropcap";

export default [
  remarkDropcapPlugin,
  {
    levels: [1, 2, 3],
  },
];
