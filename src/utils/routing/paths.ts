import { ROUTES } from "@/constants/routes";

import { type FilterParams, type FilterType } from "@/types/post";

import { VALID_FILTER_KEYS, FILTER_CONFIG } from "@/types/post";

/*-------------------------------- utils ------------------------------*/

const removeLeadingSlash = (path: string) => path.replace(/^\/+/g, "");

const removeTrailingSlash = (path: string) => path.replace(/\/+$/g, "");

const removeLeadingAndTrailingSlashes = (path: string) =>
  path.replace(/^\/+|\/+$/g, "");

/*----------------------------- for Explore filter ---------------------------*/

const getPathnameFromFilterParams = (
  filterParams: FilterParams
): string | undefined => {
  const { filterType, filterSlug } = filterParams;

  if (!(filterType && VALID_FILTER_KEYS.includes(filterType) && filterSlug))
    return undefined;

  // filterType is optional in FilterParams
  const pathSegment = FILTER_CONFIG[filterType as FilterType].pathSegment;
  const pathname = `${pathSegment}${filterSlug}`;

  return pathname;
};

export {
  removeLeadingSlash,
  removeTrailingSlash,
  removeLeadingAndTrailingSlashes,
  getPathnameFromFilterParams,
};
