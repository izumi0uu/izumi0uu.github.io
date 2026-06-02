import { CONFIG_CLIENT } from "@/config/client";
import { ROUTES } from "@/constants/routes";
import { getAllPostsWithReadingTime } from "@/modules/post/common";
import { getPathWithLocale } from "@/utils/routing/paths";

type FeedItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  locale: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  category?: string;
};

const { AUTHOR_NAME, AUTHOR_EMAIL, SITE_DESCRIPTION, SITE_TITLE, SITE_URL_CANONICAL } = CONFIG_CLIENT;

const getAbsoluteUrl = (path: string) => new URL(path, SITE_URL_CANONICAL).toString();

const getFeedItems = async (): Promise<FeedItem[]> => {
  const posts = await getAllPostsWithReadingTime();

  return posts.map((post) => {
    const path = getPathWithLocale(post.locale, `${ROUTES.BLOG}${post.slug}`);
    const publishedAt = post.data.publishDate.toISOString();
    const updatedAt = (post.data.updatedDate ?? post.data.publishDate).toISOString();

    return {
      id: `${post.locale}:${post.slug}`,
      title: post.data.title,
      description: post.data.description ?? SITE_DESCRIPTION,
      url: getAbsoluteUrl(path),
      locale: post.locale,
      publishedAt,
      updatedAt,
      tags: post.data.tags ?? [],
      category: post.data.category,
    };
  });
};

const FEED_METADATA = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  homePageUrl: SITE_URL_CANONICAL,
  feedJsonUrl: getAbsoluteUrl(ROUTES.API.FEED_JSON),
  feedRssUrl: getAbsoluteUrl(ROUTES.API.FEED_RSS),
  author: {
    name: AUTHOR_NAME,
    email: AUTHOR_EMAIL,
  },
} as const;

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

export { FEED_METADATA, escapeXml, getFeedItems };
export type { FeedItem };
