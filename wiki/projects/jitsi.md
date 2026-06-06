---
title: Jitsi
type: project
status: reviewed
sources:
  - ../../raw_sources/aosa/jitsi.md
adrs: []
components:
  - ../components/plugin-system.md
patterns:
  - ../patterns/plugin-architecture.md
quality_attributes:
  - ../quality-attributes/modifiability.md
  - ../quality-attributes/reliability.md
---

# Jitsi

## Concise Architecture Summary

Protocols become services.
Bundles discover capabilities.
Media work complicates modularity.

## Context

Jitsi is an audio/video communication and instant messaging application. Its
architecture integrates many network protocols, media processing paths, accounts,
contacts, configuration, and UI features through a modular OSGi service model.

## Functional Requirements

- Support multiple communication protocols.
- Manage accounts, contacts, media sessions, configuration, and UI features.
- Abstract protocol-specific behavior behind shared application services.
- Allow protocol and feature modules to be added or changed independently.
- Handle real-time media and communication failures.

## Main Components

- Protocol providers: translate protocol-specific state into shared service
  abstractions.
- Account manager and contact list service: manage user communication state.
- Media service: handles capture, rendering, streams, codecs, and transport.
- UI service and configuration service.
- OSGi runtime and bundles for protocols and features.
- [Plugin system](../components/plugin-system.md): bundle/service registration
  and discovery model.

## Interfaces

- Protocol provider service interfaces.
- SIP, XMPP, and other network protocol interfaces.
- Media capture and rendering interfaces.
- OSGi service registry.
- UI extension and configuration interfaces.

## Data And State Management

Account and contact state are separated from protocol implementations. Media
sessions maintain call, stream, codec, and transport state. OSGi services expose
runtime capabilities to other bundles, while configuration state stores account
and user preferences.

## Quality Attributes

- [Modifiability](../quality-attributes/modifiability.md): protocol and feature
  modules can evolve behind service interfaces.
- Interoperability: protocol providers let the application integrate multiple
  communication networks.
- [Reliability](../quality-attributes/reliability.md): real-time media and
  protocol failure handling remain central reliability concerns.
- Portability: the modular desktop application can support multiple runtime
  environments.

## Key Architecture Decisions

- Use OSGi bundles to isolate protocol and feature modules.
- Abstract protocol providers behind shared service interfaces.
- Separate media handling from protocol and UI behavior.
- Represent contacts and accounts with shared application abstractions.
- Use service discovery so modules can find capabilities at runtime.

## Tradeoffs

Service modularity supports many protocols and features, but it adds lifecycle,
dependency, and debugging complexity. Common protocol abstractions simplify the
UI and application core, but they can hide protocol-specific behavior. Real-time
media integration raises performance and failure-handling demands.

## Links

- Source note: [raw_sources/aosa/jitsi.md](../../raw_sources/aosa/jitsi.md)
- Component: [Plugin system](../components/plugin-system.md)
- Pattern: [Plugin architecture](../patterns/plugin-architecture.md)
- Quality attribute: [Modifiability](../quality-attributes/modifiability.md)
