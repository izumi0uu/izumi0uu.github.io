/**
 * @file remark-callout.mjs
 * @description Add custom callout block styles (Note: Requires specific CSS).
 */
// plugins/remark-callout.mjs
// 用途：自定义提示框样式
// 注意：这个插件可能需要特定的 CSS 样式配合
import remarkCallout from "remark-callout"; // 假设插件包名为 remark-callout

/** @type {any} */ // 需要查阅插件文档确定 Options 类型
const options = {
  // 在这里添加你的配置选项
};

// 导出方式取决于插件本身，可能是 [plugin, options] 或 plugin
// 请查阅 remark-callout 文档确认
export default [remarkCallout, options];
// export default remarkCallout; // 或者这样
