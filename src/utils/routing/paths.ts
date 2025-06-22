import { type FilterParams, type FilterType } from "@/types/post";
import { VALID_FILTER_KEYS, FILTER_CONFIG } from "@/types/post";
import { getLocale } from "@/paraglide/runtime";
import { DEFAULT_LOCALE } from "@/config/i18n";

/*-------------------------------- utils ------------------------------*/

const removeLeadingSlash = (path: string) => path?.replace(/^\/+/g, "");

const removeTrailingSlash = (path: string) => path?.replace(/\/+$/g, "");

const removeLeadingAndTrailingSlashes = (path: string) => path?.replace(/^\/+|\/+$/g, "");

/**
 * 将路径与当前语言标签结合
 * @param path 目标路径，例如 "/blog/"
 * @returns 带有语言标签的路径，例如 "/zh/blog/"
 */
const getPathWithLocale = (path: string): string => {
  try {
    // 获取当前语言
    const locale = getLocale();

    // 确保路径格式正确
    let cleanPath = path;
    if (!cleanPath.startsWith("/")) cleanPath = `/${cleanPath}`;

    // 移除可能存在的多余斜杠
    cleanPath = removeLeadingSlash(cleanPath);

    // 构建最终路径
    return `/${locale}/${cleanPath}`;
  } catch (error) {
    console.error("Error in getPathWithLocale:", error);
    // 如果无法获取当前语言，使用默认语言
    const cleanPath = removeLeadingSlash(path);
    return `/${DEFAULT_LOCALE}/${cleanPath}`;
  }
};

/*----------------------------- for Explore filter ---------------------------*/

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
};
