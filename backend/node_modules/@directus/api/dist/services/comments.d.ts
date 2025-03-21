import type { Comment, PrimaryKey } from '@directus/types';
import type { AbstractServiceOptions, MutationOptions } from '../types/index.js';
import { ItemsService } from './items.js';
import { NotificationsService } from './notifications.js';
import { UsersService } from './users.js';
export declare class CommentsService extends ItemsService {
    notificationsService: NotificationsService;
    usersService: UsersService;
    constructor(options: AbstractServiceOptions);
    createOne(data: Partial<Comment>, opts?: MutationOptions): Promise<PrimaryKey>;
    updateOne(key: PrimaryKey, data: Partial<Comment>, opts?: MutationOptions): Promise<PrimaryKey>;
    deleteOne(key: PrimaryKey, opts?: MutationOptions): Promise<PrimaryKey>;
}
