# GDB

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 2, "GDB": https://aosabook.org/en/v2/gdb.html

## Project Purpose

GDB is a debugger for inspecting and controlling program execution across languages, platforms, and target environments. Its architecture abstracts targets, symbols, languages, commands, and execution state.

## Architectural Style

- Debugger architecture
- Target abstraction architecture
- Command interpreter architecture
- Adapter architecture for languages and platforms

## Main Components

- Command interpreter
- Target layer
- Inferior process control
- Symbol readers
- Language support modules
- Breakpoint manager
- Stack frame and value model
- Remote protocol support

## Interfaces

- Interactive command interface
- MI machine interface
- Remote serial protocol
- OS process control interfaces
- Object file and debug info interfaces
- Language expression interfaces

## Data and State Management

- GDB stores target execution state, registers, memory views, stack frames, symbols, types, and breakpoints.
- Symbol readers translate object-file debug information into internal models.
- Target abstractions hide local, remote, and simulated execution differences.
- Language modules interpret expressions and values.

## Quality Attributes

- Portability across architectures and operating systems
- Extensibility for languages and targets
- Interoperability with IDEs through machine interfaces
- Observability into program state
- Complexity from broad target and language support

## Key Architectural Decisions

- Abstract target operations behind a target layer.
- Separate language-specific expression behavior from core debugging.
- Support remote debugging through a protocol.
- Represent debug information with internal symbol and type models.
- Provide both human and machine-oriented interfaces.

## Tradeoffs

- Target abstraction enables portability but can hide platform-specific capabilities.
- Broad language support increases reach but adds semantic complexity.
- Remote debugging adds flexibility but requires protocol synchronization.
- A long-lived debugger architecture must preserve compatibility while adapting to new systems.

## Useful Wiki Pages To Create Later

- wiki/projects/gdb.md
- wiki/components/target-abstraction.md
- wiki/components/symbol-reader.md
- wiki/patterns/adapter.md
- wiki/quality-attributes/portability.md
