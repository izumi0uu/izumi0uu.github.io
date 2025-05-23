/**
 * @description currently used for ParaglideJS i18n resulted from types/common.ts
 * @returns {T} The result of the function call or the fallback value.
 */
const getValueFromFunctionOrFallback = <T>(
  obj: any,
  funcName: string,
  fallbackValue: T
): T => {
  if (obj && typeof obj[funcName] === "function") {
    try {
      // call the paraglide m function
      return obj[funcName]();
    } catch (error) {
      console.error(
        `Error calling function ${funcName} on object ${obj}:`,
        error
      );
      // return the fallback value
      return fallbackValue;
    }
  }
  // return the fallback value
  return fallbackValue;
};

/**
 * @description filter undefined values from an object
 * @returns {T} object with undefined values removed
 */
const filterUndefined = <T extends Record<string, any>>(obj: T): T =>
  Object.fromEntries(
    Object.entries(obj).filter(([_key, value]) => value !== undefined)
  ) as T;

/**
 * @description randomize an array
 * @returns {T[]} array with items randomized
 */
const randomizeArray = <T>(array: T[]): T[] =>
  array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);

export { getValueFromFunctionOrFallback, filterUndefined, randomizeArray };
