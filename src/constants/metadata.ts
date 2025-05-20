import { CONFIG_CLIENT } from "@/config/client";
import * as m from "@/paraglide/messages"; // 导入 Paraglide 生成的消息

import type { Metadata } from "@/types/common";
// ValueUnion 和其他相关类型可能需要根据新的结构调整，暂时注释
// import type { ValueUnion } from "@/types/utils";

// can't import getOpenGraphImagePath from image-path.ts here, avoid circular dependency

const { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } = CONFIG_CLIENT;

/** @description Must be url from "public" folder. */
const defaultOgImage = `${SITE_URL}/images/default/default-open-graph-image.jpg`;

const titleSeparator = "-";

const DEFAULT_METADATA: Required<Metadata> = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  image: defaultOgImage,
} as const;

/**
 * @description used for ogImage api route and metadata for all pages that aren't defined in markdown frontmatter.
 * Add it here for every new page.
 * Values are functions that return localized strings using ParaglideJS.
 */
const PAGE_METADATA = {
  "": {
    getTitle: () => m.page_home_title(),
    getDescription: () => m.page_home_description(),
  },
  about: {
    getTitle: () => m.page_about_title(),
    getDescription: () => m.page_about_description(),
  },
  lists: {
    getTitle: () => m.page_lists_title(),
    getDescription: () => m.page_lists_description(),
  },
} as const; // 使用 as const 确保 getTitle, getDescription 等键的类型是精确的函数签名

export { DEFAULT_METADATA, PAGE_METADATA, titleSeparator };
