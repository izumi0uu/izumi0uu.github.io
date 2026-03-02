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

const TAGS = [
  "javascript",
  "typescript",
  "python",
  "java",
  "rust",
  "go",

  "react",
  "next.js",
  "astro",
  "vue",
  "svelte",
  "solid-js",

  "redux",
  "redux-toolkit",
  "zustand",
  "jotai",
  "react-query",
  "swr",

  "react-router",
  "next-router",

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

  "vite",
  "webpack",
  "rollup",
  "parcel",
  "esbuild",
  "turbopack",

  "node-js",
  "deno",
  "bun",
  "express",
  "fastify",
  "nestjs",

  "postgresql",
  "mysql",
  "mongodb",
  "sqlite",
  "redis",
  "prisma",
  "drizzle",

  "vercel",
  "netlify",
  "cloudflare",
  "supabase",
  "firebase",
  "aws",

  "docker",
  "kubernetes",
  "github-actions",
  "jest",
  "vitest",
  "playwright",
  "storybook",
  "cms",
  "strapi",

  "web-api",
  "browser-extension",
  "service-worker",
  "indexeddb",
  "geolocation-api",
  "web-components",

  "blockchain",
  "ethereum",
  "solidity",
  "solana",
  "web3",
  "slippage",
  "MEV",
  "smart-contracts",
  "pumpfun",
  "instruction",
  "defi",
  "nft",
  "foundry",
  "ethers.js",

  "react-native",
  "expo",
  "tauri",
  "electron",

  "javafx",
  "java-swing",
  "java-awt",
  "tauri",
  "electron",

  "npm",
  "yarn",
  "pnpm",
  "maven",
  "gradle",

  "web-development",
  "full-stack",
  "frontend",
  "backend",
  "devops",
  "microservices",
  "serverless",
  "jamstack",

  "markdown",
  "mdx",
  "cms",
  "blog",
  "portfolio",
  "tutorial",
  "guide",
  "tips",
  "showcase",

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
