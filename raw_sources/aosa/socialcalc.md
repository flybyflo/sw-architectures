# SocialCalc

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 1, "SocialCalc": https://aosabook.org/en/v1/socialcalc.html

## Project Purpose

SocialCalc is a web-based spreadsheet. Its architecture separates spreadsheet data, formula calculation, command execution, rendering, and persistence so a browser application can edit and share tabular documents.

## Architectural Style

- Browser application architecture
- Model-command-rendering separation
- Spreadsheet calculation architecture
- Command log architecture

## Main Components

- Spreadsheet data model
- Cell storage
- Formula parser and evaluator
- Command processor
- Render context
- Sheet view
- Persistence layer
- Collaboration or save/load integration

## Interfaces

- Browser UI interface
- Spreadsheet command interface
- Formula language interface
- Save/load serialization interface
- Rendering interface
- Optional server integration interface

## Data and State Management

- Cells store values, formulas, formats, and metadata.
- Commands change spreadsheet state and can be serialized.
- Formula dependencies influence recalculation.
- Rendering state maps cell data to visible table output.
- Persistence stores sheet data and command history in text formats.

## Quality Attributes

- Usability for spreadsheet editing in the browser
- Portability through JavaScript and web standards
- Modifiability through command-based state changes
- Performance concerns around recalculation and rendering
- Collaboration potential through serialized commands

## Key Architectural Decisions

- Represent edits as commands.
- Keep spreadsheet model separate from rendering concerns.
- Use browser-side JavaScript for interactive behavior.
- Serialize spreadsheet state in text form.
- Reuse command logs for undo, replay, or collaboration scenarios.

## Tradeoffs

- Command logs make changes replayable but require stable command semantics.
- Browser execution improves deployment but constrains performance and storage behavior.
- Spreadsheet formula evaluation is powerful but dependency tracking adds complexity.
- Text serialization eases interoperability but may require careful escaping and versioning.

## Useful Wiki Pages To Create Later

- wiki/projects/socialcalc.md
- wiki/components/spreadsheet-model.md
- wiki/components/command-log.md
- wiki/patterns/command.md
- wiki/quality-attributes/usability.md
