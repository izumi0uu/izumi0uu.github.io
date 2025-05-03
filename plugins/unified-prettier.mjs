/**
 * @file unified-prettier.mjs
 * @description 使用 Prettier 格式化 Markdown 文档，确保一致的代码风格。
 */

import { remark } from "remark";
import unifiedPrettierPlugin from "unified-prettier";

/**
 * 统一处理逻辑
 * @param {Object} tree - 语法树
 * @returns {Object} 处理后的结果
 */
export default (tree) => {
  return remark().use(unifiedPrettierPlugin).processSync(tree);
};
