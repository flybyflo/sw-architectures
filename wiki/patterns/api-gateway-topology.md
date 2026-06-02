---
title: API Gateway Topology Tradeoffs
type: pattern
status: reviewed
projects: []
sources:
  - ../../raw_sources/extra_sources/bytebytego-api-gateway.md
---

# API Gateway Topology Tradeoffs

## Summary

API Gateway topology compares two client-service shapes: clients can call
backend services directly, or they can enter through a single gateway that
routes, authenticates, transforms, rate-limits, observes, and optionally
aggregates requests.

## Forces

- Clients need stable APIs even when backend services change.
- Cross-cutting concerns should not be duplicated across every service.
- A gateway can simplify clients but becomes critical shared infrastructure.
- Direct service access can reduce an extra hop but increases client knowledge
  of backend topology and policy.

## Project Uses

- [API Gateway](../components/api-gateway.md): the component page documents the
  gateway responsibilities, public interface, backend interfaces, identity
  provider integration, routing configuration, and rate-limiting state.
- [Load Balancing](load-balancing.md): load balancers and gateways both mediate
  entry traffic, but a gateway normally owns application-layer policy and API
  composition.

## Tradeoffs

- **Client simplicity vs. gateway criticality**: gateway routing hides backend
  topology from clients, but the gateway must be redundant and carefully
  operated.
- **Policy centralization vs. blast radius**: authentication, authorization,
  throttling, logging, and metrics are easier to standardize at one entry
  point, but a bad gateway rule can affect many services.
- **Latency vs. composition**: direct client-to-service calls can avoid one hop,
  while gateway aggregation can reduce client round trips for composed
  responses.
- **Modifiability vs. coupling**: backend services can change behind a stable
  gateway interface, but gateway composition can become coupled to backend data
  contracts.

## Related Pages

- [API Gateway](../components/api-gateway.md)
- [Load Balancing](load-balancing.md)
- [Security](../quality-attributes/security.md)
- [Scalability](../quality-attributes/scalability.md)
- [Reliability](../quality-attributes/reliability.md)
