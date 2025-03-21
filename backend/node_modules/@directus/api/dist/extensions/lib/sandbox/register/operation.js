import { getFlowManager } from '../../../../flows.js';
import { callReference } from './call-reference.js';
export function registerOperationGenerator() {
    const flowManager = getFlowManager();
    const unregisterFunctions = [];
    const registerOperation = (id, cb) => {
        if (id.typeof !== 'string')
            throw new TypeError('Operation config id has to be of type string');
        if (cb.typeof !== 'function')
            throw new TypeError('Operation config handler has to be of type function');
        const idCopied = id.copySync();
        const handler = async (options) => {
            const response = await callReference(cb, [options]);
            return response.copy();
        };
        flowManager.addOperation(idCopied, handler);
        unregisterFunctions.push(() => {
            flowManager.removeOperation(idCopied);
        });
    };
    return { register: registerOperation, unregisterFunctions };
}
