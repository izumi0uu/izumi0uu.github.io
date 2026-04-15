import { getCollection } from "astro:content";

import { SUPPORTED_LOCALES } from "@/config/i18n";
import { isProd } from "@/utils/system/environment";
import { isPreviewMode } from "@/utils/system/preview";

import type { LocaleValues } from "@/types/config";
import type { CollectionEntry, CollectionKey } from "astro:content";

/*-------------------------------- all entries ------------------------------*/

export interface GetAllEntriesOptions {
  skipSort?: boolean;
  includeDrafts?: boolean;
}

/**
 * Sorts by publishDate desc by default. Newest on top.
 * Omits drafts by default - set by PREVIEW_MODE env var.
 *
 * ONLY place to filter draft posts and projects.
 */
const getAllEntries = async <T extends CollectionKey>(
  collectionName: T,
  options?: GetAllEntriesOptions
): Promise<CollectionEntry<T>[]> => {
  const { skipSort = false, includeDrafts = isPreviewMode() } = options ?? {};

  const entries = await getCollection<T>(collectionName, ({ data }) => {
    const isProdAndDraft = isProd && data.draft;
    return !isProdAndDraft || includeDrafts;
  });

  if (skipSort) return entries;

  const sortedEntries = sortEntriesByDateDesc(entries);
  return sortedEntries;
};

/*-------------------------- sort by updatedDate or publishDate ------------------------*/

// just for sorting
const getEntryLastDate = <T extends CollectionKey>(entry: CollectionEntry<T>): Date =>
  entry.data.updatedDate ?? entry.data.publishDate;

const sortEntriesByDateDesc = <T extends CollectionKey>(entries: CollectionEntry<T>[]) =>
  entries.slice().sort((a, b) => getEntryLastDate(b).valueOf() - getEntryLastDate(a).valueOf());

/*------------------------- lastAccessDate for components -----------------------*/

interface EntryDates {
  publishDate: Date;
  updatedDate?: Date;
}
interface EntryDatesResult {
  lastAccessDate: Date;
  isUpdatedDate: boolean;
}

interface YearSlugRouteParams {
  year: string;
  slug: string;
}

const getPublishedOrUpdatedDate = ({ publishDate, updatedDate }: EntryDates): EntryDatesResult => {
  const result = {
    lastAccessDate: updatedDate ?? publishDate,
    isUpdatedDate: Boolean(updatedDate),
  };

  return result;
};

/*------------------------- for content layer -----------------------*/

/**
 * 从带 locale 前缀的内容 ID 中提取 locale。
 * 例如: en/2026/my-post -> en
 */
const getEntryLocaleFromId = (id: string): LocaleValues => {
  const [locale] = id.split("/");

  if (SUPPORTED_LOCALES.includes(locale as LocaleValues)) {
    return locale as LocaleValues;
  }

  throw new Error(`Unknown locale prefix in content id: ${id}`);
};

/**
 * 从带 locale 前缀的内容 ID 中提取 slug。
 * 例如: en/2026/my-post -> 2026/my-post
 */
const getEntrySlugFromId = (id: string): string => {
  const [, ...slugSegments] = id.split("/");
  return slugSegments.join("/").replace(/\.mdx$/, "");
};

/**
 * 将内容 slug 规范化为固定的年份/slug 两段路由参数。
 * 如果未来内容层改成更深层级，这里会在构建期直接报错，避免静默产出错误页面。
 */
const getYearSlugRouteParams = (slug: string, entryId?: string): YearSlugRouteParams => {
  const segments = slug.split("/").filter(Boolean);

  if (segments.length !== 2) {
    const identifier = entryId ? ` for content entry "${entryId}"` : "";
    throw new Error(
      `Expected a year/slug content path${identifier}, but received "${slug}".`
    );
  }

  const [year, slugSegment] = segments;

  return {
    year,
    slug: slugSegment,
  };
};

/**
 * 将内容条目扩展为 locale-aware 结构。
 * @param item 包含id属性的对象
 * @returns 添加了 locale、slug、translationKey 属性的对象
 */
const toLocalizedEntry = <T extends { id: string; data: { translationKey: string } }>(
  item: T
): T & { locale: LocaleValues; slug: string; translationKey: string } => {
  return Object.assign(item, {
    locale: getEntryLocaleFromId(item.id),
    slug: getEntrySlugFromId(item.id),
    translationKey: item.data.translationKey,
  });
};

export {
  getAllEntries,
  getEntryLastDate,
  sortEntriesByDateDesc,
  getPublishedOrUpdatedDate,
  getEntryLocaleFromId,
  getEntrySlugFromId,
  getYearSlugRouteParams,
  toLocalizedEntry,
  type EntryDates,
  type EntryDatesResult,
  type YearSlugRouteParams,
};
