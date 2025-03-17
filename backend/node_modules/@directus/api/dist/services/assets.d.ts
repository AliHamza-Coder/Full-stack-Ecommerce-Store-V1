import type { Range, Stat } from '@directus/storage';
import type { Accountability, SchemaOverview } from '@directus/types';
import type { Knex } from 'knex';
import type { Readable } from 'node:stream';
import type { AbstractServiceOptions, TransformationSet } from '../types/index.js';
import { FilesService } from './files.js';
export declare class AssetsService {
    knex: Knex;
    accountability: Accountability | null;
    schema: SchemaOverview;
    filesService: FilesService;
    constructor(options: AbstractServiceOptions);
    getAsset(id: string, transformation?: TransformationSet, range?: Range, deferStream?: false): Promise<{
        stream: Readable;
        file: any;
        stat: Stat;
    }>;
    getAsset(id: string, transformation?: TransformationSet, range?: Range, deferStream?: true): Promise<{
        stream: () => Promise<Readable>;
        file: any;
        stat: Stat;
    }>;
}
