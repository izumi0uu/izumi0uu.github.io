/**
 * @description in SSG pattern, the main effect of middleware is to prepare data for building and simulate the behavior of the development server.
 */
export function onRequest(context: any, next: () => Promise<void>) {
  // intercept data from a request
  // optionally, modify the properties in `locals`
  context.locals.title = "New title";

  // return a Response or the result of calling `next()`
  return next();
}
