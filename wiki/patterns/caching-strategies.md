---
title: Caching Strategies
type: pattern
status: reviewed
projects: [mediawiki]
sources: [../../raw_sources/extra_sources/bytebytego-caching-strategies.md, ../../raw_sources/aosa/mediawiki.md]
---

# Caching Strategies

## Summary

Caching is an architectural pattern that stores previously computed or retrieved data closer to consumers in a fast-access storage layer (RAM). Caching can appear as local in-memory caches, distributed cache clusters, CDNs, or browser storage, serving to drastically reduce latency and decrease database or downstream service load.

## Forces

- **High Read-to-Write Ratio**: Systems with frequent reads of relatively static data benefit most from caching.
- **Latency Sensitivity**: Slow external databases or API calls can be bypassed.
- **Spike Tolerance**: Protects origin servers during sudden traffic spikes.

## Project Uses

- `../../raw_sources/extra_sources/bytebytego-caching-strategies.md`: defines cache-aside, read-through, write-through, and write-back caching.
- `../projects/mediawiki.md`: MediaWiki relies heavily on layered caching—including HTTP reverse proxies, application-level object caching, and database caches—to protect the PHP request path.

## Tradeoffs

### Benefits
- **Drastic Latency Reduction**: RAM lookups are orders of magnitude faster than disk reads or network hops.
- **Cost Reduction**: Reduces compute resource requirements on database servers.

### Costs
- **Stale Data (Consistency)**: Cache invalidation is notoriously difficult, risking serving outdated state to clients.
- **Durability Risks (Write-back)**: Caching writes in volatile RAM before writing to disk exposes data to loss during power or node failures.
- **Complexity**: Adds multiple deployment components and application-level logic for handling cache misses, invalidations, and eviction policies.

## Related Pages

- `../quality-attributes/performance.md`
- `../quality-attributes/scalability.md`
- `../components/plugin-system.md`
