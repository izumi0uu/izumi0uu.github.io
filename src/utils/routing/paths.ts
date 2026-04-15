import { type FilterParams, type FilterType } from "@/types/post";
import { VALID_FILTER_KEYS, FILTER_CONFIG } from "@/types/post";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/config/i18n";
import type { LocaleValues } from "@/types/config";

/*-------------------------------- utils ------------------------------*/

const removeLeadingSlash = (path: string) => path?.replace(/^\/+/g, "");

const removeTrailingSlash = (path: string) => path?.replace(/\/+$/g, "");

const removeLeadingAndTrailingSlashes = (path: string) => path?.replace(/^\/+|\/+$/g, "");

/**
 * 将路径与当前语言标签结合
 * @param path 目标路径，例如 "/blog/"
 * @returns 带有语言标签的路径，例如 "/zh/blog/"
 */
const getPathWithLocale = (locale: LocaleValues, path: string = "/"): string => {
  const normalizedLocale = SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
  const cleanPath = removeLeadingAndTrailingSlashes(path);

  if (!cleanPath) return `/${normalizedLocale}/`;

  return `/${normalizedLocale}/${cleanPath}`;
};
const stripLocaleFromPathname = (pathname: string): string => {
  const cleanPath = removeLeadingAndTrailingSlashes(pathname);

  if (!cleanPath) return "";

  const [maybeLocale, ...segments] = cleanPath.split("/");

  if (SUPPORTED_LOCALES.includes(maybeLocale as LocaleValues)) {
    return segments.join("/");
  }

  return cleanPath;
};

const replaceLocaleInPathname = (pathname: string, locale: LocaleValues): string =>
  getPathWithLocale(locale, stripLocaleFromPathname(pathname));

const getPathnameFromFilterParams = (filterParams: FilterParams): string | undefined => {
  const { filterType, filterSlug } = filterParams;

  if (!(filterType && VALID_FILTER_KEYS.includes(filterType) && filterSlug)) return undefined;

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
  getPathWithLocale,
  stripLocaleFromPathname,
  replaceLocaleInPathname,
};
