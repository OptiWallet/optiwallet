import redisClient from "../redis";

//just example code to show how to use redis
export async function cacheCounterData() {
  await redisClient.set("counter", "0");
}

export async function incCounterData() {
  await redisClient.incr("counter");
}

export async function getCounterData() {
  return await redisClient.get("counter");
}
