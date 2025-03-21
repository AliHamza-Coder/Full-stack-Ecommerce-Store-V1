import type { Item, PrimaryKey } from '@directus/types';
import type { AbstractServiceOptions, LoginResult, MutationOptions } from '../types/index.js';
import { ItemsService } from './items.js';
export declare class SharesService extends ItemsService {
    constructor(options: AbstractServiceOptions);
    createOne(data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey>;
    updateMany(keys: PrimaryKey[], data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey[]>;
    deleteMany(keys: PrimaryKey[], opts?: MutationOptions): Promise<PrimaryKey[]>;
    login(payload: Record<string, any>, options?: Partial<{
        session: boolean;
    }>): Promise<Omit<LoginResult, 'id'>>;
    /**
     * Send a link to the given share ID to the given email(s). Note: you can only send a link to a share
     * if you have read access to that particular share
     */
    invite(payload: {
        emails: string[];
        share: PrimaryKey;
    }): Promise<void>;
}
