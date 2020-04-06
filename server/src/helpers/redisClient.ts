import * as config from 'config';
import * as actualRedis from 'redis';
import * as redisMock from 'redis-mock';

if (!config.get('Redis.connectionString')) {
    console.info(
        '⚠️ Using internal Redis. User sessions will be lost when you restart the server.',
    );
} else {
    console.info('💾 Using redis');
}

const connectionString = config.get('Redis.connectionString') as string | null;

const redisConfig = { prefix: 'scramblr' };

export const redisClient = connectionString
    ? actualRedis.createClient({ ...redisConfig, url: connectionString })
    : redisMock.createClient(redisConfig);
