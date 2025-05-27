# izumi0uu's blog

## font management

base layer (zh-only/en-only)：make sure fonts are loaded and applied correctly
fine layer (font-\* 系列)：provide more semantic and rich tools for developers

## file organization - utils, constants, utils

Maintain Domain-Based Organization: Continue organizing files by domain across all three directories.

Be Mindful of Circular Dependencies: While TypeScript handles this well at compile time, it's still worth being cautious about creating complex dependency cycles.

Consider Colocating Related Files: For very tightly coupled features, consider keeping related types, constants, and utils closer together.

## i18n

Beacuse of the use of ParaglideJS and use SSG and the complexity of module resolution in browser environment, the i18n is a little bit complicated.

It's hard to import ParaglideJS's runtime functions in the client-side script.

So I directly use ParaglideJS's runtime functions's copy in the client-side script.
