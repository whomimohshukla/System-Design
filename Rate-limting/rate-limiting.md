                         ┌────────────────────────────┐
                         │        Client / User        │
                         └──────────────┬───────────────┘
                                        │  HTTP Request
                                        ▼
                         ┌────────────────────────────┐
                         │     Nginx / API Gateway      │  ← coarse global limit
                         └──────────────┬───────────────┘
                                        ▼
                         ┌────────────────────────────┐
                         │   Express Rate Limit MW      │  ← per-route / per-user
                         │  (reads/writes Redis)        │
                         └──────────────┬───────────────┘
                                        │
                         ┌──────────────┴───────────────┐
                         │                               │
                    ALLOWED                          BLOCKED (429)
                         │                               │
                         ▼                               ▼
                ┌─────────────────┐            ┌───────────────────┐
                │   Route Handler  │            │  Return Retry-After │
                └─────────────────┘            └───────────────────┘

                    Redis (shared state across all API instances)
                    ┌────────────────────────────────────┐
                    │ key: "rl:{userId}:{route}"          │
                    │ value: token count / timestamps     │
                    │ TTL: matches window size            │
                    └────────────────────────────────────┘