type Options = {
    recipient: string;
    subject: string;
    message?: unknown | null;
    permissions: string;
    collection?: string;
    item?: string;
};
declare const _default: import("@directus/extensions").OperationApiConfig<Options>;
export default _default;
