/**
 * @file remark-lint.mjs
 * @description Markdown code style linter (Requires a preset like remark-preset-lint-recommended).
 */
// plugins/remark-lint.mjs
// 用途：Markdown 代码风格检查
// 注意：remark-lint 通常与具体的 lint 规则插件 (如 remark-preset-lint-recommended) 结合使用
import remarkLint from "remark-lint";
import remarkPresetLintRecommended from "remark-preset-lint-recommended";

/** @type {any} */ // 类型取决于使用的 preset 或配置
const options = {
  // 在这里添加你的配置选项或引入 preset
  // 例如，使用推荐规则集：
  // ...require('remark-preset-lint-recommended').settings,
};

// 通常 remark-lint 会作为 preset 的一部分，或者直接导出
// 如果单独使用，可能需要查阅文档确认导出方式
export default [remarkPresetLintRecommended];
