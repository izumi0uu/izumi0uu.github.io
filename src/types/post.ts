import { ROUTES } from "@/constants/routes";
import type { CollectionEntry } from "astro:content";

type PostCollection = CollectionEntry<"post">;

/**
 * @description other frontmatter props are in post.data...
 * readingTimes is in post.readingTimes
 */
type Post = PostCollection & {
  readingTime: number;
  slug: PostCollection["id"];
};

interface PostsByTime {
  years: string[];
  months: string[];
  weeks: string[];
  posts: Record<string, Post[]>;
}

// type FilterType = "tags" | "categories";

/** @description matches route param */
const FILTER_CONFIG = {
  tags: {
    // e.g. /blog/explore/tags
    pathSegment: ROUTES.EXPLORE_TAGS,
  },
  categories: {
    pathSegment: ROUTES.EXPLORE_CATEGORIES,
  },
} as const;

/**
 * @description Represents the valid types of filters, derived from FILTER_CONFIG.
 * This ensures that FilterType is always in sync with the defined configurations.
 */
type FilterType = keyof typeof FILTER_CONFIG;

/**
 * @description An array of valid filter type keys, derived from FILTER_CONFIG.
 * Useful for runtime validation.
 */
const VALID_FILTER_KEYS = Object.keys(FILTER_CONFIG) as FilterType[];

/** For both tags and categories. */
interface Filter {
  text: string;
  count: number;
}

interface FilterLink {
  href: string;
  text: string;
  count: number;
  textWithCount: string;
}

interface FilterParams {
  filterType?: FilterType;
  filterSlug?: string;
}

export type { PostCollection, Post, PostsByTime, Filter, FilterType, FilterLink, FilterParams };

export { VALID_FILTER_KEYS, FILTER_CONFIG };
