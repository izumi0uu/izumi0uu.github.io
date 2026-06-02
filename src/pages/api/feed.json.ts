import { FEED_METADATA, getFeedItems } from "@/utils/content/feed";

export async function GET() {
  const items = await getFeedItems();

  const payload = {
    version: "https://jsonfeed.org/version/1.1",
    title: FEED_METADATA.title,
    description: FEED_METADATA.description,
    home_page_url: FEED_METADATA.homePageUrl,
    feed_url: FEED_METADATA.feedJsonUrl,
    authors: [FEED_METADATA.author],
    items: items.map((item) => ({
      id: item.id,
      url: item.url,
      title: item.title,
      content_text: item.description,
      summary: item.description,
      date_published: item.publishedAt,
      date_modified: item.updatedAt,
      language: item.locale,
      tags: item.category ? [item.category, ...item.tags] : item.tags,
    })),
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
    },
  });
}
