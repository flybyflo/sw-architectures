# ByteByteGo: Caching Strategies

This is an optional raw source-layer note for the Architecture Wiki. It
summarizes architecture concepts from ByteByteGo and should be used to enrich
performance, scalability, data/state, and reliability pages after review.

## Source References

- ByteByteGo Newsletter, "A Guide to Top Caching Strategies":
  https://blog.bytebytego.com/p/a-guide-to-top-caching-strategies
- ByteByteGo Newsletter, "Top caching strategies":
  https://blog.bytebytego.com/p/top-caching-strategies

## Source Purpose

These sources describe caching as an architectural tactic for lowering latency,
reducing load on databases and remote services, and improving behavior during
traffic spikes. They are useful for quality-attribute pages because caching has
clear tradeoffs between performance, consistency, durability, and operational
complexity.

## Architecture Concepts

- Caches store previously computed or retrieved data closer to consumers.
- Caching can appear in local process memory, distributed cache clusters, edge
  CDNs, database caches, or application-specific materialized views.
- Cache strategy must define how data is read, written, invalidated, and evicted.
- Caching improves read behavior only when the cached data is correct enough for
  the use case.

## Main Components

- Application service.
- Source of truth, usually a database or remote service.
- Local cache.
- Distributed cache.
- CDN or edge cache.
- Cache invalidation mechanism.
- Eviction policy.
- Cache key design.

## Interfaces

- Application-to-cache get/set/delete interface.
- Application-to-database read/write interface.
- Cache invalidation event interface.
- CDN cache-control and HTTP header interface.
- Monitoring interface for hit rate, miss rate, eviction, latency, and stale
  data incidents.

## Data and State Management

- Cache-aside: the application reads from cache first, loads from the source of
  truth on miss, then writes the result into cache.
- Read-through: the cache layer loads missing data from the source.
- Write-through: writes update cache and source together.
- Write-around: writes bypass the cache, usually to avoid polluting it.
- Write-back: writes go to cache first and are asynchronously persisted.
- Eviction removes data based on age, usage, size, or custom policies.
- Invalidation removes or refreshes stale entries after source data changes.

## Quality Attributes

- Performance: cache hits reduce latency and repeated computation.
- Scalability: caches reduce load on databases and backend services.
- Availability: cached data can sometimes serve traffic during partial backend
  failures.
- Consistency: stale reads are a central risk.
- Durability: write-back caches require careful failure handling.
- Operability: cache behavior must be observable and tunable.

## Tradeoffs

- Higher hit rates can improve performance, but cache invalidation becomes more
  important.
- Write-through improves consistency but adds write latency.
- Write-back improves write latency but increases durability risk.
- Cache-aside is simple and common, but the application owns cache-miss and
  invalidation logic.
- Distributed caches improve scalability, but introduce network latency and
  cluster operations.

## Useful Wiki Pages To Create Later

- `wiki/patterns/cache-aside.md`
- `wiki/patterns/write-through-cache.md`
- `wiki/components/cache.md`
- `wiki/components/cdn.md`
- `wiki/quality-attributes/performance.md`
- `wiki/quality-attributes/scalability.md`
- `wiki/quality-attributes/availability.md`
- `wiki/quality-attributes/consistency.md`
