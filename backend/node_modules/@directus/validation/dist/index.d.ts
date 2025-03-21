import * as _directus_errors from '@directus/errors';
import { ClientFilterOperator } from '@directus/types';
import { ValidationErrorItem } from 'joi';

interface FailedValidationErrorExtensions {
    field: string;
    type: ClientFilterOperator | 'required' | 'email';
    valid?: number | string | (number | string)[];
    invalid?: number | string | (number | string)[];
    substring?: string;
}
declare const FailedValidationError: _directus_errors.DirectusErrorConstructor<FailedValidationErrorExtensions>;

declare const joiValidationErrorItemToErrorExtensions: (validationErrorItem: ValidationErrorItem) => FailedValidationErrorExtensions;

export { FailedValidationError, joiValidationErrorItemToErrorExtensions };
