import calculateReadingTime from "reading-time";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toString } from "mdast-util-to-string";

/**
 * Calculate the reading time of a given text -- came from https://jahir.dev/blog/astro-reading-time
 * @param text - The text to calculate the reading time of
 * @returns The reading time in minutes
 */

export const getReadingTime = (text: string): string | undefined => {
  if (!text || text.length === 0) return undefined;

  try {
    const ast = fromMarkdown(text);
    const content = toString(ast);
    const readingTime = calculateReadingTime(content);
    return readingTime.minutes.toFixed(0);
  } catch (error) {
    console.error("Error calculating reading time:", error);
    return undefined;
  }
};
