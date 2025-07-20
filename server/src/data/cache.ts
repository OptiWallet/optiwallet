import { RedisClient } from "bun";
import "dotenv/config";

const cache = new RedisClient(process.env.REDIS_URL);

export default cache;
