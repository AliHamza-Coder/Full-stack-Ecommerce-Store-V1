import { fetchPermissions } from '../../lib/fetch-permissions.js';
import { fetchPolicies } from '../../lib/fetch-policies.js';
import { fieldMapFromAst } from './lib/field-map-from-ast.js';
import { injectCases } from './lib/inject-cases.js';
import { collectionsInFieldMap } from './utils/collections-in-field-map.js';
import { validatePathPermissions } from './utils/validate-path/validate-path-permissions.js';
import { validatePathExistence } from './utils/validate-path/validate-path-existence.js';
export async function processAst(options, context) {
    // FieldMap is a Map of paths in the AST, with each path containing the collection and fields in
    // that collection that the AST path tries to access
    const fieldMap = fieldMapFromAst(options.ast, context.schema);
    const collections = collectionsInFieldMap(fieldMap);
    if (!options.accountability || options.accountability.admin) {
        // Validate the field existence, even if no permissions apply to the current accountability
        for (const [path, { collection, fields }] of [...fieldMap.read.entries(), ...fieldMap.other.entries()]) {
            validatePathExistence(path, collection, fields, context.schema);
        }
        return options.ast;
    }
    const policies = await fetchPolicies(options.accountability, context);
    const permissions = await fetchPermissions({ action: options.action, policies, collections, accountability: options.accountability }, context);
    const readPermissions = options.action === 'read'
        ? permissions
        : await fetchPermissions({ action: 'read', policies, collections, accountability: options.accountability }, context);
    // Validate field existence first
    for (const [path, { collection, fields }] of [...fieldMap.read.entries(), ...fieldMap.other.entries()]) {
        validatePathExistence(path, collection, fields, context.schema);
    }
    // Validate permissions for the fields
    for (const [path, { collection, fields }] of fieldMap.other.entries()) {
        validatePathPermissions(path, permissions, collection, fields);
    }
    // Validate permission for read only fields
    for (const [path, { collection, fields }] of fieldMap.read.entries()) {
        validatePathPermissions(path, readPermissions, collection, fields);
    }
    injectCases(options.ast, permissions);
    return options.ast;
}
