// plugins/remark-autolink-headings.mjs
// 用途：自动为标题添加锚点链接
import remarkAutolinkHeadings from "remark-autolink-headings";

/** @type {import('remark-autolink-headings').Options} */
const options = {
  // 在这里添加你的配置选项
  behavior: "append", // 或 'wrap', 'before', 'after'
};

export default [remarkAutolinkHeadings, options];
