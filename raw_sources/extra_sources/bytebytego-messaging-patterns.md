# ByteByteGo: Messaging Patterns

This is an optional raw source-layer note for the Architecture Wiki. It
summarizes architecture concepts from ByteByteGo and should be used to enrich
event-driven, reliability, interface, and data-flow pages after review.

## Source References

- ByteByteGo Newsletter, "Messaging Patterns Explained: Pub-Sub, Queues, and
  Event Streams":
  https://blog.bytebytego.com/p/messaging-patterns-explained-pub
- ByteByteGo Newsletter, "Must-Know Message Broker Patterns":
  https://blog.bytebytego.com/p/must-know-message-broker-patterns
- ByteByteGo Newsletter, "Message Brokers 101: Storage, Replication, and
  Delivery Guarantees":
  https://blog.bytebytego.com/p/message-brokers-101-storage-replication

## Source Purpose

These sources explain asynchronous messaging as a way to decouple services in
distributed systems. This material is useful for project comparisons around
event-driven architecture, reliability, interface design, state replay, and
scalability.

## Architecture Concepts

- Messaging decouples producers from consumers in time and topology.
- A producer can hand work to a broker without waiting for a consumer to finish.
- Brokers can buffer traffic spikes and protect downstream services.
- Queues, pub-sub, and event streams solve different communication problems.
- Delivery guarantees, ordering, retries, idempotency, and dead-letter handling
  are core architectural concerns.

## Main Components

- Producer.
- Consumer.
- Message broker.
- Queue.
- Topic.
- Partition or stream.
- Consumer group.
- Dead-letter queue.
- Retry policy.
- Schema or message contract.
- Observability and tracing tools.

## Interfaces

- Producer-to-broker publish interface.
- Consumer subscription or polling interface.
- Message schema interface.
- Acknowledgment interface.
- Retry and dead-letter interface.
- Monitoring interface for lag, throughput, delivery failures, and queue depth.

## Data and State Management

- Queue patterns usually distribute tasks so each message is handled by one
  consumer.
- Publish-subscribe patterns fan out messages to multiple subscribers.
- Event streams keep a durable ordered log that consumers can replay.
- Broker state may include stored messages, offsets, partitions, replicas, and
  delivery metadata.
- Consumers often need idempotent handlers because messages may be retried.
- Message ordering may be local to a queue, partition, or key rather than global.

## Quality Attributes

- Reliability: brokers can retain work while consumers are down.
- Scalability: consumers can be added to process more messages.
- Modifiability: producers and consumers can evolve independently when message
  contracts are stable.
- Availability: asynchronous boundaries can prevent one slow service from
  blocking an entire request chain.
- Observability: queue depth, lag, retries, and dead letters expose system
  health.
- Consistency: distributed workflows require careful handling of ordering,
  exactly-once assumptions, idempotency, and eventual consistency.

## Tradeoffs

- Messaging improves decoupling but makes system behavior less direct than
  synchronous request-response.
- Queues are good for task distribution, but not for broadcasting one event to
  many consumers.
- Pub-sub supports fanout, but consumers may need their own state and replay
  strategy.
- Event streams support replay and auditability, but require log retention,
  offset management, and partition design.
- Async systems reduce blocking, but debugging and tracing become more important.

## Useful Wiki Pages To Create Later

- `wiki/patterns/message-queue.md`
- `wiki/patterns/publish-subscribe.md`
- `wiki/patterns/event-stream.md`
- `wiki/patterns/event-driven-architecture.md`
- `wiki/components/message-broker.md`
- `wiki/components/dead-letter-queue.md`
- `wiki/quality-attributes/reliability.md`
- `wiki/quality-attributes/scalability.md`
- `wiki/quality-attributes/observability.md`
