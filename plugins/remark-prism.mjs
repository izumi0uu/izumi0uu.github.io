/**
 * @file remark-prism.mjs
 * @description 使用 Prism.js 为代码块添加语法高亮。
 */

import remarkPrismPlugin from "remark-prism";

/**
 * 配置选项
 * @type {import('remark-prism').Options}
 */
const options = {
  plugins: ["line-numbers"], // 启用行号功能
};

// 导出插件和配置
export default [remarkPrismPlugin, options];
