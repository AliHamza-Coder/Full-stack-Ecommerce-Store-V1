import type { Knex } from 'knex';
/**
 * 0. Identify and persist which webhooks were active before deprecation
 * 1. Migrate existing webhooks over to identically behaving Flows
 * 2. Disable existing webhooks
 * 3. Dont drop webhooks yet
 */
export declare function up(knex: Knex): Promise<void>;
/**
 * Dont completely drop Webhooks yet.
 * Lets preserve the data and drop them in the next release to be extra safe with users data.
 */
export declare function down(knex: Knex): Promise<void>;
