import type { LocaleValues } from "@/types/config";
import type { CollectionEntry } from "astro:content";

export type ProjectCollection = CollectionEntry<"project">;

export type Project = ProjectCollection & {
  locale: LocaleValues;
  slug: string;
  translationKey: string;
};
