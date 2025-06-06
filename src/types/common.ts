import type { COLLECTIONS } from "@/constants/collections";

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
}

interface PaginationProps
  extends Pick<
    Page<AnyCollection>,
    "url" | "currentPage" | "lastPage" | "start" | "end" | "total"
  > {}

type AstroImageProps = ComponentProps<typeof Image>;

export type { CollectionType, AnyCollection, Metadata, PaginationProps, AstroImageProps };
