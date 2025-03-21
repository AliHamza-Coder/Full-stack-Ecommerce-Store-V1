import { ItemsService } from '../services/index.js';
import type { AbstractServiceOptions } from '../types/services.js';
/**
 * Select the correct service for the given collection. This allows the individual services to run
 * their custom checks (f.e. it allows `UsersService` to prevent updating TFA secret from outside).
 */
export declare function getService(collection: string, opts: AbstractServiceOptions): ItemsService;
