"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
exports.getDbConnectionOptions = () => {
    console.info(`Using ${config.get('Database.type')} database`);
    const defaultConnection = {
        database: config.get('Database.name'),
        username: config.get('Database.username'),
        password: config.get('Database.password'),
        host: config.get('Database.host'),
        ssl: Boolean(parseInt(config.get('Database.ssl'), 10)),
    };
    const postgresConnection = Object.assign({ type: 'postgres', port: config.get('Database.port') || 5432 }, defaultConnection);
    const mysqlConnection = Object.assign({ type: 'postgres', port: config.get('Database.port') || 3306 }, defaultConnection);
    const sqliteConnection = {
        type: 'sqlite',
        database: './data/sqlite.db',
    };
    switch (config.get('Database.type')) {
        case 'postgres':
            return postgresConnection;
        case 'mysql':
            return mysqlConnection;
        default:
            return sqliteConnection;
    }
};
//# sourceMappingURL=typeorm.js.map