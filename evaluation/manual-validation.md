# Architecture Wiki Manual Validation Report

This document records the manual validation process and scoring for the 18
selected software architecture questions. It also records retrieval coverage for
all 24 provided testing questions in
`questions/typical-architecture-questions.md`.

## Evaluation Summary Table

| ID | Question | Category | Retrieval Method | Retrieved Pages | Correctness | Completeness | Notes / Gap Identified | Wiki Fix Needed? |
|---|---|---|---|---|---:|---:|---|---:|
| Q01 | nginx components and process interaction | Components & Interfaces | index | `wiki/projects/nginx.md`, `wiki/components/event-loop.md`, `wiki/adrs/nginx-adr-001-event-driven-worker-model.md` | 5/5 | 5/5 | Correctly separates master duties from worker request processing. | No |
| Q02 | Git storage and integrity | Data & State Management | index | `wiki/projects/git.md`, `wiki/components/object-database.md`, `wiki/patterns/content-addressed-storage.md` | 5/5 | 5/5 | Correctly links immutable objects, references, index, and content identity. | No |
| Q03 | MediaWiki patterns and caching | Patterns | index | `wiki/projects/mediawiki.md`, `wiki/components/plugin-system.md`, `wiki/patterns/caching-strategies.md` | 5/5 | 5/5 | Covers layered request handling, hooks, and caching tradeoffs. | No |
| Q04 | HDFS reliability and replication | Quality Attributes | index | `wiki/projects/hadoop-hdfs.md`, `wiki/components/namenode.md`, `wiki/quality-attributes/reliability.md` | 5/5 | 5/5 | Correctly explains NameNode/DataNode split, replication, checksums, and direct data streaming. | No |
| Q05 | LLVM IR and modularity | Components & Interfaces | index | `wiki/projects/llvm.md`, `wiki/components/intermediate-representation.md` | 5/5 | 5/5 | Correctly describes LLVM IR as the compiler boundary. | No |
| Q06 | Scalable web architecture | High-Level Design | index + qmd | `wiki/patterns/load-balancing.md`, `wiki/patterns/caching-strategies.md`, `wiki/patterns/database-sharding.md`, `wiki/patterns/asynchronous-messaging.md` | 5/5 | 5/5 | Uses reviewed generic pages for the evaluated scalable-web components. | No |
| Q07 | Architectural styles | Patterns | index + qmd | `wiki/patterns/client-server.md`, `wiki/patterns/layered-architecture.md`, `wiki/patterns/event-driven-architecture.md`, `wiki/patterns/asynchronous-messaging.md`, `wiki/patterns/event-sourcing.md` | 5/5 | 5/5 | Reviewed pages cover the evaluated styles, including event sourcing. | No |
| Q08 | API Gateway rationale | Components & Interfaces | index | `wiki/components/api-gateway.md`, `wiki/quality-attributes/security.md`, `wiki/quality-attributes/scalability.md` | 5/5 | 5/5 | Reviewed API Gateway component now supports the answer. | No |
| Q09 | Async messaging topologies | Patterns | index | `wiki/patterns/asynchronous-messaging.md`, `wiki/components/message-broker.md` | 5/5 | 5/5 | Reviewed queue/pub-sub/stream coverage now exists. | No |
| Q10 | API Gateway internals | Components & Interfaces | index | `wiki/components/api-gateway.md` | 5/5 | 5/5 | Reviewed component page covers public API, policy, identity, and backend interfaces. | No |
| Q11 | Caching strategies | Data & State Management | index | `wiki/patterns/caching-strategies.md`, `wiki/quality-attributes/consistency.md` | 5/5 | 5/5 | Reviewed pages cover consistency and latency tradeoffs. | No |
| Q12 | Database sharding | Data & State Management | index | `wiki/patterns/database-sharding.md`, `wiki/quality-attributes/scalability.md`, `wiki/quality-attributes/consistency.md` | 5/5 | 5/5 | Reviewed page covers shard-key and rebalancing tradeoffs. | No |
| Q13 | Distributed reliability | Quality Attributes | index | `wiki/patterns/distributed-reliability.md`, `wiki/quality-attributes/reliability.md`, `wiki/quality-attributes/availability.md` | 5/5 | 5/5 | Reviewed pages cover retries, circuit breakers, bulkheads, and rate limiting. | No |
| Q14 | nginx quality attributes | Quality Attributes | index | `wiki/projects/nginx.md`, `wiki/quality-attributes/performance.md`, `wiki/quality-attributes/scalability.md`, `wiki/quality-attributes/availability.md` | 5/5 | 5/5 | Correctly connects event-driven workers to performance, scalability, and availability. | No |
| Q15 | MediaWiki quality tradeoffs | Quality Attributes | index | `wiki/projects/mediawiki.md`, `wiki/components/plugin-system.md`, `wiki/quality-attributes/modifiability.md`, `wiki/quality-attributes/security.md` | 5/5 | 5/5 | Correctly captures modifiability/performance/security tension. | No |
| Q16 | Eclipse/Jitsi/MediaWiki extensibility | Cross-Project | index | `wiki/projects/eclipse.md`, `wiki/projects/jitsi.md`, `wiki/projects/mediawiki.md`, `wiki/components/plugin-system.md`, `wiki/patterns/plugin-architecture.md` | 5/5 | 5/5 | Reviewed project and pattern pages now support the comparison. | No |
| Q17 | nginx vs HDFS scalability | Cross-Project | index | `wiki/projects/nginx.md`, `wiki/projects/hadoop-hdfs.md`, `wiki/quality-attributes/scalability.md` | 5/5 | 5/5 | Clear comparison of connection concurrency vs distributed block storage. | No |
| Q22 | Remaining reviewed-layer gaps | Coverage Gaps | index + directory inspection | `wiki/index.md`, `questions/typical-architecture-questions.md` | 5/5 | 5/5 | Accurately reports remaining reviewed gaps instead of claiming empty folders. | No |

Average Correctness Score: 5.0 / 5.0

Average Completeness Score: 5.0 / 5.0

## Validation Notes

### Factuality

Generated answers were checked against reviewed wiki pages first. Raw source
fallback remains visible only for topics that do not yet have reviewed pages,
such as remaining source-only AOSA projects, Observability, Service Discovery,
and detailed load-balancer internals.

### Format Compliance

Each answer in `evaluation/evaluation-results.md` follows:

- Question
- Pages consulted
- Answer
- Sources used

### Coverage Findings

The previous broad gap in generic distributed-systems pages has been closed for
the evaluation scope. Remaining gaps are narrower: unreviewed AOSA projects,
Observability, Service Discovery, detailed load-balancer internals, and a
larger long-tail of specialized component and pattern pages.

### Full Question Bank Retrieval Coverage

The full 24-question bank is checked with real QMD retrieval:

```bash
node scripts/check-questions.mjs
```

Supplemental questions outside the 18-question scored set now have reviewed
coverage:

| ID | Retrieval Coverage | Reviewed Pages |
|---|---|---|
| Q18 | Pass | `wiki/projects/git.md`, `wiki/projects/mercurial.md` |
| Q19 | Pass | `wiki/components/api-gateway.md`, `wiki/patterns/api-gateway-topology.md` |
| Q20 | Pass | `wiki/projects/eclipse.md`, `wiki/projects/mediawiki.md`, `wiki/projects/moodle.md`, `wiki/patterns/plugin-architecture.md` |
| Q21 | Pass | `wiki/projects/git.md`, `wiki/components/object-database.md`, `wiki/quality-attributes/security.md` |
| Q23 | Pass | `wiki/index.md`, `raw_sources/aosa/catalog.md` |
| Q24 | Pass | `wiki/components/api-gateway.md`, `wiki/components/message-broker.md`, `wiki/patterns/caching-strategies.md`, `wiki/patterns/asynchronous-messaging.md` |

### Workflow Evidence

The evaluated workflow is:

1. read `wiki/index.md`
2. open reviewed pages
3. use QMD retrieval when needed
4. fall back to `raw_sources/` only when reviewed coverage is incomplete
5. validate structure with `node scripts/validate-wiki.mjs`
6. validate retrieval coverage with `node scripts/check-questions.mjs`
