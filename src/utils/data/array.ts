/**
 * @description filter undefined values from an object
 * @returns {T} object with undefined values removed
 */
const filterUndefined = <T extends Record<string, any>>(obj: T): T =>
  Object.fromEntries(Object.entries(obj).filter(([_key, value]) => value !== undefined)) as T;

/**
 * @description randomize an array
 * @returns {T[]} array with items randomized
 */
const randomizeArray = <T>(array: T[]): T[] =>
  array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);

export { filterUndefined, randomizeArray };
