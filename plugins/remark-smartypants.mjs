// plugins/remark-smartypants.mjs
// 用途：智能标点替换 (例如将普通引号转为弯引号，-- 转为破折号等)
import remarkSmartypants from "remark-smartypants";

/** @type {import('remark-smartypants').Options} */
const options = {
  // 在这里添加你的配置选项
  // 例如：dashes: 'oldschool' | 'inverted' | true
};

export default [remarkSmartypants, options];
