import type { AbstractServiceOptions } from '../../types/services.js';
export interface ShareInfo {
    collection: string;
    item: string;
    role: string | null;
    user_created: {
        id: string;
        role: string;
    };
}
export declare const fetchShareInfo: typeof _fetchShareInfo;
export declare function _fetchShareInfo(shareId: string, context: AbstractServiceOptions): Promise<ShareInfo>;
