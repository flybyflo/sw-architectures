---
title: Consistency
type: quality-attribute
status: reviewed
projects: [git]
sources: [../../raw_sources/extra_sources/bytebytego-caching-strategies.md, ../../raw_sources/extra_sources/bytebytego-database-sharding.md, ../../raw_sources/aosa/git.md]
---

# Consistency

## Definition In This Wiki

Consistency defines the system guarantees regarding state uniformity across multiple replicas or nodes at any given point in time. It spans from strong consistency (where all reads return the most recent write immediately, e.g., write-through caching, transactional databases) to eventual consistency (where replicas converge gradually after a delay, e.g., git clones).

## Project Comparisons

- `../projects/git.md`: Git is eventually consistent by design. Developers work on local content-addressed history copies and synchronize branches asynchronously via push and pull operations, accepting divergence and manual merge reconciliation.
- `../../raw_sources/extra_sources/bytebytego-caching-strategies.md`: Discusses the consistency impact of caching strategies. Write-through caching achieves strong consistency between RAM and DB but adds latency, whereas cache-aside or write-back caching introduces stale-read windows.
- `../../raw_sources/extra_sources/bytebytego-database-sharding.md`: Multi-shard systems must deal with the extreme difficulty of maintaining cross-shard consistency or global constraints, often settling for localized single-shard consistency.

## Supporting Decisions And Patterns

- `../patterns/caching-strategies.md`: Cache invalidation event patterns are required to minimize the window of inconsistency.
- `../adrs/git-adr-001-content-addressed-storage.md`: Git's cryptographic content hashes guarantee absolute history and object consistency: tampering with any past version produces a completely different hash tree.

## Tradeoffs

- **Consistency vs. Performance/Latency**: Enforcing strong consistency (e.g., synchronous replication or distributed locks) requires coordinated network round-trips, significantly increasing write latency and decreasing throughput.
- **Consistency vs. Availability (CAP Theorem)**: Restricting operations to guarantee strict consistency during network partitions means the system must refuse writes or reads, directly lowering system availability.
