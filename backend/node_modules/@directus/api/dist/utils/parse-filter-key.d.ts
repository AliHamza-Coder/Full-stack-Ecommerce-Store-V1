/**
 * Parses a filter key, returning its field name and function name (if defined) separately.
 */
export declare function parseFilterKey(key: string): {
    fieldName: string;
    functionName: string | undefined;
};
