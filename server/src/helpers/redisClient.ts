import * as config from 'config';
import * as actualRedis from 'redis';
import * as redisMock from 'redis-mock';

const connectionString = config.get('Redis.connectionString') as string | null;

const redisConfig = { prefix: 'scramblr' };

export const redisClient = connectionString
    ? actualRedis.createClient({ ...redisConfig, url: connectionString })
    : redisMock.createClient(redisConfig);
