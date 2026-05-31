---
title: Event-driven architecture
type: pattern
status: reviewed
projects:
  - ../projects/nginx.md
sources:
  - ../../raw_sources/aosa/nginx.md
---

# Event-driven Architecture

## Summary

Event-driven architecture handles many activities by reacting to events and I/O
readiness rather than dedicating one process or thread to each connection.

## Forces

- Many clients may keep connections open or send data slowly.
- Per-connection processes or threads can add memory and scheduling overhead.
- Blocking work can harm unrelated connections handled by the same event loop.

## Project Uses

- [nginx](../projects/nginx.md): uses non-blocking worker event loops and
  operating system event APIs for high concurrency.

## Tradeoffs

Event-driven processing improves concurrency and resource efficiency. It also
increases control-flow complexity and makes blocking operations inside a worker
particularly harmful to throughput.

## Related Pages

- [Event loop](../components/event-loop.md)
- [Performance](../quality-attributes/performance.md)
- [Scalability](../quality-attributes/scalability.md)
