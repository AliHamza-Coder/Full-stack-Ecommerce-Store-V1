import { extractFieldsFromChildren } from './extract-fields-from-children.js';
import { extractFieldsFromQuery } from './extract-fields-from-query.js';
export function fieldMapFromAst(ast, schema) {
    const fieldMap = { read: new Map(), other: new Map() };
    extractFieldsFromChildren(ast.name, ast.children, fieldMap, schema);
    extractFieldsFromQuery(ast.name, ast.query, fieldMap, schema);
    return fieldMap;
}
