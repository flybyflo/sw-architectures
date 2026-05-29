---
title: Event loop
type: component
status: reviewed
projects:
  - ../projects/nginx.md
sources:
  - ../../raw_sources/aosa/nginx.md
---

# Event Loop

## Responsibility

The event loop coordinates non-blocking I/O and module callbacks so nginx
workers can process many connections without assigning one process or thread to
each connection.

## Collaborators

- nginx worker processes.
- Operating system event APIs such as epoll, kqueue, and event ports.
- nginx core and modules.

## State And Interfaces

The event loop operates over worker-local connection and request state. It
consumes readiness notifications from the operating system and dispatches
request-processing work through nginx core and module logic.

## Project Uses

- [nginx](../projects/nginx.md): uses event loops inside workers to support
  high concurrency and low memory use.

## Related Decisions

- [nginx ADR 001: Event-driven worker model](../adrs/nginx-adr-001-event-driven-worker-model.md)
