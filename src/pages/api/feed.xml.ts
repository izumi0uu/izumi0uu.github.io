import { FEED_METADATA, escapeXml, getFeedItems } from "@/utils/content/feed";

export async function GET() {
  const items = await getFeedItems();

  const rssItems = items
    .map((item) => {
      const categories = item.category ? [item.category, ...item.tags] : item.tags;

      return `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.url)}</link>
      <guid isPermaLink="true">${escapeXml(item.url)}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${new Date(item.publishedAt).toUTCString()}</pubDate>
      ${categories.map((category) => `<category>${escapeXml(category)}</category>`).join("\n      ")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(FEED_METADATA.title)}</title>
    <link>${escapeXml(FEED_METADATA.homePageUrl)}</link>
    <description>${escapeXml(FEED_METADATA.description)}</description>
    <language>en</language>
    <managingEditor>${escapeXml(FEED_METADATA.author.email)} (${escapeXml(FEED_METADATA.author.name)})</managingEditor>
    <lastBuildDate>${new Date(items[0]?.updatedAt ?? new Date().toISOString()).toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(FEED_METADATA.feedRssUrl)}" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom" />
${rssItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
