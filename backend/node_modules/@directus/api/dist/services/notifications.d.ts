import type { Notification, PrimaryKey } from '@directus/types';
import type { AbstractServiceOptions, MutationOptions } from '../types/index.js';
import { ItemsService } from './items.js';
export declare class NotificationsService extends ItemsService {
    constructor(options: AbstractServiceOptions);
    createOne(data: Partial<Notification>, opts?: MutationOptions): Promise<PrimaryKey>;
    sendEmail(data: Partial<Notification>): Promise<void>;
}
