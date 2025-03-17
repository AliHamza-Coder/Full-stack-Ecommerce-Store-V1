import { parseJSON } from '@directus/utils';
import { getOperationAST, parse, Source } from 'graphql';
import { InvalidPayloadError, InvalidQueryError, MethodNotAllowedError } from '@directus/errors';
import { GraphQLValidationError } from '../services/graphql/errors/validation.js';
import asyncHandler from '../utils/async-handler.js';
import { useEnv } from '@directus/env';
export const parseGraphQL = asyncHandler(async (req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'POST') {
        throw new MethodNotAllowedError({ allowed: ['GET', 'POST'], current: req.method });
    }
    let query = null;
    let variables = null;
    let operationName = null;
    let document;
    if (req.method === 'GET') {
        query = req.query['query'] || null;
        if (req.query['variables']) {
            try {
                variables = parseJSON(req.query['variables']);
            }
            catch {
                throw new InvalidQueryError({ reason: `Variables are invalid JSON` });
            }
        }
        else {
            variables = {};
        }
        operationName = req.query['operationName'] || null;
    }
    else {
        query = req.body.query || null;
        variables = req.body.variables || null;
        operationName = req.body.operationName || null;
    }
    if (query === null) {
        throw new InvalidPayloadError({ reason: 'Must provide query string' });
    }
    try {
        const env = useEnv();
        document = parse(new Source(query), {
            maxTokens: Number(env['GRAPHQL_QUERY_TOKEN_LIMIT']),
        });
    }
    catch (err) {
        throw new GraphQLValidationError({
            errors: [err],
        });
    }
    const operationAST = getOperationAST(document, operationName);
    // Mutations can't happen through GET requests
    if (req.method === 'GET' && operationAST?.operation !== 'query') {
        throw new MethodNotAllowedError({
            allowed: ['POST'],
            current: 'GET',
        });
    }
    // Prevent caching responses when mutations are made
    if (operationAST?.operation === 'mutation') {
        res.locals['cache'] = false;
    }
    res.locals['graphqlParams'] = {
        document,
        query,
        variables,
        operationName,
        contextValue: { req, res },
    };
    return next();
});
