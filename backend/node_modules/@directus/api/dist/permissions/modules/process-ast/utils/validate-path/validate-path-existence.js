import { createCollectionForbiddenError, createFieldsForbiddenError } from './create-error.js';
export function validatePathExistence(path, collection, fields, schema) {
    const collectionInfo = schema.collections[collection];
    if (collectionInfo === undefined) {
        throw createCollectionForbiddenError(path, collection);
    }
    const requestedFields = Array.from(fields);
    const nonExistentFields = requestedFields.filter((field) => collectionInfo.fields[field] === undefined);
    if (nonExistentFields.length > 0) {
        throw createFieldsForbiddenError(path, collection, nonExistentFields);
    }
}
