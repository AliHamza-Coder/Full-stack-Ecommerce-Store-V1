import { isString } from 'lodash-es';
/**
 * Preprocess a SQL query, such that repeated binding values are bound to the same binding index.
 **/
export function prepQueryParams(queryParams, options) {
    const query = { bindings: [], ...(isString(queryParams) ? { sql: queryParams } : queryParams) };
    // bindingIndices[i] is the index of the first occurrence of query.bindings[i]
    const bindingIndices = new Map();
    // The new, deduplicated bindings
    const bindings = [];
    let matchIndex = 0;
    let nextBindingIndex = 0;
    const sql = query.sql.replace(/(\\*)(\?)/g, (_, escapes) => {
        if (escapes.length % 2) {
            // Return an escaped question mark, so it stays escaped
            return `${'\\'.repeat(escapes.length)}?`;
        }
        const binding = query.bindings[matchIndex];
        let bindingIndex;
        if (bindingIndices.has(binding)) {
            // This index belongs to a binding that has been encountered before.
            bindingIndex = bindingIndices.get(binding);
        }
        else {
            // The first time the value is encountered, set the index lookup to the current index
            // Use the nextBindingIndex to get the next unused binding index that is used in the new, deduplicated bindings
            bindingIndex = nextBindingIndex++;
            bindingIndices.set(binding, bindingIndex);
            bindings.push(binding);
        }
        // Increment the loop counter
        matchIndex++;
        return options.format(bindingIndex);
    });
    return { ...query, sql, bindings };
}
