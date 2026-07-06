# Rate Limiting Demo

This project is a small Express application that demonstrates how a token-bucket rate limiter can protect API routes using Redis-backed shared state. It also includes a MongoDB-backed notes API so the limiter can be observed in a realistic request flow.

## What this demo shows

- A token-bucket limiter with burst capacity and a refill rate
- Separate limits for reads, writes, and deletes
- Redis-backed counters that work across app instances
- A simple note API that stores data in MongoDB
- Health and error handling for local development

## Architecture

- Express handles the HTTP API
- Mongoose persists notes in MongoDB
- Redis stores limiter state for each user or client
- Middleware sits on routes to enforce request budgets before the controller runs

## Prerequisites

- Node.js 18+
- MongoDB running locally or via Docker
- Redis running locally or via Docker

## Quick start

1. Install dependencies
   ```bash
   npm install
   ```

2. Start MongoDB and Redis
   - Local services are expected at:
     - MongoDB: `mongodb://localhost:27017/rate-limiting`
     - Redis: `redis://127.0.0.1:6379`

3. Run the server
   ```bash
   npm run dev
   ```

4. Hit the health endpoint
   ```bash
   curl http://localhost:3000/health
   ```

## API examples

### Create a note

```bash
curl -X POST http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -H "x-user-id: demo-user" \
  -d '{"title":"Hello","content":"World"}'
```

### List notes

```bash
curl http://localhost:3000/api/notes \
  -H "x-user-id: demo-user"
```

### Rate-limit headers

Successful responses include:

- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`
- `Retry-After` on throttled responses

## Rate limit behavior

- Reads: burst up to 60 requests, refilling at 1 token/sec
- Writes: burst up to 10 requests, refilling at 10 tokens/minute
- Deletes: burst up to 5 requests, refilling at 5 tokens/minute

## Testing

```bash
npm test
```

## Notes

This is a teaching/demo project. In production you would usually replace the `x-user-id` header with real authentication and add centralized gateway limits.
