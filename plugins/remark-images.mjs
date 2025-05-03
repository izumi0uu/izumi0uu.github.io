/**
 * @file remark-images.mjs
 * @description Process Markdown images (e.g., making them responsive or adding attributes).
 */
import remarkImagesPlugin from "remark-images";

export default [
  remarkImagesPlugin,
  {
    size: "full",
  },
];
