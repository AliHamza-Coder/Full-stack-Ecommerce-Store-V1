import type { Accountability, SchemaOverview } from '@directus/types';
import type { Knex } from 'knex';
import type { OpenAPIObject } from 'openapi3-ts/oas30';
import type { AbstractServiceOptions } from '../types/index.js';
import { GraphQLService } from './graphql/index.js';
export declare class SpecificationService {
    accountability: Accountability | null;
    knex: Knex;
    schema: SchemaOverview;
    oas: OASSpecsService;
    graphql: GraphQLSpecsService;
    constructor(options: AbstractServiceOptions);
}
interface SpecificationSubService {
    generate: (_?: any) => Promise<any>;
}
declare class OASSpecsService implements SpecificationSubService {
    accountability: Accountability | null;
    knex: Knex;
    schema: SchemaOverview;
    constructor(options: AbstractServiceOptions);
    generate(host?: string): Promise<OpenAPIObject>;
    private generateTags;
    private generatePaths;
    private generateComponents;
    private filterCollectionFromParams;
    private getActionForMethod;
    private generateField;
    private fieldTypes;
}
declare class GraphQLSpecsService implements SpecificationSubService {
    accountability: Accountability | null;
    knex: Knex;
    schema: SchemaOverview;
    items: GraphQLService;
    system: GraphQLService;
    constructor(options: AbstractServiceOptions);
    generate(scope: 'items' | 'system'): Promise<string | import("graphql").GraphQLSchema | null>;
}
export {};
