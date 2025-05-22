// import type { COLLECTIONS } from "@/constants/collections"; // Commented out due to missing export
import type { Page } from "astro";
import type { Image } from "astro:assets";
import type { CollectionEntry } from "astro:content";
import type { ComponentProps } from "astro/types";

// type CollectionType = (typeof COLLECTIONS)[keyof typeof COLLECTIONS]; // Depends on COLLECTIONS
// type AnyCollection = CollectionEntry<CollectionType>; // Depends on CollectionType

interface Metadata {
  greeting?: string;
  title: string;
  description?: string;
  /** Must be url. */
  image?: string;
}

interface PaginationProps
  extends Pick<
    Page<CollectionEntry<string>>, // Fallback to CollectionEntry<string> if AnyCollection is not available
    "url" | "currentPage" | "lastPage" | "start" | "end" | "total"
  > {}

type AstroImageProps = ComponentProps<typeof Image>;

// export type { CollectionType, AnyCollection, Metadata, PaginationProps, AstroImageProps };
// Adjusted export without CollectionType and AnyCollection due to missing COLLECTIONS definition
export type { Metadata, PaginationProps, AstroImageProps };
