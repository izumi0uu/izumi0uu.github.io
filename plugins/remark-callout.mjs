/**
 * @file remark-callout.mjs
 * @description 添加自定义提示框样式，支持各种类型的提示（注意、警告、提示等）。
 * @note 此插件可能需要特定的 CSS 样式配合使用。
 */

import remarkCalloutPlugin from "remark-callout";

/**
 * 配置选项
 * @type {import('remark-callout').Options}
 */
const options = {
  // 示例配置（根据实际需求调整）
  // types: ['note', 'warning', 'info', 'tip']
};

// 导出插件和配置
export default [remarkCalloutPlugin, options];
