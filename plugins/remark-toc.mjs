/**
 * @file remark-toc.mjs
 * @description 根据文档中的标题自动生成目录（Table of Contents）。
 */

import remarkTocPlugin from "remark-toc";

/**
 * 配置选项
 * @type {import('remark-toc').Options}
 */
const options = {
  heading: "toc|table[ -]of[ -]contents?", // 用于匹配目录标题的正则表达式
  // tight: true,  // 是否使用紧凑列表
  // maxDepth: 3,  // 目录中包含的最大标题级别
};

// 导出插件和配置
export default [remarkTocPlugin, options];
