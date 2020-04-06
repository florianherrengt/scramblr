import * as config from 'config';
import * as TypeORM from 'typeorm';

export const getDbConnectionOptions = () => {
    console.info(`💾Using ${config.get('Database.type')} database`);

    const defaultConnection = {
        database: config.get('Database.name') as string,
        username: config.get('Database.username') as string,
        password: config.get('Database.password') as string,
        host: config.get('Database.host') as string,
        ssl: Boolean(parseInt(config.get('Database.ssl'), 10)),
    };
    const postgresConnection: TypeORM.ConnectionOptions = {
        type: 'postgres',
        port: config.get('Database.port') || 5432,
        ...defaultConnection,
    };
    const mysqlConnection: TypeORM.ConnectionOptions = {
        type: 'postgres',
        port: config.get('Database.port') || 3306,
        ...defaultConnection,
    };
    const sqliteConnection: TypeORM.ConnectionOptions = {
        type: 'sqlite',
        database: './data/sqlite.db',
    };

    switch (config.get('Database.type') as string) {
        case 'postgres':
            return postgresConnection;
        case 'mysql':
            return mysqlConnection;
        default:
            return sqliteConnection;
    }
};
