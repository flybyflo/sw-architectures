# Violet

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 1, "Violet": https://aosabook.org/en/v1/violet.html

## Project Purpose

Violet is a lightweight UML diagram editor. Its architecture centers on graph editing, diagram nodes and edges, tools, persistence, and a desktop UI for creating and modifying diagrams.

## Architectural Style

- Desktop MVC-style architecture
- Graph editor architecture
- Tool-based UI architecture
- Object serialization architecture

## Main Components

- Graph model
- Nodes
- Edges
- Editor panel
- Tools
- Selection and manipulation logic
- Persistence layer
- Swing user interface

## Interfaces

- Graph model API
- Node and edge drawing interfaces
- Tool interaction interface
- Mouse and keyboard event interface
- Serialization interface
- Clipboard and file interfaces

## Data and State Management

- Diagrams are represented as graphs of nodes and edges.
- Node and edge objects carry geometry, labels, and presentation state.
- Tools update the graph based on user input.
- Persistence serializes diagram objects to files.
- Selection state and editing handles support interactive manipulation.

## Quality Attributes

- Simplicity for educational and lightweight diagramming use
- Modifiability through graph element classes
- Usability through direct manipulation
- Portability through Java Swing
- Maintainability from a small codebase

## Key Architectural Decisions

- Represent diagrams with a graph model.
- Separate graph objects from editor interaction tools.
- Use Java/Swing for portability.
- Persist diagram state by serializing model objects.
- Keep the editor lightweight rather than feature-complete.

## Tradeoffs

- A small architecture is easy to understand but limits advanced modeling features.
- Direct object serialization is simple but can complicate format evolution.
- Swing portability comes with native UI tradeoffs.
- Tool-based editing is extensible but requires clear interaction state handling.

## Useful Wiki Pages To Create Later

- wiki/projects/violet.md
- wiki/components/graph-model.md
- wiki/components/editor-tool.md
- wiki/patterns/model-view-controller.md
- wiki/quality-attributes/simplicity.md
