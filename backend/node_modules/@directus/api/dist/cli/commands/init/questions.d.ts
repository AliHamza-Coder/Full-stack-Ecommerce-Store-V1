import type { Driver } from '../../../types/index.js';
export declare const databaseQuestions: {
    sqlite3: (({ filepath }: {
        filepath: string;
    }) => Record<string, string>)[];
    mysql2: (({ client }: {
        client: Exclude<Driver, "sqlite3">;
    }) => Record<string, any>)[];
    pg: (({ client }: {
        client: Exclude<Driver, "sqlite3">;
    }) => Record<string, any>)[];
    cockroachdb: (({ client }: {
        client: Exclude<Driver, "sqlite3">;
    }) => Record<string, any>)[];
    oracledb: (({ client }: {
        client: Exclude<Driver, "sqlite3">;
    }) => Record<string, any>)[];
    mssql: (({ client }: {
        client: Exclude<Driver, "sqlite3">;
    }) => Record<string, any>)[];
};
