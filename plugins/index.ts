/**
 * @file index.ts
 * @description 统一导出所有 Remark/Rehype 插件，方便在 Astro 配置中使用。
 */

// Markdown 代码风格检查
import remarkLint from "./remark-lint.mjs";

// 使用 Prettier 格式化 Markdown
import unifiedPrettier from "./unified-prettier.mjs";

// 使用 Prism.js 为代码块添加语法高亮
import remarkPrism from "./remark-prism.mjs";

// 自动生成目录
import remarkToc from "./remark-toc.mjs";

// 智能标点转换
import remarkSmartypants from "./remark-smartypants.mjs";

// 图片处理与优化
import remarkImages from "./remark-images.mjs";

// 支持 GitHub 风格 Markdown
import remarkGfm from "./remark-gfm.mjs";

// 首字下沉效果
import remarkDropcap from "./remark-dropcap.mjs";

// 标题首字母大写
import remarkCapitalizeHeadings from "./remark-capitalize-headings.mjs";

// 自定义提示框
import remarkCallout from "./remark-callout.mjs";

// 为标题添加锚点链接
import rehypeAutolinkHeadings from "./rehype-autolink-headings.mjs";

// 为外部链接添加安全属性
import rehypeExternalLinks from "./rehype-external-links.mjs";

/**
 * 导出所有插件
 * 注意：每个插件模块可能导出插件函数本身，或者 [plugin, options] 形式的元组
 */
export {
  remarkLint,
  unifiedPrettier,
  remarkPrism,
  remarkToc,
  remarkSmartypants,
  remarkImages,
  remarkGfm,
  remarkDropcap,
  remarkCapitalizeHeadings,
  remarkCallout,
  rehypeAutolinkHeadings,
  rehypeExternalLinks,
};
