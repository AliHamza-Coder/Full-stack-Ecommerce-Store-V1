import { useEnv } from '@directus/env';
import { NoSchemaIntrospectionCustomRule, execute, specifiedRules, validate } from 'graphql';
import getDatabase from '../../database/index.js';
import { getService } from '../../utils/get-service.js';
import { formatError } from './errors/format.js';
import { GraphQLExecutionError, GraphQLValidationError } from './errors/index.js';
import { generateSchema } from './schema/index.js';
import { addPathToValidationError } from './utils/add-path-to-validation-error.js';
import processError from './utils/process-error.js';
const env = useEnv();
const validationRules = Array.from(specifiedRules);
if (env['GRAPHQL_INTROSPECTION'] === false) {
    validationRules.push(NoSchemaIntrospectionCustomRule);
}
export class GraphQLService {
    accountability;
    knex;
    schema;
    scope;
    constructor(options) {
        this.accountability = options?.accountability || null;
        this.knex = options?.knex || getDatabase();
        this.schema = options.schema;
        this.scope = options.scope;
    }
    /**
     * Execute a GraphQL structure
     */
    async execute({ document, variables, operationName, contextValue, }) {
        const schema = await this.getSchema();
        const validationErrors = validate(schema, document, validationRules).map((validationError) => addPathToValidationError(validationError));
        if (validationErrors.length > 0) {
            throw new GraphQLValidationError({ errors: validationErrors });
        }
        let result;
        try {
            result = await execute({
                schema,
                document,
                contextValue,
                variableValues: variables,
                operationName,
            });
        }
        catch (err) {
            throw new GraphQLExecutionError({ errors: [err.message] });
        }
        const formattedResult = {};
        if (result['data'])
            formattedResult.data = result['data'];
        if (result['errors']) {
            formattedResult.errors = result['errors'].map((error) => processError(this.accountability, error));
        }
        if (result['extensions'])
            formattedResult.extensions = result['extensions'];
        return formattedResult;
    }
    async getSchema(type = 'schema') {
        return generateSchema(this, type);
    }
    /**
     * Execute the read action on the correct service. Checks for singleton as well.
     */
    async read(collection, query) {
        const service = getService(collection, {
            knex: this.knex,
            accountability: this.accountability,
            schema: this.schema,
        });
        const result = this.schema.collections[collection].singleton
            ? await service.readSingleton(query, { stripNonRequested: false })
            : await service.readByQuery(query, { stripNonRequested: false });
        return result;
    }
    /**
     * Upsert and read singleton item
     */
    async upsertSingleton(collection, body, query) {
        const service = getService(collection, {
            knex: this.knex,
            accountability: this.accountability,
            schema: this.schema,
        });
        try {
            await service.upsertSingleton(body);
            if ((query.fields || []).length > 0) {
                const result = await service.readSingleton(query);
                return result;
            }
            return true;
        }
        catch (err) {
            throw formatError(err);
        }
    }
}
