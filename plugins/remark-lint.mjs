/**
 * @file remark-lint.mjs
 * @description Markdown 代码风格检查器，确保 Markdown 内容遵循统一的格式规范。
 */

import remarkLint from "remark-lint";
import remarkPresetLintRecommended from "remark-preset-lint-recommended";

/**
 * 配置选项
 * @type {object}
 * @note 此处未使用实际的配置选项，而是通过组合 remarkLint 与 remarkPresetLintRecommended 提供规则集
 */
const options = {
  // 如需自定义规则，可以在此处添加配置
};

// 将 lint 插件和推荐规则集一起导出
export default [remarkLint, remarkPresetLintRecommended];
