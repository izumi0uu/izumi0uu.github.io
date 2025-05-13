/**
 * @file astro.config.ts
 * @description Astro 框架配置文件，包含所有插件和集成的设置。
 * @author izumi0uu
 */

// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";
import { astroFont } from "astro-font/integration";

// Import core embedder and transformer
import remarkEmbedder from "@remark-embedder/core";
// @ts-ignore - 包可能缺少类型定义
import oembedTransformer from "@remark-embedder/transformer-oembed";

// Import other plugins directly or from index
import rehypeExternalLinks from "./plugins/rehype-external-links.mjs";
import rehypeAutolinkHeadings from "./plugins/rehype-autolink-headings.mjs";
// Attempt to use preset directly for linting

import {
  remarkLint, // Markdown 代码风格检查
  unifiedPrettier, // Prettier 格式化
  // remarkPrism, // 代码高亮
  remarkToc, // 自动目录
  remarkSmartypants, // 智能标点
  remarkImages, // 图片处理
  remarkGfm, // GitHub 风格 Markdown
  remarkDropcap, // 首字下沉
  remarkCapitalizeHeadings, // 标题首字母大写
  remarkCallout, // 自定义提示框
} from "./plugins/index";

import { expressiveCodeIntegration } from "./src/libs/integrations/expressive-code";
import { sitemapIntegration } from "./src/libs/integrations/sitemap";

import { PROCESS_ENV, astroEnvSchema } from "./src/config/process-env";

/**
 * Astro 配置
 * @see https://astro.build/config
 */
export default defineConfig({
  /**
   * @property {string} site - 网站的最终部署 URL。
   * Astro 会用这个 URL 来生成站点地图、规范链接 (canonical URLs) 和其他绝对链接。
   */
  site: PROCESS_ENV.SITE_URL,
  trailingSlash: "ignore",
  env: astroEnvSchema,
  compressHTML: true,
  server: { port: 4321 },
  devToolbar: { enabled: true },
  integrations: [
    react(),
    icon({ iconDir: "./src/assets/icons" }),
    partytown({ config: { forward: ["dataLayer.push"] } }),
    expressiveCodeIntegration(),
    sitemapIntegration(),
    mdx(),
    astroFont(),
  ],
  markdown: {
    rehypePlugins: [
      // @ts-ignore - 这些插件已经导出为 [plugin, options] 形式
      [...rehypeExternalLinks],
      // @ts-ignore
      [...rehypeAutolinkHeadings],
    ],
    remarkPlugins: [
      // @ts-ignore - 忽略类型错误，插件仍然能够正常工作
      remarkLint,
      // @ts-ignore
      unifiedPrettier,
      // @ts-ignore
      // remarkPrism,
      // @ts-ignore
      remarkToc,
      // @ts-ignore
      remarkSmartypants,
      // @ts-ignore
      remarkImages,
      // @ts-ignore
      remarkGfm,
      // @ts-ignore - 处理 CJS/ESM 互操作性问题
      [remarkEmbedder.default, { transformers: [oembedTransformer.default] }],
      // @ts-ignore
      remarkDropcap,
      // @ts-ignore
      remarkCapitalizeHeadings,
      // @ts-ignore
      remarkCallout,
    ],
  },
  vite: {
    build: {
      sourcemap: false,
    },

    server: {
      allowedHosts: ["localhost", "izumi0uu.com"],
    },

    plugins: [tailwindcss()],
  },
});
