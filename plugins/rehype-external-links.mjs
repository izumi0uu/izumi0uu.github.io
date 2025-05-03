/**
 * @file rehype-external-links.mjs
 * @description 为外部链接添加 target="_blank" 和 rel="noopener noreferrer" 属性。
 */

import rehypeExternalLinksPlugin from "rehype-external-links";

/**
 * 配置选项
 * @type {import('rehype-external-links').Options}
 */
const options = {
  target: "_blank",
  rel: ["noopener", "noreferrer"],
};

// 导出插件和配置
export default [rehypeExternalLinksPlugin, options];
