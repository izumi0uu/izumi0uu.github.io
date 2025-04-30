/**
 * @file remark-gfm.mjs
 * @description Add support for GitHub Flavored Markdown (tables, strikethrough, task lists, etc.).
 */
// plugins/remark-gfm.mjs
// 用途：支持 GitHub Flavored Markdown (表格、删除线、任务列表等)
import remarkGfm from "remark-gfm";

/** @type {import('remark-gfm').Options} */
const options = {
  // 在这里添加你的配置选项
  // 例如：singleTilde: false (用于删除线)
};

// remark-gfm 通常不需要选项，可以直接导出
// export default remarkGfm;
// 但为了统一，也支持数组形式
export default [remarkGfm, options];
