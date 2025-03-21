import emitter from '../../../../emitter.js';
import { callReference } from './call-reference.js';
export function registerFilterGenerator() {
    const unregisterFunctions = [];
    const registerFilter = (event, cb) => {
        if (event.typeof !== 'string')
            throw new TypeError('Filter event has to be of type string');
        if (cb.typeof !== 'function')
            throw new TypeError('Filter handler has to be of type function');
        const eventCopied = event.copySync();
        const handler = async (payload) => {
            const response = await callReference(cb, [payload]);
            return response.copy();
        };
        emitter.onFilter(eventCopied, handler);
        unregisterFunctions.push(() => {
            emitter.offFilter(eventCopied, handler);
        });
    };
    return { register: registerFilter, unregisterFunctions };
}
