# Battle For Wesnoth

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 1, "Battle For Wesnoth": https://aosabook.org/en/v1/wesnoth.html

## Project Purpose

Battle for Wesnoth is a turn-based strategy game. Its architecture supports a game engine, data-driven content, scripting, AI, multiplayer, campaigns, localization, and community-created extensions.

## Architectural Style

- Game engine architecture
- Data-driven configuration architecture
- Turn-based simulation architecture
- Client-server multiplayer architecture
- Plugin/content extension architecture

## Main Components

- Game engine
- WML configuration language
- Map and scenario system
- Unit and rules system
- AI system
- Rendering and UI layer
- Network multiplayer layer
- Save/load system
- Add-on content system

## Interfaces

- WML content interface
- Game UI interface
- Network multiplayer protocol
- Save game format
- AI scripting/configuration interface
- Localization interface
- Asset loading interface

## Data and State Management

- Scenarios, units, maps, rules, and campaigns are described in WML.
- Game state tracks units, terrain, players, turns, and events.
- Save files persist current game state.
- Add-ons package community content.
- Multiplayer synchronizes player actions and game state between peers or servers.

## Quality Attributes

- Modifiability through data-driven content
- Extensibility through add-ons and campaigns
- Usability for players and content creators
- Portability across platforms
- Reliability concerns around deterministic multiplayer state

## Key Architectural Decisions

- Use WML to make game content data-driven.
- Separate engine code from campaign and scenario content.
- Support community add-ons as a first-class extension mechanism.
- Use turn-based state transitions for deterministic gameplay.
- Provide AI and multiplayer as engine-level capabilities.

## Tradeoffs

- A custom content language empowers creators but requires tooling and documentation.
- Data-driven behavior improves extensibility but can make debugging content harder.
- Turn-based synchronization is simpler than real-time networking but still needs deterministic rules.
- Supporting many community extensions increases compatibility burden.

## Useful Wiki Pages To Create Later

- wiki/projects/battle-for-wesnoth.md
- wiki/components/game-engine.md
- wiki/components/content-language.md
- wiki/patterns/data-driven-architecture.md
- wiki/quality-attributes/extensibility.md
