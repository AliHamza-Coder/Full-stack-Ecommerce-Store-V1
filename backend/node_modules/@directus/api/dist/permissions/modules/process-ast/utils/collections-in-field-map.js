export function collectionsInFieldMap(fieldMap) {
    const collections = new Set();
    for (const { collection } of [...fieldMap.other.values(), ...fieldMap.read.values()]) {
        collections.add(collection);
    }
    return Array.from(collections);
}
