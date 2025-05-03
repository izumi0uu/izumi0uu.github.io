/**
 * @file remark-capitalize-headings.mjs
 * @description 将标题的首字母大写。
 */

import remarkCapitalizeHeadingsPlugin from "remark-capitalize-headings";

/**
 * 配置选项
 * @type {import('remark-capitalize-headings').Options}
 */
const options = {
  levels: [1, 2, 3], // 仅处理 h1, h2, h3 标题
};

// 导出插件和配置
export default [remarkCapitalizeHeadingsPlugin, options];
