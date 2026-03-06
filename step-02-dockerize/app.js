const express = require("express");
const redis = require("redis");

const app = express();
const PORT = process.env.PORT || 3000;
const APP_VERSION = process.env.APP_VERSION || "v1";

// Redis client (optional — gracefully degrades if Redis not available)
let redisClient = null;
let visitCount = 0;

async function connectRedis() {
  try {
    redisClient = redis.createClient({
      socket: {
        host: process.env.REDIS_HOST || "localhost",
        port: process.env.REDIS_PORT || 6379,
        reconnectStrategy: false,
      },
    });
    redisClient.on("error", (err) => {
      console.warn("Redis not available, using in-memory counter:", err.message);
      redisClient = null;
    });
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.warn("Redis not available, using in-memory counter");
    redisClient = null;
  }
}

app.get("/", async (req, res) => {
  let visits;
  try {
    if (redisClient) {
      visits = await redisClient.incr("visits");
    } else {
      visits = ++visitCount;
    }
  } catch {
    visits = ++visitCount;
  }

  res.json({
    message: `Hello from Docker & Kubernetes Workshop!`,
    version: APP_VERSION,
    visits: visits,
    hostname: require("os").hostname(),
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy", version: APP_VERSION });
});

app.get("/info", (req, res) => {
  res.json({
    node_version: process.version,
    platform: process.platform,
    memory: process.memoryUsage(),
    uptime: process.uptime(),
    env: APP_VERSION,
  });
});

connectRedis().then(() => {
  app.listen(PORT, () => {
    console.log(`App version ${APP_VERSION} running on port ${PORT}`);
  });
});
