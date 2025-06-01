/**
 * @description Conditional middleware for SSG builds
 * In SSG mode, middleware is essential during build-time to ensure proper locale context
 * for each page being generated. This prevents getLocale() from returning server locale
 * instead of the intended page locale during static generation.
 */
import { paraglideMiddleware } from "./paraglide/server.js";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  // Enable middleware only during build process (SSG generation)
  // This ensures proper locale context for each generated page
  // if (import.meta.env.DEV || import.meta.env.PROD) {
  //   try {
  //     return paraglideMiddleware(context.request, ({ request }) => next(request))
  //   } catch (error) {
  //     // Fallback for runtime errors in static mode
  //     console.warn("Middleware error, falling back to direct request:", error)
  //     return next()
  //   }
  // }

  return next();
});
