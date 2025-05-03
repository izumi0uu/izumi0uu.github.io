/**
 * @file rehype-autolink-headings.mjs
 * @description Automatically add anchor links to headings.
 */
// plugins/rehype-autolink-headings.mjs
// 用途：自动为标题添加锚点链接
import rehypeAutolinkHeadingsPlugin from "rehype-autolink-headings";

const options = {
  behavior: "append", // 或 'wrap', 'before', 'after'
};

export default [rehypeAutolinkHeadingsPlugin, options];
