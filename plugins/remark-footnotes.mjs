// plugins/remark-footnotes.mjs
// 用途：支持脚注
import remarkFootnotes from "remark-footnotes";

/** @type {import('remark-footnotes').Options} */
const options = {
  // 在这里添加你的配置选项
  // 例如：inlineNotes: true
};

export default [remarkFootnotes, options];
