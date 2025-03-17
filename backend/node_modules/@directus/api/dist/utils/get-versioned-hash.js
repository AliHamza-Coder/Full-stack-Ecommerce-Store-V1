import { version } from 'directus/version';
import hash from 'object-hash';
export function getVersionedHash(item) {
    return hash({ item, version });
}
