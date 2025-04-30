/**
 * @file remark-prism.mjs
 * @description Add syntax highlighting to code blocks using Prism.js.
 */
import remarkPrism from "remark-prism";

export const remarkPrism = [
  remarkPrism,
  {
    plugins: ["line-numbers"],
  },
];

// 默认导出插件，可以添加 options 对象进行配置
// const options = {};
export default remarkPrism;
// export default [remarkPrism, options];
