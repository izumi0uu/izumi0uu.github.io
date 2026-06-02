import { ROUTES } from "@/constants/routes";
import { getPathWithLocale } from "@/utils/routing/paths";

import type { LocaleValues } from "@/types/config";
import type { Filter, FilterLink, PostCollection } from "@/types/post";

type PostWithTags = Pick<PostCollection, "data">;

export const getAllTags = (posts: readonly PostWithTags[]): string[] =>
  posts.flatMap((post) => post.data.tags ?? []);

export const getUniqueTags = (posts: readonly PostWithTags[]): string[] =>
  [...new Set(getAllTags(posts))];

export const getSortedUniqueTagsWithCount = (posts: readonly PostWithTags[]): Filter[] => {
  const tags = getAllTags(posts);

  if (!(tags.length > 0)) return [];

  return getUniqueTags(posts)
    .map((tag) => ({
      text: tag,
      count: tags.filter((item) => item === tag).length,
    }))
    .sort((left, right) => right.count - left.count || left.text.localeCompare(right.text));
};

export const getTagLinks = (
  locale: LocaleValues,
  posts: readonly PostWithTags[]
): FilterLink[] =>
  getSortedUniqueTagsWithCount(posts).map(({ text, count }) => ({
    href: getPathWithLocale(locale, `${ROUTES.EXPLORE_TAGS}${text}`),
    text,
    count,
    textWithCount: `${text} ${count}`,
  }));
