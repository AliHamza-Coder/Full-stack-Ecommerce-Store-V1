import jwt from 'jsonwebtoken';
type Options = {
    operation: string;
    payload?: Record<string, any> | string;
    token?: string;
    secret?: jwt.Secret;
    options?: any;
};
declare const _default: import("@directus/extensions").OperationApiConfig<Options>;
export default _default;
