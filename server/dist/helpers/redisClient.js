"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
const actualRedis = require("redis");
const redisMock = require("redis-mock");
if (!config.get('Redis.connectionString')) {
    console.info('⚠️ Using internal Redis. User sessions will be lost when you restart the server.');
}
else {
    console.info('💾 Using redis');
}
const connectionString = config.get('Redis.connectionString');
const redisConfig = { prefix: 'scramblr' };
exports.redisClient = connectionString
    ? actualRedis.createClient(Object.assign(Object.assign({}, redisConfig), { url: connectionString }))
    : redisMock.createClient(redisConfig);
//# sourceMappingURL=redisClient.js.map