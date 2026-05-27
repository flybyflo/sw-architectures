# Jitsi

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 1, "Jitsi": https://aosabook.org/en/v1/jitsi.html

## Project Purpose

Jitsi is an audio/video communication and instant messaging application. Its architecture has to integrate many communication protocols, media processing, accounts, contacts, and user-interface features in a modular way.

## Architectural Style

- Plugin-based communication client
- OSGi service architecture
- Protocol adapter architecture
- Layered media architecture

## Main Components

- Protocol providers
- Account manager
- Contact list service
- Media service
- UI service
- Configuration service
- OSGi runtime
- Bundles for protocol and feature modules

## Interfaces

- Protocol provider service interfaces
- SIP, XMPP, and other network protocol interfaces
- Media capture and rendering interfaces
- OSGi service registry
- UI extension interfaces
- Configuration interfaces

## Data and State Management

- Account and contact state are managed separately from protocol implementations.
- Media sessions maintain call, stream, codec, and transport state.
- OSGi services expose runtime capabilities to other bundles.
- Configuration state stores account and user preferences.
- Protocol providers translate remote protocol state into shared application abstractions.

## Quality Attributes

- Extensibility through protocol and feature modules
- Interoperability across communication networks
- Modifiability through service interfaces
- Portability across desktop environments
- Reliability concerns around real-time media and protocol failures

## Key Architectural Decisions

- Use OSGi bundles to isolate protocol and feature modules.
- Abstract protocol providers behind common service interfaces.
- Separate media handling from protocol and UI behavior.
- Represent contacts and accounts with shared application abstractions.
- Allow modules to discover each other through services.

## Tradeoffs

- Service modularity supports many protocols but adds lifecycle and dependency complexity.
- Common protocol abstractions simplify the UI but may hide protocol-specific behavior.
- Real-time media integration requires careful performance and failure handling.
- OSGi dynamic loading improves modularity but complicates debugging.

## Useful Wiki Pages To Create Later

- wiki/projects/jitsi.md
- wiki/components/protocol-provider.md
- wiki/components/media-service.md
- wiki/patterns/plugin-architecture.md
- wiki/quality-attributes/interoperability.md
