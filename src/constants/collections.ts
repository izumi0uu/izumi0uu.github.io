import { DEFAULT_METADATA } from "@/constants/metadata";

// 使用字符串路径而不是导入的图片对象
// import DefaultPostHeroImage from "@/assets/images/post-default.jpg";
// import DefaultProjectHeroImage from "@/assets/images/project-default.jpg";

const BASE_FOLDERS = {
  POST: "src/content/post",
  PROJECT: "src/content/project",
} as const;

const COLLECTIONS = {
  POST: "post",
  PROJECT: "project",
} as const;

/**
 * 统一的标签体系 - 按技术分类组织
 * 命名规范: 全小写，连字符分隔，保持简洁一致
 */
const TAGS = [
  // === 编程语言 ===
  "javascript",
  "typescript",
  "python",
  "java",
  "rust",
  "go",

  // === 前端框架/库 ===
  "react",
  "next-js",
  "astro",
  "vue",
  "svelte",
  "solid-js",

  // === 状态管理 ===
  "redux",
  "redux-toolkit",
  "zustand",
  "jotai",
  "react-query",
  "swr",

  // === 路由 ===
  "react-router",
  "next-router",

  // === 样式/UI ===
  "css",
  "tailwindcss",
  "styled-components",
  "emotion",
  "radix-ui",
  "shadcn-ui",
  "material-ui",
  "chakra-ui",
  "gasp",
  "framer-motion",
  "paraglide-js",

  // === 构建工具 ===
  "vite",
  "webpack",
  "rollup",
  "parcel",
  "esbuild",
  "turbopack",

  // === 后端/运行时 ===
  "node-js",
  "deno",
  "bun",
  "express",
  "fastify",
  "nestjs",

  // === 数据库 ===
  "postgresql",
  "mysql",
  "mongodb",
  "sqlite",
  "redis",
  "prisma",
  "drizzle",

  // === 云服务/平台 ===
  "vercel",
  "netlify",
  "cloudflare",
  "supabase",
  "firebase",
  "aws",

  // === 开发工具 ===
  "docker",
  "kubernetes",
  "github-actions",
  "jest",
  "vitest",
  "playwright",
  "storybook",

  // === Web APIs/浏览器 ===
  "web-api",
  "browser-extension",
  "service-worker",
  "indexeddb",
  "geolocation-api",
  "web-components",

  // === 区块链/Web3 ===
  "blockchain",
  "ethereum",
  "solidity",
  "solana",
  "web3",
  "smart-contracts",
  "defi",
  "nft",

  // === 移动端 ===
  "react-native",
  "expo",
  "tauri",
  "electron",

  // === 桌面应用 ===
  "javafx",
  "swing",
  "tauri",
  "electron",

  // === 构建/包管理 ===
  "npm",
  "yarn",
  "pnpm",
  "maven",
  "gradle",

  // === 概念/方法论 ===
  "web-development",
  "full-stack",
  "frontend",
  "backend",
  "devops",
  "microservices",
  "serverless",
  "jamstack",

  // === 内容/工具 ===
  "markdown",
  "mdx",
  "cms",
  "blog",
  "portfolio",
  "tutorial",
  "guide",
  "tips",
  "showcase",

  // === Astro 生态 ===
  "astro-content",
  "astro-plugins",
  "astro-integrations",
  "remark",
  "rehype",
] as const;

/** adjust this later */
const CATEGORIES = [
  // add color here
  // extract find function
  {
    name: "tutorials",
    icon: "mdi:teach",
  },
  {
    name: "tips-and-tricks",
    icon: "mdi:lightbulb-outline",
  },
  {
    name: "news",
    icon: "mdi:announcement-outline",
  },
  {
    name: "showcases",
    icon: "mdi:presentation",
  },
  {
    name: "video",
    icon: "mdi:video-outline",
  },
  {
    name: "tools",
    icon: "mdi:tools",
  },
  {
    name: "resources",
    icon: "mdi:book-open-variant-outline",
  },
] as const;

// 使用字符串路径作为默认值
const DEFAULTS_POST = {
  TITLE: DEFAULT_METADATA.title,
  DESCRIPTION: DEFAULT_METADATA.description,
  NO_HERO: false,
  HERO_IMAGE: "@/assets/images/post-default.jpg",
  HERO_ALT: "Default post hero image",
  DRAFT: false,
  CATEGORY: CATEGORIES[0].name,
  TOC: true,
} as const;

const DEFAULTS_PROJECT = {
  TITLE: DEFAULT_METADATA.title,
  DESCRIPTION: DEFAULT_METADATA.description,
  NO_HERO: false,
  HERO_IMAGE: "@/assets/images/project-default.jpg",
  HERO_ALT: "Default project hero image",
  DRAFT: false,
  CATEGORY: CATEGORIES[0].name,
  TOC: true,
} as const;

export { BASE_FOLDERS, COLLECTIONS, DEFAULTS_POST, DEFAULTS_PROJECT, TAGS, CATEGORIES };
