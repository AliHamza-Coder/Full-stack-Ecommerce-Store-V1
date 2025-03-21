export function getInfoForPath(fieldMap, group, path, collection) {
    const pathStr = path.join('.');
    if (fieldMap[group].has(pathStr) === false) {
        fieldMap[group].set(pathStr, { collection, fields: new Set() });
    }
    return fieldMap[group].get(pathStr);
}
