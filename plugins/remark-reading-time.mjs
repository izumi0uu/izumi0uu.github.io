/**
 * @file remark-reading-time.mjs
 * @description Remark 插件：计算 Markdown 内容的阅读时长，注入到 Astro frontmatter 中。
 * 通过 render() 返回的 remarkPluginFrontmatter.readingTime 访问。
 */

import calculateReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

export default function remarkReadingTime() {
  return function (tree, file) {
    const textContent = toString(tree);
    const result = calculateReadingTime(textContent);
    file.data.astro.frontmatter.readingTime = result.minutes;
  };
}
