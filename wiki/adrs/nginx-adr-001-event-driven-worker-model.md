---
title: "nginx ADR 001: Event-driven worker model"
type: adr
status: accepted
project: nginx
decision_date: 2026-05-29
sources:
  - ../../raw_sources/aosa/nginx.md
components:
  - ../components/event-loop.md
quality_attributes:
  - ../quality-attributes/performance.md
  - ../quality-attributes/scalability.md
patterns:
  - ../patterns/event-driven-architecture.md
---

# ADR: Event-driven Worker Model

## Context

nginx targets high concurrency, high performance, and low memory use,
especially when many clients keep connections open or send data slowly. A
process-per-connection or thread-per-connection model would increase memory,
context switching, and lock contention for that workload.

## Decision

Use a master-worker process model where workers process many connections through
non-blocking event loops and operating system event notification APIs.

## Consequences

- nginx can handle many concurrent connections with a small worker set.
- The runtime avoids much per-connection process and thread overhead.
- Blocking operations inside a worker are dangerous because one worker may be
  responsible for many active connections.
- Asynchronous control flow is more complex than a blocking per-request model.

## Considered Options

- Selected: event-driven, non-blocking workers.
- Rejected: process-per-connection or thread-per-connection request handling for
  the high-concurrency workload described in the source note.

## Links

- Project: [nginx](../projects/nginx.md)
- Functional requirements:
  [nginx requirements](../projects/nginx.md#functional-requirements)
- Component: [event loop](../components/event-loop.md)
- Pattern: [event-driven architecture](../patterns/event-driven-architecture.md)
- Quality attributes: [performance](../quality-attributes/performance.md),
  [scalability](../quality-attributes/scalability.md)
- Source note: [raw_sources/aosa/nginx.md](../../raw_sources/aosa/nginx.md)
