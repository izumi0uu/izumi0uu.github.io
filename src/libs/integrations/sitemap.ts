import sitemap, { ChangeFreqEnum } from "@astrojs/sitemap";

import { PROCESS_ENV } from "../../config/process-env";
import { DEFAULT_LOCALE } from "../../config/i18n";
import { ROUTES } from "../../constants/routes";

const { SITE_URL } = PROCESS_ENV;
const defaultLocaleHomePath = `/${DEFAULT_LOCALE}/`;

// imported in astro.config.ts
// !must not use CONFIG, but process-env.ts
// (because sitemap needs to know the root URL to generate absolute links for all pages)

/** generated at build-time only */
const sitemapIntegration = () =>
  sitemap({
    filter: (page) => new URL(page).pathname !== "/",
    serialize: (item) => {
      const { pathname } = new URL(item.url);

      if (pathname === defaultLocaleHomePath) {
        item.priority = 1.0;
      } else if (pathname.endsWith(ROUTES.BLOG)) {
        item.changefreq = "daily" as ChangeFreqEnum;
        item.priority = 0.9;
      }
      return item;
    },
  });

export { sitemapIntegration };
