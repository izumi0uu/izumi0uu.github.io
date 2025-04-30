/**
 * @file remark-toc.mjs
 * @description Generate a Table of Contents based on headings.
 */
// plugins/remark-toc.mjs
// 用途：自动生成目录 (Table of Contents)
// 会在 Markdown 中寻找特定标题（默认为 'Table of Contents'）并在其后插入目录
import remarkToc from "remark-toc";

/** @type {import('remark-toc').Options} */
const options = {
  // 在这里添加你的配置选项
  heading: "toc|table[ -]of[ -]contents?", // 用于匹配目录标题的正则表达式
  // tight: true, // 是否使用紧凑列表
  // maxDepth: 3, // 生成目录的最大标题深度
};

export default [remarkToc, options];
