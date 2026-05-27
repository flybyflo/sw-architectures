# ByteByteGo: Software Architecture Patterns

This is an optional raw source-layer note for the Architecture Wiki. It
summarizes architecture concepts from ByteByteGo and should be used to enrich
pattern, component, and quality-attribute pages after review.

## Source References

- ByteByteGo Newsletter, "Software Architecture Patterns":
  https://blog.bytebytego.com/p/software-architecture-patterns
- ByteByteGo Newsletter, "EP107: Top 9 Architectural Patterns for Data and
  Communication Flow":
  https://blog.bytebytego.com/p/ep107-top-9-architectural-patterns

## Source Purpose

These sources provide modern system-design vocabulary for recurring software
architecture patterns. They are useful for cross-project comparison because AOSA
project pages often show concrete examples, while ByteByteGo gives reusable
pattern names and architectural vocabulary.

## Architecture Concepts

- Architectural patterns solve recurring structural design problems.
- Patterns provide a shared vocabulary for communicating design decisions.
- Patterns can describe system decomposition, communication flow, data flow, and
  deployment relationships.
- A project can combine multiple patterns instead of using only one style.

## Relevant Patterns

- Client-server: clients send requests to servers that provide data or services.
- Layered architecture: responsibilities are separated into layers with clearer
  boundaries.
- API gateway: client traffic enters through a single API front door.
- Publish-subscribe: producers publish events without directly knowing all
  consumers.
- Request-response: a client waits for a response from a service.
- Event sourcing: state changes are stored as a sequence of events.
- ETL: data is extracted, transformed, and loaded for downstream use.
- Batching: work is accumulated and processed together.
- Stream processing: data is processed continuously as it arrives.
- Orchestration: a central coordinator manages a workflow across components.

## Interfaces

- Request/response APIs between clients and services.
- Event interfaces between publishers, brokers, and consumers.
- Batch or stream interfaces between data producers and processors.
- Coordinator interfaces between orchestrators and workflow participants.

## Data and State Management

- Some patterns store current state directly, such as CRUD-style client-server
  applications.
- Some patterns store change history, such as event sourcing.
- Batch and stream patterns organize data by processing style and time horizon.
- Pub-sub and event-stream patterns treat events as the primary integration
  data.

## Quality Attributes

- Modifiability: patterns provide stable boundaries and shared vocabulary.
- Scalability: patterns such as pub-sub, batching, stream processing, and API
  gateways can reduce bottlenecks when used appropriately.
- Reliability: asynchronous and event-driven patterns can isolate failures, but
  also require retry, ordering, and idempotency handling.
- Performance: batching and caching-related patterns can reduce repeated work,
  but may increase latency for individual items.
- Understandability: pattern names help teams explain architecture decisions.

## Useful Wiki Pages To Create Later

- `wiki/patterns/client-server.md`
- `wiki/patterns/layered-architecture.md`
- `wiki/patterns/api-gateway.md`
- `wiki/patterns/publish-subscribe.md`
- `wiki/patterns/event-sourcing.md`
- `wiki/patterns/batching.md`
- `wiki/patterns/stream-processing.md`
- `wiki/quality-attributes/modifiability.md`
- `wiki/quality-attributes/scalability.md`
