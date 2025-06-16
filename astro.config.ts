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

import { paraglideVitePlugin } from "@inlang/paraglide-js";

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
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, PREFIX_DEFAULT_LOCALE } from "./src/config/i18n";

/**
 * Astro 配置
 * @see https://astro.build/config
 */
export default defineConfig({
  server: {
    port: 4321,
    // develop mode, disable cache
    headers: {
      "Cache-Control": "no-store, max-age=0, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  },

  /**
   * @property {string} site - 网站的最终部署 URL。
   * Astro 会用这个 URL 来生成站点地图、规范链接 (canonical URLs) 和其他绝对链接。
   */
  site: PROCESS_ENV.SITE_URL,
  trailingSlash: "ignore",
  env: astroEnvSchema,
  compressHTML: true,
  devToolbar: { enabled: false },

  // 启用视图过渡动画
  viewTransitions: false,

  integrations: [
    react({
      // 配置React集成，使用外部模式减少客户端JS体积
      include: ["**/*.tsx"],
    }),
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
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: SUPPORTED_LOCALES,
    routing: {
      prefixDefaultLocale: PREFIX_DEFAULT_LOCALE,
    },
  },
  vite: {
    build: {
      sourcemap: false,
    },

    server: {
      allowedHosts: ["localhost", "izumi0uu.com"],
      // develop mode, hot module replacement
      hmr: true,
    },

    // develop mode
    optimizeDeps: {
      force: true,
    },

    plugins: [
      tailwindcss(),
      paraglideVitePlugin({
        project: "./project.inlang",
        outdir: "./src/paraglide",
        // Configure locale detection strategy for SSG mode
        strategy: [
          "url", // Primary: URL-based detection (essential for SSG)
          "localStorage", // User preference storage
          "baseLocale", // Fallback to default locale
        ],
        // Disable AsyncLocalStorage for static builds
        disableAsyncLocalStorage: true,
      }),
    ],
  },
  output: "static",
});
