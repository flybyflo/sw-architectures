# ZeroMQ

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 2, "ZeroMQ": https://aosabook.org/en/v2/zeromq.html

## Project Purpose

ZeroMQ is a high-performance messaging library. Its architecture provides socket-like messaging patterns, queues, transports, and IO threads so applications can build distributed communication without a central broker by default.

## Architectural Style

- Messaging library architecture
- Brokerless messaging
- Socket pattern architecture
- Asynchronous IO architecture

## Main Components

- Context
- Sockets
- Message queues
- IO threads
- Transports
- Pipes
- Polling
- Messaging patterns such as request-reply, pub-sub, and pipeline

## Interfaces

- ZeroMQ socket API
- Transport interfaces such as TCP and IPC
- Polling interface
- Message frame interface
- Pattern-specific socket semantics
- Language bindings

## Data and State Management

- Applications send and receive message frames through sockets.
- Socket types define routing and communication semantics.
- Internal queues buffer messages between application threads and IO threads.
- Transports move messages across processes or networks.
- Multipart messages preserve frame boundaries.

## Quality Attributes

- Performance through asynchronous IO and batching
- Scalability through lightweight messaging patterns
- Modifiability through simple socket abstractions
- Portability through language bindings and transports
- Reliability tradeoffs depending on pattern and topology

## Key Architectural Decisions

- Expose messaging patterns through socket types.
- Avoid requiring a central broker for many use cases.
- Use asynchronous internal queues and IO threads.
- Preserve message boundaries rather than raw byte streams.
- Provide multiple transports behind a common API.

## Tradeoffs

- Brokerless messaging reduces infrastructure but shifts topology design to applications.
- Socket patterns are simple to use but have specific semantics that must be understood.
- Internal buffering improves throughput but can hide backpressure.
- Reliability depends on explicit pattern and application choices.

## Useful Wiki Pages To Create Later

- wiki/projects/zeromq.md
- wiki/components/message-socket.md
- wiki/components/io-thread.md
- wiki/patterns/publish-subscribe.md
- wiki/quality-attributes/performance.md
