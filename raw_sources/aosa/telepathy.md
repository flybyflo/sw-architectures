# Telepathy

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 1, "Telepathy": https://aosabook.org/en/v1/telepathy.html

## Project Purpose

Telepathy is a real-time communications framework for instant messaging, voice, video, and collaboration applications. It separates client applications from protocol-specific connection managers through D-Bus interfaces.

## Architectural Style

- D-Bus service architecture
- Protocol adapter architecture
- Component-based communication framework
- Client-manager separation

## Main Components

- Client applications
- Connection managers
- Accounts
- Connections
- Channels
- Channel dispatching
- Protocol implementations
- D-Bus interfaces

## Interfaces

- D-Bus service interfaces
- Protocol-specific network interfaces
- Channel interfaces for text, calls, files, and presence
- Account management interface
- Client handler and observer interfaces

## Data and State Management

- Accounts store user protocol configuration.
- Connections represent live protocol sessions.
- Channels represent conversations, calls, transfers, and presence interactions.
- D-Bus objects expose communication state across processes.
- Connection managers translate protocol state into shared Telepathy abstractions.

## Quality Attributes

- Interoperability across messaging protocols
- Modifiability through protocol-specific connection managers
- Reuse by multiple desktop clients
- Security and isolation through process boundaries
- Complexity from asynchronous D-Bus interactions

## Key Architectural Decisions

- Use D-Bus as the common integration mechanism.
- Separate UI clients from protocol connection managers.
- Represent communication activities as channels.
- Define protocol-neutral interfaces for common real-time communication concepts.
- Allow multiple clients to observe and handle communication events.

## Tradeoffs

- Protocol-neutral abstractions improve reuse but may not fit all protocol-specific features.
- D-Bus process separation improves integration but adds asynchronous complexity.
- Connection managers isolate protocols but increase the number of moving parts.
- Desktop-wide sharing is powerful but requires careful ownership and dispatch rules.

## Useful Wiki Pages To Create Later

- wiki/projects/telepathy.md
- wiki/components/connection-manager.md
- wiki/components/channel-dispatcher.md
- wiki/patterns/protocol-adapter.md
- wiki/quality-attributes/interoperability.md
