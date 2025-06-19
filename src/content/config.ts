import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

import { postSchema } from "@/schemas/post";
import { projectSchema } from "@/schemas/project";
import { BASE_FOLDERS } from "@/constants/collections";

const { POST, PROJECT } = BASE_FOLDERS;

// TODO: glob() replaced with getCollection(), getEntry()
type GenerateIdFn = Parameters<typeof glob>[0]["generateId"];

/**
 * Format id slug. Remove '/' to avoid catch all [...page].astro route.
 * Convert spaces and special characters to URL-friendly format.
 *
 * e.g filepath: 2024/03-15-example-project-2/index.mdx -> slug: 2024-03-15-example-project-2
 * e.g filepath: 2024/test-post copy 4.mdx -> slug: 2024-test-post-copy-4
 */
const generateId: GenerateIdFn = ({ entry }: { entry: string }) => {
  const slug = entry
    .split("/")
    .slice(0, 2)
    .join("/")
    // 移除 .mdx 后缀
    .replace(/\.mdx$/, "")
    // 将空格转换为连字符
    .replace(/\s+/g, "-")
    // 移除或转换其他特殊字符
    .replace(/[^\w\-\/]/g, "")
    // 移除多余的连字符
    .replace(/-+/g, "-")
    // 移除开头和结尾的连字符
    .replace(/^-+|-+$/g, "");

  return slug;
};

export const postCollection = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: POST,
    generateId,
  }),
  schema: postSchema,
});

export const projectCollection = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: PROJECT,
    generateId,
  }),
  schema: projectSchema,
});

// _schemas folder in collections will be included in type(astro feature)
export const collections = {
  post: postCollection,
  project: projectCollection,
};
