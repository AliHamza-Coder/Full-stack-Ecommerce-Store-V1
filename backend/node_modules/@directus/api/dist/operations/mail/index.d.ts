export type Options = {
    to: string;
    type: 'wysiwyg' | 'markdown' | 'template';
    subject: string;
    body?: string;
    template?: string;
    data?: Record<string, any>;
    cc?: string;
    bcc?: string;
    replyTo?: string;
};
declare const _default: import("@directus/extensions").OperationApiConfig<Options>;
export default _default;
