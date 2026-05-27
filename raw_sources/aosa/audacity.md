# Audacity

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 1, "Audacity": https://aosabook.org/en/v1/audacity.html

## Project Purpose

Audacity is a cross-platform audio editor for recording, editing, processing, and exporting audio projects. Its architecture must support interactive editing, large audio data, effects, undo history, and integrations with platform audio and UI libraries.

## Architectural Style

- Desktop application architecture
- Layered audio-editing architecture
- Plugin and effect pipeline architecture
- Document/project model
- Cross-platform UI adapter architecture

## Main Components

- Project model
- Tracks and clips
- Block files for audio data storage
- Audio I/O subsystem
- Effect processing pipeline
- Command and undo system
- wxWidgets-based user interface
- Import/export libraries and encoders

## Interfaces

- Audio device interfaces
- File import and export interfaces
- Effect plugin interfaces
- UI event interfaces
- Project file persistence interface
- Command and undo interfaces

## Data and State Management

- Projects store track metadata and references to audio block files.
- Large audio data is split into manageable blocks rather than kept as one monolithic buffer.
- Undo information tracks editing operations and project state changes.
- Effects transform selected audio data and produce new project state.
- Import/export adapters translate external formats into Audacity project data.

## Quality Attributes

- Usability for interactive editing
- Performance for large audio files
- Portability across operating systems
- Extensibility through effects and import/export support
- Reliability around project recovery and undo behavior

## Key Architectural Decisions

- Represent audio projects as editable tracks backed by block storage.
- Use a cross-platform UI toolkit to keep the desktop application portable.
- Separate audio processing effects from the core project model.
- Maintain undoable editing operations for user safety.
- Integrate external libraries for audio formats and platform capabilities.

## Tradeoffs

- Block-based audio storage helps with large files but adds file-management complexity.
- A cross-platform UI toolkit reduces platform-specific code but may limit native polish.
- Plugin and library support expands capability but increases dependency and packaging complexity.
- Rich undo improves usability but increases memory and persistence concerns.

## Useful Wiki Pages To Create Later

- wiki/projects/audacity.md
- wiki/components/audio-block-storage.md
- wiki/components/effect-pipeline.md
- wiki/patterns/layered-architecture.md
- wiki/quality-attributes/usability.md
