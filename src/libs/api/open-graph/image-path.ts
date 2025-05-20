import { OG_IMAGE_PREFIXES } from "@/constants/metadata";
import { ROUTES } from "@/constants/routes";
import { getPages } from "@/libs/api/open-graph/pages";
import { removeLeadingAndTrailingSlashes } from "@/utils/routing/paths";

import type { OgImagePrefixType } from "@/constants/metadata";
