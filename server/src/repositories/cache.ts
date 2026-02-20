import { RedisClient } from "bun";
import { isProduction } from "../utils/evnironment";
import { logger } from "../utils/logger";
import { DEFAULT_CACHE_TTL } from "./constants";

const cache = new RedisClient(process.env.REDIS_URL);

export default cache;

export const getFromCache = async <T>(
  key: string,
  loadingFn: () => Promise<T>
) => {
  const cachedValue = await cache.get(key);
  if (cachedValue) {
    logger.info(`Cache hit for key: ${key}`);
    return JSON.parse(cachedValue) as T;
  } else {
    logger.info(`Cache miss for key: ${key}`);
    const value = await loadingFn();
    await cache.set(
      key,
      JSON.stringify(value),
      "PX", // Set expiration in milliseconds
      isProduction ? DEFAULT_CACHE_TTL : 1
    );
    return value;
  }
};
