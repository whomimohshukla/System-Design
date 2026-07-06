const test = require('node:test');
const assert = require('node:assert/strict');
const createTokenBucketRateLimit = require('../middleware/rateLimitTokenBucket');

test('allows the request and sets headers when Redis permits the token', async () => {
  let evalCalled = false;
  const fakeRedis = {
    eval: async () => {
      evalCalled = true;
      return [1, 9];
    },
  };

  const middleware = createTokenBucketRateLimit(fakeRedis);
  const req = { user: { id: 'user-1' }, ip: '127.0.0.1' };
  const res = {
    headers: {},
    set(name, value) {
      this.headers[name] = value;
    },
    statusCode: 200,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.payload = payload;
      return this;
    },
  };

  let nextCalled = false;
  const next = () => {
    nextCalled = true;
  };

  await middleware(req, res, next);

  assert.equal(evalCalled, true);
  assert.equal(nextCalled, true);
  assert.equal(res.headers['X-RateLimit-Limit'], 60);
  assert.equal(res.headers['X-RateLimit-Remaining'], 9);
});

test('returns 429 when Redis blocks the request', async () => {
  const fakeRedis = {
    eval: async () => [0, 0],
  };

  const middleware = createTokenBucketRateLimit(fakeRedis, { capacity: 60, refillRate: 1, label: 'notes:read' });
  const req = { user: { id: 'user-2' }, ip: '127.0.0.1' };
  const res = {
    headers: {},
    set(name, value) {
      this.headers[name] = value;
    },
    statusCode: 200,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.payload = payload;
      return this;
    },
  };

  let nextCalled = false;
  const next = () => {
    nextCalled = true;
  };

  await middleware(req, res, next);

  assert.equal(nextCalled, false);
  assert.equal(res.statusCode, 429);
  assert.equal(res.payload.error, 'Too many requests');
  assert.equal(res.headers['Retry-After'], 1);
});
