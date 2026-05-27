# Twisted

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 2, "Twisted": https://aosabook.org/en/v2/twisted.html

## Project Purpose

Twisted is an event-driven networking engine for Python. Its architecture centers on a reactor event loop, transports, protocols, deferred callbacks, and reusable network protocol implementations.

## Architectural Style

- Event-driven architecture
- Reactor pattern
- Asynchronous networking framework
- Protocol/transport separation

## Main Components

- Reactor
- Transports
- Protocols
- Factories
- Deferreds
- Protocol implementations
- Event sources
- Thread integration utilities

## Interfaces

- Reactor API
- Protocol interface
- Transport interface
- Deferred callback interface
- Factory interface
- Networking socket interfaces
- Application service interfaces

## Data and State Management

- The reactor tracks readiness events, timers, and callbacks.
- Protocols hold application-level connection state.
- Transports represent byte delivery mechanisms.
- Deferreds represent eventual results and callback chains.
- Factories create protocol instances for new connections.

## Quality Attributes

- Scalability through non-blocking IO
- Modifiability through protocol/transport separation
- Reusability through protocol implementations
- Performance for many concurrent connections
- Complexity around asynchronous control flow

## Key Architectural Decisions

- Use a reactor event loop for IO readiness and timers.
- Separate protocol logic from transport mechanics.
- Represent asynchronous results with Deferreds.
- Provide protocol implementations as reusable components.
- Avoid blocking operations in the event loop.

## Tradeoffs

- Event-driven IO scales well but makes control flow harder than blocking code.
- Deferred chains avoid threads but require careful error handling.
- Protocol/transport separation improves reuse but adds abstractions.
- Blocking libraries must be isolated or adapted.

## Useful Wiki Pages To Create Later

- wiki/projects/twisted.md
- wiki/components/reactor.md
- wiki/components/deferred.md
- wiki/patterns/event-driven-architecture.md
- wiki/quality-attributes/scalability.md
