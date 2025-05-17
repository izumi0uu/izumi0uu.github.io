import sitemap, { ChangeFreqEnum } from "@astrojs/sitemap";

import { PROCESS_ENV } from "../../config/process-env";
import { ROUTES } from "../../constants/routes";

const { SITE_URL } = PROCESS_ENV;

// imported in astro.config.ts
// !must not use CONFIG, but process-env.ts
// (because sitemap needs to know the root URL to generate absolute links for all pages)

/** generated at build-time only */
const sitemapIntegration = () =>
  sitemap({
    serialize: (item) => {
      if (item.url.endsWith(SITE_URL)) {
        item.priority = 1.0;
        // google can access it with '/'
      } else if (item.url.endsWith(`${SITE_URL}${ROUTES.BLOG}`)) {
        item.changefreq = "daily" as ChangeFreqEnum;
        item.priority = 0.9;
      }
      return item;
    },
  });

export { sitemapIntegration };
