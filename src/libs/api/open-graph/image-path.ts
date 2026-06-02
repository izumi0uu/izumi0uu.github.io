import { ROUTES } from "@/constants/routes";

/**
 * @description return an existing fallback open graph image from the public directory.
 * Page-level content can still override this by passing a specific metadata.image.
 */
const getOpenGraphImagePath = (_path: string): string => {
  return ROUTES.STATIC.DEFAULT_OG_IMAGE;
};

export { getOpenGraphImagePath };
