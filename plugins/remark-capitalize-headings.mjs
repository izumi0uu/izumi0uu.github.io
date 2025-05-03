/**
 * @file remark-capitalize-headings.mjs
 * @description Capitalize the first letter of headings.
 */

import remarkCapitalizeHeadingsPlugin from "remark-capitalize-headings";

export default [
  remarkCapitalizeHeadingsPlugin,
  {
    levels: [1, 2, 3],
  },
];
