---
title: Asynchronous Messaging
type: pattern
status: reviewed
projects: []
sources:
  - ../../raw_sources/extra_sources/bytebytego-messaging-patterns.md
---

# Asynchronous Messaging

## Summary

Asynchronous messaging decouples producers from consumers by routing work or
events through queues, topics, or durable streams. Producers can publish without
waiting for a consumer to finish, while consumers process messages at their own
rate.

## Forces

- Producers and consumers should evolve independently.
- Traffic spikes need buffering so downstream services are not overloaded.
- Some workflows need broadcast fanout, while others need single-consumer task
  distribution or replayable event history.

## Project Uses

- No reviewed AOSA project is documented as using this exact generic messaging
  pattern in the current wiki.
- [ByteByteGo Messaging Patterns source note](../../raw_sources/extra_sources/bytebytego-messaging-patterns.md):
  defines queues, publish-subscribe topics, event streams, broker state, retry
  handling, and dead-letter handling.

## Topologies

- **Message queue**: each message is consumed by one worker, which makes queues
  useful for task distribution and load leveling.
- **Publish-subscribe**: a topic fans events out to multiple subscribers, which
  makes it useful when independent services need their own copy of an event.
- **Event stream**: a durable ordered log preserves events for replay, auditing,
  analytics, and independent consumer offsets.

## Tradeoffs

- Messaging improves decoupling and spike tolerance, but execution order becomes
  less direct than synchronous request-response.
- Queues are simple for task distribution, but they do not broadcast one event to
  many independent consumers.
- Pub-sub supports fanout, but consumers need their own replay or recovery
  strategy if messages are short-lived.
- Event streams support replay and auditability, but they require partition-key,
  offset, retention, and storage management.

## Related Pages

- [Message Broker](../components/message-broker.md)
- [Event-driven architecture](event-driven-architecture.md)
- [Reliability](../quality-attributes/reliability.md)
- [Scalability](../quality-attributes/scalability.md)
