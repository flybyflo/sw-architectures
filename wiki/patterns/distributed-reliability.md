---
title: Distributed Reliability
type: pattern
status: reviewed
projects: []
sources: [raw_sources/extra_sources/bytebytego-distributed-reliability.md]
---

# Distributed Reliability

## Summary

Distributed Systems fail inevitably due to node crashes, network partitions, dependency timeouts, and traffic overloads. Distributed Reliability is a set of patterns and design tactics—including exponential retries with jitter, circuit breakers, rate limiting, and bulkhead isolation—that absorb partial failures, prevent cascading collapses, and maintain overall service guarantees under stress.

## Forces

- **Unreliable Network Foundations**: Physical networks fail, drop packets, or partition.
- **Cascading Failures**: A slow dependency can tie up threads in upstream services, causing a complete system outage.
- **Abusive Traffic / Overload**: High volumes of requests can exhaust resources across the entire call graph.

## Project Uses

- `raw_sources/extra_sources/bytebytego-distributed-reliability.md`: details retries, circuit breakers, rate limiters, bulkheads, and health checks.
- `../projects/hadoop-hdfs.md`: HDFS NameNode detects DataNode failures via heartbeat timeouts and triggers block replication to restore the configured reliability level.
- `../projects/nginx.md`: nginx implements connection-level rate limiting and master-worker process isolation to prevent individual request failures from crashing the server.

## Tradeoffs

### Benefits
- **High System Availability**: Restricts the blast radius of any single failing dependency.
- **Self-Healing Capabilities**: Restores service automatically when transient network hiccups pass.

### Costs
- **Amplified Overload**: Standard retries without exponential backoff or randomized jitter can create a "thundering herd" effect, worsening a downstream outage.
- **Fallback Complexity**: Implementing circuit-breaker fallbacks requires alternative data paths or degraded UX (e.g., serving static defaults).
- **Testing Difficulties**: Simulating distributed failure scenarios (e.g., chaos engineering) requires extensive tooling and operational maturity.

## Related Pages

- `../quality-attributes/reliability.md`
- `../components/event-loop.md`
