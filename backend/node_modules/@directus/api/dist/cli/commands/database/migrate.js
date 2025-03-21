import run from '../../../database/migrations/run.js';
import getDatabase from '../../../database/index.js';
import { useLogger } from '../../../logger/index.js';
export default async function migrate(direction) {
    const database = getDatabase();
    const logger = useLogger();
    try {
        logger.info('Running migrations...');
        await run(database, direction);
        if (direction === 'down') {
            logger.info('Downgrade successful');
        }
        else {
            logger.info('Database up to date');
        }
        database.destroy();
        process.exit();
    }
    catch (err) {
        logger.error(err);
        database.destroy();
        process.exit(1);
    }
}
