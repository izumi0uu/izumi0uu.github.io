// Import and export Remark/Rehype plugins

// Lint Markdown files
import remarkLint from "./remark-lint.mjs";

// Format Markdown files using Prettier via unified
import unifiedPrettier from "./unified-prettier.mjs";

// Add syntax highlighting to code blocks using Prism
import remarkPrism from "./remark-prism.mjs";

// Generate a table of contents
import remarkToc from "./remark-toc.mjs";

// Convert quotes, dashes, and ellipses to smart typographic equivalents
import remarkSmartypants from "./remark-smartypants.mjs";

// Process images in Markdown (potential optimization or other features)
import remarkImages from "./remark-images.mjs";

// Enable GitHub Flavored Markdown features (tables, strikethrough, etc.)
import remarkGfm from "./remark-gfm.mjs";

// Embed external content (like tweets, YouTube videos)
import remarkEmbedder from "./remark-embedder.mjs";

// Add drop caps to the beginning of paragraphs
import remarkDropcap from "./remark-dropcap.mjs";

// Capitalize headings
import remarkCapitalizeHeadings from "./remark-capitalize-headings.mjs";

// Add custom callout blocks (like notes, warnings)
import remarkCallout from "./remark-callout.mjs";

// Add links to headings automatically
import rehypeAutolinkHeadings from "./rehype-autolink-headings.mjs";

// Add target="_blank" and rel="noopener noreferrer" to external links
import rehypeExternalLinks from "./rehype-external-links.mjs";

export {
  remarkLint,
  unifiedPrettier,
  remarkPrism,
  remarkToc,
  remarkSmartypants,
  remarkImages,
  remarkGfm,
  remarkFootnotes,
  remarkEmbedder,
  remarkDropcap,
  remarkCapitalizeHeadings,
  remarkCallout,
  rehypeAutolinkHeadings,
  rehypeExternalLinks,
};
