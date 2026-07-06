const Redis = require('ioredis');

const redis = new Redis(process.env.REDIS_URI || process.env.REDIS_URL || 'redis://127.0.0.1:6379', {
  maxRetriesPerRequest: 2,
  lazyConnect: true,
});

redis.on('error', (err) => console.error('[Redis] connection error:', err.message));
redis.on('connect', () => console.log('[Redis] connected'));

module.exports = redis;