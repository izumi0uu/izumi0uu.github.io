import type { LocalImageProps } from "astro:assets";
import type { THEME_CONFIG, THEMES, MODES } from "@/constants/theme";
import type { OG_IMAGE_PREFIXES, PAGE_METADATA } from "@/constants/metadata";
import type { ValueUnion } from "@/types/utils";
// import type { NAVIGATION_ITEMS } from "@/constants/navigation"; // Temporarily comment out due to linter error
import type { TW_WIDTHS } from "@/constants/image";
// import type { CATEGORIES } from "@/constants/collections"; // Temporarily comment out due to linter error

/**
 * @description type for navigation item
 */
// type NavigationItem = (typeof NAVIGATION_ITEMS)[number]; // Temporarily comment out

/**
 * @description type for category
 */
// type CategoryType = (typeof CATEGORIES)[number]; // Temporarily comment out

/**
 * @description type for theme
 */
type Mode = ValueUnion<typeof MODES>;
type Theme = (typeof THEMES)[number];
type ThemeConfig = typeof THEME_CONFIG;

/**
 * @description type for metadata
 */
type PageMetadataKey = keyof typeof PAGE_METADATA;

/**
 * @description type for individual fixed image configuration
 */
type FixedImageConfig = Required<Pick<LocalImageProps, "width" | "height">> & {
  quality?: "low" | "mid" | "high" | "max" | number;
  loading?: LocalImageProps["loading"];
};

/**
 * @description type for individual responsive image configuration
 */
type ResponsiveImageConfig = Required<Pick<LocalImageProps, "widths" | "sizes">> & {
  quality?: "low" | "mid" | "high" | "max" | number;
  loading?: LocalImageProps["loading"];
  // for debugging
  debugClass?: string;
};

/**
 * @description type for image
 */
type ImageSizes = {
  FIXED: Record<string, FixedImageConfig>;
  RESPONSIVE: Record<string, ResponsiveImageConfig>;
};

/**
 * @description type for change theme custom event
 */
type ChangeThemeCustomEvent = CustomEvent<{ theme: Theme }>;

/**
 * @description type for breakpoint
 */
type Breakpoint = keyof typeof TW_WIDTHS;

/**
 * @description type for open graph image prefix
 */
type OgImagePrefixType = ValueUnion<typeof OG_IMAGE_PREFIXES>;

export type {
  Mode,
  Theme,
  ThemeConfig,
  PageMetadataKey,
  ImageSizes,
  ChangeThemeCustomEvent,
  Breakpoint,
  // NavigationItem, // Temporarily comment out
  // CategoryType, // Temporarily comment out
  OgImagePrefixType,
};
