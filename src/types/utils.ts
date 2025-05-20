/**
 * @description Extracts the union type of values from a constant object.
 */
type ValueUnion<T extends Record<PropertyKey, unknown>> = T[keyof T];

export type { ValueUnion };
