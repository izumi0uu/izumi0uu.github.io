# GSAP / View Transition Investigation

## Scope

This note closes `P2-03` by turning the old "memory leak" comments into a concrete technical conclusion.

## Reproduction

1. Re-enable Astro's `ClientRouter` in `src/components/BaseHead.astro`.
2. Navigate between `/en/`, `/en/about/`, and `/en/project/2025/izumi0uu-blog/` a few times.
3. Inspect the page state in DevTools:
   - `ThemeScript` is an inline script mounted from `<head>`.
   - Under Astro view transitions, inline scripts can run again when the page is revisited.
   - Before this fix, each execution added fresh `astro:after-swap`, `theme-change`, and `matchMedia(change)` listeners without removing the previous ones.

## Findings

- The live GSAP usage on the home route is `SplitText` in `HeroBanner`.
- `SplitText` already scopes its animation with `gsap.context(...)`, listens for `astro:before-swap`, and calls `ctx.revert()` on cleanup.
- The higher-risk leak vector was the global `ThemeScript`, not `SplitText` itself:
  - it lives in `<head>`
  - it uses `is:inline`
  - it registers global listeners
  - it had no dedupe/teardown path if Astro re-executed the script during transition navigation
- The old `src/utils/animation/cleanup.ts` helper was unused and did not match the real lifecycle of the active GSAP component tree.

## Decision

- Keep browser-native same-origin view transitions enabled through `<meta name="view-transition" content="same-origin" />`.
- Keep Astro's `ClientRouter` disabled for now.
- Make `ThemeScript` idempotent so repeated execution does not stack global listeners.
- Let GSAP components own their cleanup locally instead of reviving a global "kill everything" helper.

## Why ClientRouter Still Stays Off

This change removes the confirmed global listener leak path, but it does not prove every future inline script or island-side effect is transition-safe. Keeping `ClientRouter` off preserves the stable multi-page navigation model while the repo continues to use browser-native cross-document transitions.

## References

- Astro View Transitions:
  - https://docs.astro.build/en/guides/view-transitions/
- GSAP context cleanup:
  - https://gsap.com/docs/v3/GSAP/gsap.context/
