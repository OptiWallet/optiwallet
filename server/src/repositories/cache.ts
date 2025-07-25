import { RedisClient } from "bun";
import { DEFAULT_CACHE_TTL } from "./constants";

const cache = new RedisClient(process.env.REDIS_URL);

export default cache;

export const getFromCache = async <T>(key: string, loadingFn: () => Promise<T>) => {
    const cachedValue = await cache.get(key);
    if (cachedValue) {
        console.log(`Cache hit for key: ${key}`);
        return JSON.parse(cachedValue) as T;
    } else {
        console.log(`Cache miss for key: ${key}`);
        const value = await loadingFn();
        await cache.set(key, JSON.stringify(value), "EX", DEFAULT_CACHE_TTL);
        return value;
    }
};
