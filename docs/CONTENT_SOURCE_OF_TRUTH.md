# Content Source Of Truth

## Current platform decision

The site currently uses a repository-local content model:

- source of truth: `src/content/post/**` and `src/content/project/**`
- loader: Astro content collections declared in `src/content/config.ts`
- output model: static build artifacts in `dist/`
- deployment target: GitHub Pages-compatible static hosting

## What this means

- There is no active runtime CMS in the current production path.
- There is no Strapi fetch layer in use.
- Remote image presets in `src/constants/image.ts` are only sizing helpers for absolute URLs, not proof of a CMS integration.

## Query model

- `glob(...)` in `src/content/config.ts` defines how Astro loads the local MDX collections at build time.
- `getCollection(...)` and `getEntry(...)` are query helpers used by pages and utilities after the collections have been defined; they are not a replacement for the loader itself.

## Change policy

Before introducing a remote CMS or a second content source, update all of the following in the same change:

1. `README.md`
2. `docs/STORY_BACKLOG.md`
3. `docs/TESTING.md`
4. a smoke contract that proves the new content source is intentionally wired
