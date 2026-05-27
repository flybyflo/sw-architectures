# Processing.js

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 2, "Processing.js": https://aosabook.org/en/v2/pjs.html

## Project Purpose

Processing.js brings the Processing creative coding language to the web by translating Processing-style programs into JavaScript and rendering through browser graphics APIs.

## Architectural Style

- Language translation architecture
- Browser rendering architecture
- Runtime compatibility layer
- Parser/interpreter architecture

## Main Components

- Processing parser
- JavaScript code generator or translator
- Runtime support library
- Canvas renderer
- API compatibility layer
- Sketch loader
- Browser event handling

## Interfaces

- Processing language interface
- JavaScript runtime interface
- HTML canvas interface
- Browser event interface
- Sketch embedding interface
- Graphics API interface

## Data and State Management

- Sketch source code is parsed and translated or interpreted in the browser.
- Runtime state includes drawing context, variables, event callbacks, and frame timing.
- Graphics commands become canvas drawing operations.
- Compatibility data maps Processing APIs to JavaScript implementations.

## Quality Attributes

- Portability to web browsers
- Usability for artists and educators familiar with Processing
- Compatibility with Processing semantics
- Performance constraints from browser execution
- Modifiability through runtime/API layering

## Key Architectural Decisions

- Target browser JavaScript and canvas instead of requiring a native runtime.
- Provide a compatibility layer for Processing APIs.
- Translate or parse Processing-style code for web execution.
- Use browser events for interaction.
- Keep sketch embedding simple for web pages.

## Tradeoffs

- Browser portability expands reach but limits access to native Processing features.
- API compatibility improves migration but requires emulation behavior.
- Translation adds complexity and debugging friction.
- Canvas rendering is widely available but may not match all desktop rendering behavior.

## Useful Wiki Pages To Create Later

- wiki/projects/processing-js.md
- wiki/components/language-translator.md
- wiki/components/canvas-renderer.md
- wiki/patterns/adapter.md
- wiki/quality-attributes/portability.md
