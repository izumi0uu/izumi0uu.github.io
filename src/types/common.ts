import type { COLLECTIONS } from "@/constants/collections";
import type { LocaleValues } from "@/types/config";

import type { Page } from "astro";
import type { Image } from "astro:assets";
import type { CollectionEntry } from "astro:content";
import type { ComponentProps } from "astro/types";

type CollectionType = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];

type AnyCollection = CollectionEntry<CollectionType>;

interface Metadata {
  greeting?: string;
  title: string;
  description?: string;
  /** Must be url. */
  image?: string;
  author?: string;
}

interface PaginationProps
  extends Pick<
    Page<AnyCollection>,
    "url" | "currentPage" | "lastPage" | "start" | "end" | "total"
  > {}

interface LocaleAlternate {
  locale: LocaleValues;
  href: string;
}

interface LocaleSwitchTarget {
  currentLocale: LocaleValues;
  targetLocale: LocaleValues;
  href: string;
  missingTranslation: boolean;
}

type AstroImageProps = ComponentProps<typeof Image>;

export type {
  CollectionType,
  AnyCollection,
  Metadata,
  PaginationProps,
  AstroImageProps,
  LocaleAlternate,
  LocaleSwitchTarget,
};
