import type { Agent, ClientRequestArgs } from 'node:http';
/**
 * 'createConnection' is missing in 'Agent' type, but assigned in actual implementation:
 * https://github.com/nodejs/node/blob/8a41d9b636be86350cd32847c3f89d327c4f6ff7/lib/_http_agent.js#L215
 */
export type _Agent = Agent & {
    createConnection: ClientRequestArgs['createConnection'];
};
/** Extends a HTTP agent with IP validation */
export declare const agentWithIpValidation: (agent: Agent) => Agent;
