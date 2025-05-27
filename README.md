# izumi0uu's blog

## font management

base layer (zh-only/en-only)：make sure fonts are loaded and applied correctly
fine layer (font-\* 系列)：provide more semantic and rich tools for developers

## file organization - utils, constants, utils

Maintain Domain-Based Organization: Continue organizing files by domain across all three directories.

Be Mindful of Circular Dependencies: While TypeScript handles this well at compile time, it's still worth being cautious about creating complex dependency cycles.

Consider Colocating Related Files: For very tightly coupled features, consider keeping related types, constants, and utils closer together.

## i18n

Beacuse of the use of ParaglideJS and use SSG, the i18n is a little bit complicated.

To make sure we could import some functions from ParaglideJS runtime, we need to do some tricks.

Not like the 'ThemeScript' which I write in <style: inline> tag, I write it in src/script/i18n-initializer.ts. as a ES module, so that we could import ParaglideJS runtime functions.
