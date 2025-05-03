/**
 * @file remark-gfm.mjs
 * @description 添加对 GitHub 风格 Markdown 的支持（表格、删除线、任务列表等）。
 */

import remarkGfmPlugin from "remark-gfm";

/**
 * 配置选项
 * @type {import('remark-gfm').Options}
 */
const options = {
  // 示例配置选项
  // singleTilde: false, // 控制单波浪线是否表示删除线
};

// 导出插件和配置
export default [remarkGfmPlugin, options];
