import { ItemsService } from './items.js';
export class ActivityService extends ItemsService {
    constructor(options) {
        super('directus_activity', options);
    }
}
