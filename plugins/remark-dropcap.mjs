/**
 * @file remark-dropcap.mjs
 * @description 为段落首字母添加首字下沉效果。
 */

import remarkDropcapPlugin from "remark-dropcap";

/**
 * 配置选项
 * @type {import('remark-dropcap').Options}
 */
const options = {
  levels: [1, 2, 3], // 在 h1, h2, h3 后的段落应用首字下沉效果
};

// 导出插件和配置
export default [remarkDropcapPlugin, options];
