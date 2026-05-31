---
title: nginx
type: project
status: reviewed
sources:
  - ../../raw_sources/aosa/nginx.md
adrs:
  - ../adrs/nginx-adr-001-event-driven-worker-model.md
components:
  - ../components/event-loop.md
patterns:
  - ../patterns/event-driven-architecture.md
quality_attributes:
  - ../quality-attributes/performance.md
  - ../quality-attributes/scalability.md
  - ../quality-attributes/security.md
---

# nginx

## Concise Architecture Summary

Workers multiplex events.
Connections remain non-blocking.
Blocking work limits throughput.

## Context

nginx is a web server, reverse proxy, load balancer, cache, and edge server
designed for high concurrency, high performance, and low memory use. Its source
note emphasizes workloads with many open or slow client connections.

## Functional Requirements

- Serve HTTP clients and static files.
- Proxy requests to upstream systems such as FastCGI, uWSGI, SCGI, and HTTP
  proxy backends.
- Provide load balancing, filtering, caching, logging, and configuration-driven
  behavior.
- Reconfigure and upgrade with little or no service interruption.

## Main Components

- Master process: validates configuration, manages sockets, supervises workers,
  and coordinates reconfiguration and binary upgrades.
- Worker processes: accept connections and perform request processing,
  proxying, filtering, caching, and most runtime behavior.
- [Event loop](../components/event-loop.md): coordinates non-blocking I/O and
  module callbacks inside workers.
- Modules: implement protocol handling, filters, upstream proxying, variables,
  load balancing, and other features.
- Cache loader and cache manager: load cache metadata and expire cached content.

## Interfaces

- HTTP client interface.
- Upstream server interfaces, including proxy HTTP, FastCGI, uWSGI, and SCGI.
- Operating system event APIs such as epoll, kqueue, and event ports.
- Filesystem interfaces for static files, logs, and cache storage.
- `nginx.conf` and included configuration files.

## Data And State Management

Worker processes hold runtime connection and request state. Configuration is
read by the master process and inherited by workers in a compiled read-only
form. Cache metadata is shared in memory, while cached responses live as files
in a hierarchical on-disk cache.

## Quality Attributes

- [Performance](../quality-attributes/performance.md): non-blocking event
  processing avoids per-connection process or thread overhead.
- [Scalability](../quality-attributes/scalability.md): a small worker set can
  handle many concurrent connections.
- Resource efficiency: workers avoid shared mutable state where possible to
  reduce contention.
- Availability: master-managed reconfiguration and upgrades reduce downtime.
- [Security](../quality-attributes/security.md): workers can run unprivileged
  while the master handles privileged setup.

## Key Architecture Decisions

- [Use an event-driven worker model](../adrs/nginx-adr-001-event-driven-worker-model.md).
- Separate master-process control duties from worker request processing.
- Use operating system event notification for scalable I/O.
- Implement most web-server behavior as modules around a small core.

## Tradeoffs

The event-driven model improves concurrency and resource efficiency, but it
makes asynchronous control flow more complex. Blocking disk operations or
embedded scripts can stall a worker that is serving many connections.

## Links

- Source note: [raw_sources/aosa/nginx.md](../../raw_sources/aosa/nginx.md)
- Pattern: [event-driven architecture](../patterns/event-driven-architecture.md)
