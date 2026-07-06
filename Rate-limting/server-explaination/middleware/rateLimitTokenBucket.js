const defaultRedisClient = require('../config/redisClient');

const TOKEN_BUCKET_SCRIPT = `
  local key = KEYS[1]
  local capacity = tonumber(ARGV[1])
  local refillRate = tonumber(ARGV[2])
  local now = tonumber(ARGV[3])
  local requested = tonumber(ARGV[4])

  local bucket = redis.call('HMGET', key, 'tokens', 'timestamp')
  local tokens = tonumber(bucket[1])
  local timestamp = tonumber(bucket[2])

  if tokens == nil then
    tokens = capacity
    timestamp = now
  end

  local elapsed = math.max(0, now - timestamp)
  tokens = math.min(capacity, tokens + (elapsed * refillRate))

  local allowed = 0
  if tokens >= requested then
    tokens = tokens - requested
    allowed = 1
  end

  redis.call('HMSET', key, 'tokens', tostring(tokens), 'timestamp', tostring(now))
  redis.call('EXPIRE', key, 3600)

  return { allowed, tokens }
`;

function tokenBucketRateLimit(redisClientOrOptions = defaultRedisClient, maybeOptions = {}) {
  let redisClient = defaultRedisClient;
  let options = {};

  if (redisClientOrOptions && typeof redisClientOrOptions === 'object' && typeof redisClientOrOptions.eval === 'function') {
    redisClient = redisClientOrOptions;
    options = maybeOptions;
  } else {
    options = redisClientOrOptions || {};
  }

  const { capacity = 60, refillRate = 1, label = 'default' } = options;

  return async function (req, res, next) {
    try {
      const identifier = req.user?.id || req.ip || 'anonymous';
      const key = `rl:${label}:${identifier}`;
      const now = Date.now() / 1000;

      const [allowed, remaining] = await redisClient.eval(
        TOKEN_BUCKET_SCRIPT,
        1,
        key,
        capacity,
        refillRate,
        now,
        1
      );

      res.set('X-RateLimit-Limit', capacity);
      res.set('X-RateLimit-Remaining', Math.max(0, Math.floor(remaining)));

      if (allowed === 1) return next();

      const retryAfterSeconds = Math.max(1, Math.ceil(1 / refillRate));
      res.set('Retry-After', retryAfterSeconds);
      return res.status(429).json({
        error: 'Too many requests',
        retryAfterSeconds,
      });
    } catch (err) {
      console.error(`Rate limiter (${label}) failed, failing open:`, err.message);
      return next();
    }
  };
}

module.exports = tokenBucketRateLimit;