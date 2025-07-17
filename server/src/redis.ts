import "dotenv/config";
import { RedisClient } from "bun";

const redisClient = new RedisClient(process.env.REDIS_URL);

export default redisClient;
