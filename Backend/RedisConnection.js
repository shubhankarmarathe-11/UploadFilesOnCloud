import ioredis from "ioredis";

const RedisCli = new ioredis({
  maxRetriesPerRequest: null,
  enableReadyCheck: true,
});

RedisCli.on("connect", () => {
  console.log("Redis connected");
});

RedisCli.on("error", (err) => {
  console.error("Redis error:", err);
});

export { RedisCli };
