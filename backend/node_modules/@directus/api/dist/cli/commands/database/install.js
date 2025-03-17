import installSeeds from '../../../database/seeds/run.js';
import getDatabase from '../../../database/index.js';
import { useLogger } from '../../../logger/index.js';
export default async function start() {
    const database = getDatabase();
    const logger = useLogger();
    try {
        await installSeeds(database);
        database.destroy();
        process.exit(0);
    }
    catch (err) {
        logger.error(err);
        database.destroy();
        process.exit(1);
    }
}
