---
title: Message Broker
type: component
status: reviewed
projects: []
sources: [raw_sources/extra_sources/bytebytego-messaging-patterns.md]
---

# Message Broker

## Responsibility

A Message Broker is a central mediation component that decouples message producers from message consumers in both time and topology. It buffers high-volume spikes in traffic, stores messages, coordinates routing, and ensures reliable delivery guarantees across distributed components.

## Collaborators

- **Producers**: Publish messages or events to queues, topics, or streams managed by the broker.
- **Consumers**: Subscribe to, or poll from, queues or partitions to process messages.
- **ZooKeeper / Raft Metadata Consensus Layer**: Often used by brokers (like Apache Kafka) to coordinate partition ownership, leader elections, and state replication.

## State And Interfaces

### Interfaces Exposed
- **Publish Interface**: High-performance TCP or HTTP API (e.g., AMQP, MQTT, Kafka protocol) allowing producers to write messages.
- **Subscription / Poll Interface**: Allows consumers to receive messages via push notifications or long-polling mechanisms.
- **Acknowledgment Interface**: Receives consumer confirmation of message processing, enabling broker offset commit or message removal.
- **Monitoring & Metrics**: Exposes queue depth, consumer lag, throughput, and error rates.

### State Owned or Tracked
- **Stored Messages / Event Logs**: Durable sequential byte queues or commit logs written to disk.
- **Consumer Offsets**: Tracks the last read message sequence or pointer per consumer group.
- **Partitions & Replica Maps**: Mapping of logical topics to physical nodes and tracking in-sync replicas (ISRs).
- **Dead-Letter Queue (DLQ)**: Storage for un-routable or repeatedly failed messages for manual inspection.

## Project Uses

- `raw_sources/extra_sources/bytebytego-messaging-patterns.md`: defines central message broker topologies including queues, pub-sub topics, and event streams.

## Related Decisions

- `../adrs/hdfs-adr-001-namenode-datanode-separation.md`: Hadoop NameNode uses a master-slave topology similar to a coordinated partition manager in clustered brokers.
