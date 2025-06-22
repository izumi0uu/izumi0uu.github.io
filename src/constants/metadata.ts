import { CONFIG_CLIENT } from "@/config/client";
import * as m from "@/paraglide/messages";

import type { Metadata } from "@/types/common";

// can't import getOpenGraphImagePath from image-path.ts here, avoid circular dependency

const { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } = CONFIG_CLIENT;

/** @description Must be url from "public" folder. */
const defaultOgImage = `${SITE_URL}/images/default/default-open-graph-image.jpg`;

const titleSeparator = "-";

const DEFAULT_METADATA: Required<Metadata> = {
  greeting: "",
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
    getGreeting: () => m.greeting_message(),
    getTitle: () => m["pages.home.title"](),
    getDescription: () => m["pages.home.description"](),
  },
  about: {
    getTitle: () => m["pages.about.title"](),
    getDescription: () => m["pages.about.description"](),
  },
  lists: {
    getTitle: () => m["pages.lists.title"](),
    getDescription: () => m["pages.lists.description"](),
  },
  /**
   * @description list pages
   * must have 'list' prefix to omit type arg,
   * for the sake of simplifying type parameter handling
   * and helping to distinguish different types of pages in the Open Graph image generation system（API）
   */
  "lists/blog": {
    getTitle: () => m["pages.lists.blog.title"](),
    getDescription: () => m["pages.lists.blog.description"](),
  },
  "lists/blog/tags": {
    getTitle: () => m["pages.lists.blog.tags.title"](),
  },
  // 'src/pages/blog/tags/[tag]/[...page].astro' // dynamic tag param
  "lists/blog/tags/tag": {
    getTitle: () => m["pages.lists.blog.tags.tag_title"](),
  },
  "lists/blog/explore": {
    getTitle: () => m["pages.lists.blog.explore.title"](),
  },
  "lists/blog/categories": {
    getTitle: () => m["pages.lists.blog.categories.title"](),
  },
  // src/pages/blog/categories/[category]/[...page].astro
  "lists/blog/categories/category": {
    getTitle: () => m["pages.lists.blog.categories.category_title"](),
  },
  "lists/project": {
    getTitle: () => m["pages.lists.project.title"](),
    getDescription: () => m["pages.lists.project.description"](),
  },
  "lists/experience": {
    getTitle: () => m["pages.lists.experience.title"](),
  },
  "lists/links": {
    getTitle: () => m["pages.lists.links.title"](),
  },
  "lists/links/link": {
    getTitle: () => m["pages.lists.links.link_title"](),
  },
  "404": {
    getTitle: () => m["pages.404.title"](),
    getDescription: () => m["pages.404.description"](),
  },
} as const;

const OG_IMAGE_PREFIXES = {
  OG_BLOG: "blog",
  OG_PROJECT: "project",
  OG_PAGES: "pages",
  OG_LISTS: "lists",
  OG_EXPERIENCE: "experience",
} as const;

export { DEFAULT_METADATA, PAGE_METADATA, titleSeparator, OG_IMAGE_PREFIXES };
