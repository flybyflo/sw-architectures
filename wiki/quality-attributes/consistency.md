---
title: Consistency
type: quality-attribute
status: reviewed
projects:
  - ../projects/git.md
sources:
  - ../../raw_sources/extra_sources/bytebytego-caching-strategies.md
  - ../../raw_sources/extra_sources/bytebytego-database-sharding.md
  - ../../raw_sources/aosa/git.md
---

# Consistency

## Definition In This Wiki

Consistency defines the system guarantees regarding state uniformity across multiple replicas or nodes at any given point in time. It spans from highly immediate consistency (where reads see synchronized updates across cache and database, e.g., write-through caching) to eventual consistency (where replicas converge gradually after a delay, e.g., Git clones).

## Project Comparisons

- [Git](../projects/git.md): Git is eventually consistent by design. Developers work on local content-addressed history copies and synchronize branches asynchronously via push and pull operations, accepting divergence and manual merge reconciliation.
- [ByteByteGo Caching Strategies source note](../../raw_sources/extra_sources/bytebytego-caching-strategies.md): Discusses the consistency impact of caching strategies. Write-through caching updates the cache and database together to improve consistency guarantees at the cost of write latency, whereas cache-aside or write-back caching introduces stale-read windows.
- [ByteByteGo Database Sharding source note](../../raw_sources/extra_sources/bytebytego-database-sharding.md): Multi-shard systems must deal with the extreme difficulty of maintaining cross-shard consistency or global constraints, often settling for localized single-shard consistency.

## Supporting Decisions And Patterns

- [Caching Strategies](../patterns/caching-strategies.md): Cache invalidation event patterns are required to minimize the window of inconsistency.
- [Git ADR 001: Content-addressed storage](../adrs/git-adr-001-content-addressed-storage.md): Git's content hashes bind object identity and integrity, allowing distributed clones to verify history consistency via content-addressing.

## Tradeoffs

- **Consistency vs. Performance/Latency**: Enforcing high consistency (e.g., synchronous writes or cache invalidation coordination) requires additional network and database operations, significantly increasing write latency and decreasing throughput.
- **Consistency vs. System Availability**: Restricting access to cache entries or database shards to guarantee complete consistency during replica failures or network partitions can lead to blocking requests, directly lowering system availability.
