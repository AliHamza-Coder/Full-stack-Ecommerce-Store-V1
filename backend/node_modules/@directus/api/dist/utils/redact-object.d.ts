import type { UnknownObject } from '@directus/types';
type Keys = string[][];
type Values = Record<string, any>;
type Replacement = (key?: string) => string;
/**
 * Redact values in an object.
 *
 * @param input Input object in which values should be redacted.
 * @param redact The key paths at which and values itself which should be redacted.
 * @param redact.keys Nested array of key paths at which values should be redacted. (Supports `*` for shallow matching, `**` for deep matching.)
 * @param redact.values Value names and the corresponding values that should be redacted.
 * @param replacement Replacement function with which the values are redacted.
 * @returns Redacted object.
 */
export declare function redactObject(input: UnknownObject, redact: {
    keys?: Keys;
    values?: Values;
}, replacement: Replacement): UnknownObject;
/**
 * Replace values and extract Error objects for use with JSON.stringify()
 */
export declare function getReplacer(replacement: Replacement, values?: Values): (_key: string, value: unknown) => any;
export {};
