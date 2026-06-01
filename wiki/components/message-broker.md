---
title: Message Broker
type: component
status: reviewed
projects: []
sources:
  - ../../raw_sources/extra_sources/bytebytego-messaging-patterns.md
---

# Message Broker

## Responsibility

A Message Broker is a central mediation component that decouples message producers from message consumers in both time and topology. It buffers high-volume spikes in traffic, stores messages, coordinates routing, and ensures reliable delivery guarantees across distributed components.

## Collaborators

- **Producers**: Publish messages or events to queues, topics, or streams managed by the broker.
- **Consumers**: Subscribe to, or poll from, queues or partitions to process messages.
- **Broker Coordination Layer**: Internal state replication and coordination mechanism used by clustered brokers to manage topic partitions, leader replication, and consumer offsets.

## State And Interfaces

### Interfaces Exposed
- **Publish Interface**: Protocol interface allowing producers to write messages.
- **Subscription / Poll Interface**: Allows consumers to receive messages via push notifications or long-polling.
- **Acknowledgment Interface**: Receives consumer confirmation of message processing, enabling broker offset commit or message removal.
- **Monitoring & Metrics**: Exposes queue depth, consumer lag, throughput, and error rates.

### State Owned or Tracked
- **Stored Messages / Event Logs**: Durable sequential message queues or event stream logs.
- **Consumer Offsets**: Tracks the last read message sequence or pointer per consumer group.
- **Partitions & Replication Maps**: Mapping of logical topics/queues to physical broker nodes.
- **Dead-Letter Queue (DLQ)**: Storage for un-routable or repeatedly failed messages for manual inspection.

## Project Uses

- [ByteByteGo Messaging Patterns source note](../../raw_sources/extra_sources/bytebytego-messaging-patterns.md): defines central message broker topologies including queues, pub-sub topics, and event streams.

## Related Decisions

- None.
