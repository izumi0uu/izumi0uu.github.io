/**
 * @file remark-reading-time.mjs
 * @description Remark reading time plugin, for the sake of reading experience.
 */

import { toString } from "mdast-util-to-string";
import getReadingTime from "reading-time";

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    data.astro.frontmatter.readingTime = readingTime.minutes;
  };
}
