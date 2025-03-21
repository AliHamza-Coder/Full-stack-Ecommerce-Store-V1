export type Driver = 'mysql2' | 'pg' | 'cockroachdb' | 'sqlite3' | 'oracledb' | 'mssql';
export declare const DatabaseClients: readonly ["mysql", "postgres", "cockroachdb", "sqlite", "oracle", "mssql", "redshift"];
export type DatabaseClient = (typeof DatabaseClients)[number];
