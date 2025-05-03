/**
 * @file remark-images.mjs
 * @description 处理 Markdown 图片（例如：添加响应式属性、调整尺寸等）。
 */

import remarkImagesPlugin from "remark-images";

/**
 * 配置选项
 * @type {import('remark-images').Options}
 */
const options = {
  size: "full", // 设置图片尺寸
};

// 导出插件和配置
export default [remarkImagesPlugin, options];
