import { defineOperationApi } from '@directus/extensions';
import { optionToObject } from '@directus/utils';
export default defineOperationApi({
    id: 'transform',
    handler: ({ json }) => {
        return optionToObject(json);
    },
});
