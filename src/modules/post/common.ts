import { render } from "astro:content";

import { getAllEntries, idToSlug } from "@/modules/common";
import { COLLECTIONS } from "@/constants/collections";

import type { Post, PostCollection } from "@/types/post";

/** Sorted posts. */
export const getAllPosts = (): Promise<PostCollection[]> => getAllEntries(COLLECTIONS.POST);

export const getPostsWithReadingTimeFromPosts = async (
  posts: PostCollection[]
): Promise<Post[]> => {
  const readingTimePromises = posts.map(async (post) => {
    // TODO: FIX:receive plugin data here
    const { remarkPluginFrontmatter, ...rest } = await render(post);
    console.log("rest", rest);
    const { readingTime } = remarkPluginFrontmatter;
    return { readingTime };
  });
  const readingTimes = await Promise.all(readingTimePromises);

  // other frontmatter props are in post.data...
  // readingTimes is in post.readingTimes
  const postsWithReadingTimeAndSlug = posts.map((post, index) => ({
    ...idToSlug(post),
    ...readingTimes[index],
  }));

  return postsWithReadingTimeAndSlug;
};

/**
 * @description Prefer over getAllPosts()
 * From this point Post[](getAllPostsWithReadingTime) instead of CollectionEntry<'post'>[](getAllPosts).
 * custom type like slug, readingTime added, etc.
 */
export const getAllPostsWithReadingTime = async (): Promise<Post[]> => {
  const posts = await getPostsWithReadingTimeFromPosts(await getAllPosts());
  return posts;
};
