import Redis from "ioredis";
import { RedisPubSub } from "graphql-redis-subscriptions";
import session from "express-session";
import "reflect-metadata";
import connectRedis from "connect-redis";



const options: Redis.RedisOptions = {
  host: "127.0.0.1",
  port: 6379,
  retryStrategy: (times: number) => Math.max(times * 100, 3000),
};

export  function initializeRedis() {
  const redisStore = connectRedis(session);
  const redisClient = new Redis(process.env.REDIS_URL);

  const pubSub = new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options),
    
  });

  return {
    redisStore,
    redisClient,
    pubSub,
  };
}