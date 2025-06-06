import { DEFAULT_METADATA } from "@/constants/metadata";

import DefaultPostHeroImage from "@/assets/images/post-default.jpg";
import DefaultProjectHeroImage from "@/assets/images/project-default.jpg";

const BASE_FOLDERS = {
  POST: "src/content/post",
  PROJECT: "src/content/project",
} as const;

const COLLECTIONS = {
  POST: "post",
  PROJECT: "project",
} as const;

const TAGS = [
  "next.js",
  "react",
  "astro",
  "node.js",
  "javascript",
  "css",
  "ethereum",
  "solidity",
  "solana",
  "python",
  "docker",
  "self-hosting",
  "web-development",
  "web-design",
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

// use imported images here
const DEFAULTS_POST = {
  TITLE: DEFAULT_METADATA.title,
  DESCRIPTION: DEFAULT_METADATA.description,
  NO_HERO: false,
  HERO_IMAGE: DefaultPostHeroImage,
  HERO_ALT: "Default post hero image",
  DRAFT: false,
  CATEGORY: CATEGORIES[0].name,
  TOC: true,
} as const;

const DEFAULTS_PROJECT = {
  TITLE: DEFAULT_METADATA.title,
  DESCRIPTION: DEFAULT_METADATA.description,
  NO_HERO: false,
  HERO_IMAGE: DefaultProjectHeroImage,
  HERO_ALT: "Default project hero image",
  DRAFT: false,
  CATEGORY: CATEGORIES[0].name,
  TOC: true,
} as const;

export { BASE_FOLDERS, COLLECTIONS, DEFAULTS_POST, DEFAULTS_PROJECT, TAGS, CATEGORIES };
