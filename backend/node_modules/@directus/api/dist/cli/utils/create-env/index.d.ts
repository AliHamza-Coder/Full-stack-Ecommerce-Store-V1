import type { Driver } from '../../../types/index.js';
import type { Credentials } from '../create-db-connection.js';
export default function createEnv(client: Driver, credentials: Credentials, directory: string): Promise<void>;
