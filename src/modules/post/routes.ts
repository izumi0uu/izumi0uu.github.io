import { ROUTES } from "@/constants/routes";
import { getPathWithLocale } from "@/utils/routing/paths";

import type { LocaleValues } from "@/types/config";

export const getBlogExplorePath = (locale: LocaleValues) => getPathWithLocale(locale, ROUTES.EXPLORE);

export const getBlogTagIndexPath = (locale: LocaleValues) =>
  getPathWithLocale(locale, ROUTES.EXPLORE_TAGS);

export const getBlogCategoryIndexPath = (locale: LocaleValues) =>
  getPathWithLocale(locale, ROUTES.EXPLORE_CATEGORIES);

export const getBlogTagPagePath = (
  locale: LocaleValues,
  tag: string,
  pageNumber: number = 1
) =>
  pageNumber === 1
    ? getPathWithLocale(locale, `${ROUTES.EXPLORE_TAGS}${tag}`)
    : getPathWithLocale(locale, `${ROUTES.EXPLORE_TAGS}${tag}/${pageNumber}/`);

export const getBlogCategoryPagePath = (
  locale: LocaleValues,
  category: string,
  pageNumber: number = 1
) =>
  pageNumber === 1
    ? getPathWithLocale(locale, `${ROUTES.EXPLORE_CATEGORIES}${category}`)
    : getPathWithLocale(locale, `${ROUTES.EXPLORE_CATEGORIES}${category}/${pageNumber}/`);
