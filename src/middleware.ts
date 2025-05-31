/**
 * @description in SSG pattern, the main effect of middleware is to prepare data for building and simulate the behavior of the development server.
 */
import { paraglideMiddleware } from "./paraglide/server.js"
import { defineMiddleware } from "astro:middleware"

export const onRequest = defineMiddleware(async (context, next) => {
  return paraglideMiddleware(context.request, ({ request }) => next(request))
})
