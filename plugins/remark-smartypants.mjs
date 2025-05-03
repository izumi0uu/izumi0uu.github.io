/**
 * @file remark-smartypants.mjs
 * @description 将普通标点符号（引号、破折号等）转换为排版上更美观的智能标点。
 */

import remarkSmartypantsPlugin from "remark-smartypants";

/**
 * 配置选项
 * @type {import('remark-smartypants').Options}
 */
const options = {
  // 可配置项示例：
  // dashes: 'oldschool', // 破折号样式
  // quotes: true,        // 智能引号
  // ellipses: true,      // 智能省略号
};

// 导出插件和配置
export default [remarkSmartypantsPlugin, options];
