# System Design Playground

A practical collection of system design notes, interview questions, and small implementation demos for distributed systems, APIs, caching, storage, and realtime products.

This workspace now includes a hands-on rate-limiting demo under [Rate-limting/server-explaination](Rate-limting/server-explaination) that shows how token-bucket throttling can be implemented with Express, Redis, and MongoDB.

## Featured Demo

- [Rate limiting demo](Rate-limting/server-explaination/README.md)
  - Express API with MongoDB-backed notes
  - Redis-backed token-bucket limiter
  - Separate limits for reads, writes, and deletes
  - Local development instructions and example requests

## System Design Questions

- [Design Airline Check-in System](system-design-questions/airline-checkin.md)
- [Design a Blogging Platform](system-design-questions/blogging-platform.md)
- [Design Counting Impressions at Scale](system-design-questions/counting-impressions.md)
- [Design a Distributed Cache](system-design-questions/distributed-cache.md)
- [Design a faster Superfast KV Store](system-design-questions/faster-superfast-kv.md)
- [Design a Remote File Sync Service](system-design-questions/file-sync.md)
- [Design Flash Sale](system-design-questions/flash-sale.md)
- [Design the HashTag Service](system-design-questions/hashtag-service.md)
- [Design an Image Service](system-design-questions/image-service.md)
- [Design Text-based Live Commentary](system-design-questions/live-commentary.md)
- [Design a Load Balancer](system-design-questions/load-balancer.md)
- [Design Who's Near Me Service](system-design-questions/near-me.md)
- [Design Newly Unread Message Indicator](system-design-questions/newly-unread-indicator.md)
- [Design OnePic](system-design-questions/onepic.md)
- [Design an Online Offline Indicator](system-design-questions/online-offline-indicator.md)
- [Design Synchronized Queue Consumers](system-design-questions/queue-consumers.md)
- [Design Realtime Claps](system-design-questions/realtime-claps.md)
- [Design a Realtime Database](system-design-questions/realtime-db.md)
- [Design Recent Searches](system-design-questions/recent-searches.md)
- [Design S3](system-design-questions/s3.md)
- [Design a SQL backed Message Broker](system-design-questions/sql-broker.md)
- [Design SQL backed KV Store](system-design-questions/sql-kv.md)
- [Design a Superfast KV Store](system-design-questions/superfast-kv.md)
- [Design Photo Tagging](system-design-questions/tagging-photos-with-people.md)
- [Design a Distributed Task Scheduler](system-design-questions/task-scheduler.md)
- [Design a Text-based Search Engine](system-design-questions/text-search-engine.md)
- [Design User Affinity](system-design-questions/user-affinity.md)
- [Design a Video Processing Pipeline for Streaming Service](system-design-questions/video-pipeline.md)
- [Design a Word Dictionary](system-design-questions/word-dictionary.md)

## How to Use

1. Pick a problem from the list.
2. Read the requirements carefully.
3. Sketch the architecture, APIs, storage model, and scaling strategy.
4. Build the suggested prototype to validate the core idea.
5. Revisit the design and improve tradeoffs around reliability, latency,
   consistency, cost, and operability.

## Topics Covered

- Distributed systems
- Databases and key-value stores
- Caching and load balancing
- Queues and message brokers
- Search and indexing
- Realtime updates
- Media processing
- Object storage
- Product-scale system design
