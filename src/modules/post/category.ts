import { CATEGORIES } from "@/constants/collections";
import { ROUTES } from "@/constants/routes";
import { getPathWithLocale } from "@/utils/routing/paths";

import type { LocaleValues } from "@/types/config";
import type { CategoryType } from "@/types/constants";
import type { Filter, FilterLink, PostCollection } from "@/types/post";

type PostWithCategory = Pick<PostCollection, "data">;

export const getAllCategories = (posts: readonly PostWithCategory[]): string[] =>
  posts.map((post) => post.data.category).filter(Boolean) as string[];

export const getUniqueCategories = (posts: readonly PostWithCategory[]): string[] => {
  const uniqueCategories = [...new Set([...getAllCategories(posts)])];
  return uniqueCategories;
};

export const getSortedUniqueCategoriesWithCount = (posts: readonly PostWithCategory[]): Filter[] => {
  const categories = getAllCategories(posts);
  if (!(categories.length > 0)) return [];

  const uniqueCategories = getUniqueCategories(posts);

  const categoriesWithCount = uniqueCategories.map((category) => {
    const count = categories.filter((item) => item === category).length;
    return { text: category, count };
  });

  const sortedCategoriesWithCount = categoriesWithCount
    .slice()
    .sort((a, b) => b.count - a.count || a.text.localeCompare(b.text));
  return sortedCategoriesWithCount;
};

export const getCategoryLinks = (
  locale: LocaleValues,
  posts: readonly PostWithCategory[]
): FilterLink[] => {
  const filterItems = getSortedUniqueCategoriesWithCount(posts);

  return filterItems.map(({ text, count }) => ({
    href: getPathWithLocale(locale, `${ROUTES.EXPLORE_CATEGORIES}${text}`),
    text,
    count,
    textWithCount: `${text} ${count}`,
  }));
};

const defaultCategory = CATEGORIES[0];

/** set default to prevent breaking build */
export const getCategoryProps = (categoryName: string): CategoryType =>
  CATEGORIES.find((item) => item.name === categoryName) ?? defaultCategory;
