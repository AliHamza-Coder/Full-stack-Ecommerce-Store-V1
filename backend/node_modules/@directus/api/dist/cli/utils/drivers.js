export const drivers = {
    pg: 'PostgreSQL / Redshift',
    cockroachdb: 'CockroachDB (Beta)',
    mysql2: 'MySQL / MariaDB / Aurora',
    sqlite3: 'SQLite',
    mssql: 'Microsoft SQL Server',
    oracledb: 'Oracle Database',
};
export function getDriverForClient(client) {
    for (const [key, value] of Object.entries(drivers)) {
        if (value === client)
            return key;
    }
    return null;
}
