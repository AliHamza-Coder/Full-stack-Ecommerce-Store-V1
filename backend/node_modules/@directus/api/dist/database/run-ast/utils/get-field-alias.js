import { applyFunctionToColumnName } from '../../../utils/apply-function-to-column-name.js';
export function getNodeAlias(node) {
    return applyFunctionToColumnName(node.fieldKey);
}
