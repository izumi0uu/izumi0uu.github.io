/**
 * 从 Astro 提供的客户端环境模块导入公共环境变量
 * 这些变量是在 `astro.config.ts` 的 `AstroEnvSchema` 中标记为 `access: 'public'` 并且 `context: 'client'` 的变量。
 * Astro 会在构建时将这些变量的值注入到客户端代码中，确保敏感信息不会泄露。
 */

import { PLAUSIBLE_DOMAIN, PLAUSIBLE_SCRIPT_URL, SITE_URL } from "astro:env/client";

import { configClientSchema } from "@/schemas/config";
import { validateData } from "@/utils/data/validation";

import type { ConfigClientType } from "@/types/config";

const configClientData: ConfigClientType = {
  /**
   * @description 定义客户端代码可以安全访问的配置常量和环境变量。
   * 这个文件整合了从 Astro 环境模块 (`astro:env/client`) 获取的公共环境变量
   * 和一些硬编码的客户端常量，并使用 Zod schema 进行校验。
   */
  PLAUSIBLE_DOMAIN,
  PLAUSIBLE_SCRIPT_URL,
  SITE_URL,
  // for SEO
  SITE_URL_CANONICAL: "https://izumi0uu.com",
  SITE_TITLE: "izumi0uu",
  SITE_DESCRIPTION: "Izumi0uu's Blog",
  PAGE_SIZE_POST_CARD: 3,
  PAGE_SIZE_POST_CARD_SMALL: 6,
  PAGE_SIZE_PROJECT_CARD: 6,
  MORE_POSTS_COUNT: 3,
  DEFAULT_MODE: "light",
  DEFAULT_THEME: "wine-light",
  AUTHOR_NAME: "izumi0uu",
  AUTHOR_EMAIL: "izumi0uu@gmail.com",
  AUTHOR_GITHUB: "https://github.com/izumi0uu",
  AUTHOR_LINKEDIN: "https://www.linkedin.com/in/izumi0uu",
  AUTHOR_TWITTER: "https://x.com/izumi0uu",
  AUTHOR_YOUTUBE: "https://www.youtube.com/@izumi0uu",
  REPO_URL: "https://github.com/izumi0uu/izumi0uu.github.io",
  AUTHOR_AVATAR: "https://avatars.githubusercontent.com/u/izumi0uu",
  AUTHOR_DESCRIPTION: "a developer who loves technology and user experience.",
  AUTHOR_FACEBOOK: "https://facebook.com/izumi0uu",
  AUTHOR_INSTAGRAM: "https://instagram.com/izumi0uu",
  AUTHOR_BILIBILI: "https://space.bilibili.com/izumi0uu",
};

const CONFIG_CLIENT = validateData(configClientData, configClientSchema);

export { CONFIG_CLIENT };
