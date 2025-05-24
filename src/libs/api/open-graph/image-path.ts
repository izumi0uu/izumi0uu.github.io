import { OG_IMAGE_PREFIXES } from "@/constants/metadata";
import { ROUTES } from "@/constants/routes";
// import { getPages } from "@/libs/api/open-graph/page";
import { removeLeadingAndTrailingSlashes } from "@/utils/routing/paths";

import type { OgImagePrefixType } from "@/types/constants";

/**
 * @description return open graph image url path
 * @example /blog/my-cool-post -> /api/open-graph/blog/my-cool-post.png
 */
const getOpenGraphImagePath = (path: string): string => {
  // for error handling
  const _prefix = getPagePrefix(path);

  const trimmedPath = removeLeadingAndTrailingSlashes(path);

  const imagePath = `${ROUTES.API.OG_IMAGES}${trimmedPath}.png`;

  // TODO: maybe, makes metadata async

  // if no image is pre-rendered set 404 image
  // const doesOgImageExists = await isExistingOgImage(trimmedPath);
  // if (!doesOgImageExists) imagePath = `${ROUTES.API.OG_IMAGES}pages/404.png`;

  return imagePath;
};

/** @description return page prefix and validate it
 * @example /blog/posts/1 -> blog
 * @example "" (homepage) -> pages
 */
const getPagePrefix = (path: string): OgImagePrefixType => {
  const trimmedPath = removeLeadingAndTrailingSlashes(path);

  // Handle homepage case
  if (trimmedPath === "" || trimmedPath === "/") {
    return "pages" as OgImagePrefixType;
  }

  let prefix = trimmedPath.split("/")[0];
  prefix = removeLeadingAndTrailingSlashes(prefix);

  // must not be in global scope
  // reasons: avoid circular dependency risk, module loading order problem, build error
  const prefixes = Object.values(OG_IMAGE_PREFIXES) as string[];

  if (!prefixes.includes(prefix)) {
    const message = `Unknown path prefix requested: ${prefix}`;
    console.error(message);
    throw new Error(message);
  }

  return prefix as OgImagePrefixType;
};

/** @description check if the open graph image exists
 * use pageId(custom frontmatter identifier): page404 from frontmatter instead in Page layout
 * not used, pre-rendered og images in getStaticPaths
 */
const isExistingOgImage = async (path: string): Promise<boolean> => {
  const trimmedPath = removeLeadingAndTrailingSlashes(path);

  // TODO: implement getPages function or remove this function
  // const pages = await getPages();
  // without leading and trailing '/'
  // const paths = Object.entries(pages).map(([path]) => path);
  // const isExisting = paths.includes(trimmedPath);

  // 临时返回 true，避免构建错误
  return true;
};

export { getOpenGraphImagePath, isExistingOgImage, getPagePrefix };
