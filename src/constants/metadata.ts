import { CONFIG_CLIENT } from "@/config/client";

import type { Metadata } from "@/types/common";
import type { ValueUnion } from "@/types/utils";

const { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } = CONFIG_CLIENT;

const DEFAULT_METADATA = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  image: "/og-image.png",
};

const PAGE_METADATA = {
  "": {
    title: "Home",
    description: "Home",
    image: "/og-image.png",
  },
};

const titleSeparator = "|";

export { DEFAULT_METADATA, PAGE_METADATA, titleSeparator };
