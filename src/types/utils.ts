/**
 *  Extracts the union type of values from a contant object.
 */
export type ValueUnion<T extends Record<PropertyKey, unknown>> = T[keyof T];
