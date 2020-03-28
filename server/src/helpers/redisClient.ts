import * as config from 'config';
import * as actualRedis from 'redis';
import * as redisMock from 'redis-mock';

const redis = config.get('Redis.host') ? actualRedis : redisMock;

const redisDefaultConfig = { prefix: 'scramblr' };

const redisConfig: actualRedis.ClientOpts = config.get('Redis.host')
    ? {
          ...redisDefaultConfig,
          host: config.get('Redis.host') as string,
          password: config.get('Redis.password') as string,
          port: parseInt(config.get('Redis.port'), 10),
      }
    : { ...redisDefaultConfig };

export const redisClient = redis.createClient(redisConfig);
