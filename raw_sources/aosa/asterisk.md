# Asterisk

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 1, "Asterisk": https://aosabook.org/en/v1/asterisk.html

## Project Purpose

Asterisk is an open source telephony toolkit and private branch exchange. It connects software applications, phones, and carrier networks so voice calls, conferencing, voicemail, and interactive voice-response flows can be built from reusable components.

## Architectural Style

- Modular telephony server
- Plugin-based architecture
- Event-driven call control
- Protocol adapter architecture
- Dialplan-driven application composition

## Main Components

- Core PBX engine for call lifecycle and routing
- Channel drivers for telephony protocols and devices
- Applications that implement call behavior such as voicemail or conferencing
- Bridges that connect call legs
- Codecs and media translation modules
- Dialplan interpreter and configuration loader
- Manager and gateway interfaces for external control

## Interfaces

- SIP, IAX, and other telephony protocol interfaces
- Dialplan configuration interface
- Module API for channels, applications, resources, and codecs
- Command-line and management interfaces
- Audio media interfaces between channels, codecs, and bridges

## Data and State Management

- Call state is represented as channels and bridges during runtime.
- Dialplan rules define how calls move through contexts, extensions, priorities, and applications.
- Configuration is loaded from text files and module metadata.
- Media frames flow through codecs, translators, and bridges.
- Persistent state such as voicemail can be stored outside the core call path.

## Quality Attributes

- Extensibility through loadable modules
- Interoperability across many telephony protocols
- Modifiability through dialplan configuration
- Performance sensitivity in media processing and bridging
- Reliability concerns around long-running call state and protocol edge cases

## Key Architectural Decisions

- Represent telephony features as modules around a small PBX core.
- Separate protocol handling from call applications.
- Use a dialplan as the main composition mechanism for call behavior.
- Allow media translation through codec modules.
- Expose external control through management interfaces.

## Tradeoffs

- Module flexibility increases integration reach but complicates compatibility and testing.
- Dialplan configuration is powerful but can become difficult to understand at scale.
- Supporting many protocols increases interoperability but exposes the core to varied protocol semantics.
- Real-time media handling limits how much blocking or expensive processing can happen in the call path.

## Useful Wiki Pages To Create Later

- wiki/projects/asterisk.md
- wiki/components/channel-driver.md
- wiki/components/dialplan.md
- wiki/patterns/plugin-architecture.md
- wiki/quality-attributes/interoperability.md
