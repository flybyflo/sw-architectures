---
title: Load Balancing
type: pattern
status: reviewed
projects:
  - ../projects/nginx.md
sources:
  - ../../raw_sources/aosa/nginx.md
  - ../../raw_sources/aosa/scalable-web-architecture-distributed-systems.md
---

# Load Balancing

## Summary

Load balancing distributes client traffic across multiple backend servers or
service instances so no single node has to process all concurrent requests. In
scalable web architectures, it is an entry-layer tactic for horizontal
application scaling and failure isolation.

## Forces

- One server cannot handle all concurrent traffic.
- Backend nodes may fail or become overloaded.
- Clients should not need to know the full backend topology.

## Project Uses

- [nginx](../projects/nginx.md): can act as a reverse proxy and load balancer
  while using non-blocking workers for high-concurrency request handling.
- [Scalable web architecture source note](../../raw_sources/aosa/scalable-web-architecture-distributed-systems.md):
  treats load balancers as a core component for distributing traffic across
  replicated application nodes.

## Tradeoffs

- **Benefit**: traffic can be spread across replicated nodes, improving
  throughput and reducing single-server overload.
- **Cost**: load balancers become critical infrastructure and need redundancy,
  health checks, routing policy, and operational monitoring.
- **Client topology**: clients gain a simpler entry point, but backend routing
  becomes an infrastructure concern.

## Related Pages

- [Scalability](../quality-attributes/scalability.md)
- [Availability](../quality-attributes/availability.md)
- [API Gateway](../components/api-gateway.md)
