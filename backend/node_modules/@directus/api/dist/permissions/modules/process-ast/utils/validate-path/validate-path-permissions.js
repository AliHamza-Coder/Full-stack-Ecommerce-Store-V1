import { createCollectionForbiddenError, createFieldsForbiddenError } from './create-error.js';
export function validatePathPermissions(path, permissions, collection, fields) {
    const permissionsForCollection = permissions.filter((permission) => permission.collection === collection);
    if (permissionsForCollection.length === 0) {
        throw createCollectionForbiddenError(path, collection);
    }
    // Set of all fields that are allowed to be queried combined
    const allowedFields = new Set();
    for (const { fields } of permissionsForCollection) {
        if (!fields) {
            continue;
        }
        for (const field of fields) {
            if (field === '*') {
                // Early exit in case all fields are allowed
                return;
            }
            allowedFields.add(field);
        }
    }
    const requestedFields = Array.from(fields);
    const forbiddenFields = allowedFields.has('*')
        ? []
        : requestedFields.filter((field) => allowedFields.has(field) === false);
    if (forbiddenFields.length > 0) {
        throw createFieldsForbiddenError(path, collection, forbiddenFields);
    }
}
