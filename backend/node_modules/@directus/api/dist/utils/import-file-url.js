import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pathToRelativeUrl } from '@directus/utils/node';
export function importFileUrl(url, root, options = {}) {
    return import(`./${pathToRelativeUrl(url, dirname(fileURLToPath(root)))}${options.fresh ? `?t=${Date.now()}` : ''}`);
}
