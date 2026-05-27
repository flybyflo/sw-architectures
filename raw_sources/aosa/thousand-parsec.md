# Thousand Parsec

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 1, "Thousand Parsec": https://aosabook.org/en/v1/thousandparsec.html

## Project Purpose

Thousand Parsec is a framework for turn-based space strategy games. Its architecture separates reusable client/server infrastructure from game-specific rulesets so many strategy games can share a common protocol and tooling.

## Architectural Style

- Client-server game architecture
- Framework architecture
- Ruleset plugin architecture
- Protocol-driven multiplayer architecture

## Main Components

- Game server
- Game clients
- Network protocol
- Rulesets
- Universe model
- Order system
- Turn processor
- Persistence layer
- AI or bot clients

## Interfaces

- Client-server protocol
- Ruleset API
- Order submission interface
- Game-state query interface
- Persistence interface
- Client UI interfaces

## Data and State Management

- The server stores authoritative universe and player state.
- Players submit orders that are validated and processed by rulesets.
- Turns advance game state in discrete steps.
- Rulesets define object types, actions, and victory conditions.
- Clients render state and issue commands through the protocol.

## Quality Attributes

- Extensibility through rulesets
- Interoperability through a shared protocol
- Modifiability by separating game mechanics from infrastructure
- Fairness and consistency through server authority
- Scalability limits around turn processing and game-state size

## Key Architectural Decisions

- Use a common protocol so multiple clients can support multiple games.
- Keep the server authoritative for game state.
- Model game behavior through pluggable rulesets.
- Process player actions as turn-based orders.
- Separate client UI from game logic.

## Tradeoffs

- A general framework enables many games but may not optimize for one game design.
- Turn-based processing simplifies consistency but limits real-time gameplay.
- A shared protocol improves interoperability but constrains feature evolution.
- Ruleset flexibility increases testing needs.

## Useful Wiki Pages To Create Later

- wiki/projects/thousand-parsec.md
- wiki/components/game-server.md
- wiki/components/ruleset.md
- wiki/patterns/client-server.md
- wiki/quality-attributes/extensibility.md
