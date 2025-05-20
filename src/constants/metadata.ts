import { CONFIG_CLIENT } from "@/config/client";

import type { Metadata } from "@/types/common";
import type { ValueUnion } from "@/types/utils";

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
 */
const PAGE_METADATA = {
  "": {
    title: "Home",
    description: "Home",
  },
  "about": {
    title: "About",
    description: "About",
  },
  "lists"
};



export { DEFAULT_METADATA, PAGE_METADATA, titleSeparator };
