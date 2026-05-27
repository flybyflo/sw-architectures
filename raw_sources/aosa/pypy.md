# PyPy

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 2, "PyPy": https://aosabook.org/en/v2/pypy.html

## Project Purpose

PyPy is a Python implementation and compiler toolchain built around RPython and a meta-tracing JIT. Its architecture separates language semantics from low-level translation and optimization machinery.

## Architectural Style

- Interpreter architecture
- Meta-tracing JIT architecture
- Language implementation framework
- Translation toolchain architecture

## Main Components

- Python interpreter
- Object space
- RPython toolchain
- Flow graph annotator
- Translator
- Garbage collector framework
- JIT generator
- Runtime backend

## Interfaces

- Python language interface
- Object space interface
- RPython subset interface
- Translation pipeline interfaces
- JIT hints and trace interfaces
- C/backend output interface

## Data and State Management

- The interpreter defines language semantics at a high level.
- Object spaces abstract object operations.
- RPython code is analyzed and translated into lower-level representations.
- The JIT records and optimizes execution traces.
- Runtime state includes Python objects, frames, guards, traces, and GC metadata.

## Quality Attributes

- Performance through JIT compilation
- Modifiability by separating interpreter semantics from translation
- Experimentation through alternative object spaces
- Portability through generated backends
- Complexity from meta-tracing and translation machinery

## Key Architectural Decisions

- Write interpreters in RPython so they can be translated.
- Use object spaces to separate language operations from object representation.
- Generate a JIT from interpreter behavior rather than hand-writing one.
- Build garbage collection and runtime services into the translation toolchain.
- Optimize traces observed at runtime.

## Tradeoffs

- Meta-tracing reduces per-language JIT work but makes the toolchain complex.
- RPython enables analysis but restricts implementation style.
- Object spaces improve experimentation but add abstraction layers.
- Runtime optimization improves speed but complicates predictability and debugging.

## Useful Wiki Pages To Create Later

- wiki/projects/pypy.md
- wiki/components/meta-tracing-jit.md
- wiki/components/object-space.md
- wiki/patterns/interpreter.md
- wiki/quality-attributes/performance.md
