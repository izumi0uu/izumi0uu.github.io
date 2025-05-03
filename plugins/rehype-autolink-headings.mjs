/**
 * @file rehype-autolink-headings.mjs
 * @description 自动为标题添加锚点链接。
 */

import rehypeAutolinkHeadingsPlugin from "rehype-autolink-headings";

/**
 * 配置选项
 * @type {import('rehype-autolink-headings').Options}
 */
const options = {
  behavior: "append", // 或 'wrap', 'before', 'after'
};

// 导出插件和配置
export default [rehypeAutolinkHeadingsPlugin, options];
