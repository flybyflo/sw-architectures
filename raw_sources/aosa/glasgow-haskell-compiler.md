# The Glasgow Haskell Compiler

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 2, "The Glasgow Haskell Compiler": https://aosabook.org/en/v2/ghc.html

## Project Purpose

GHC is a compiler and runtime system for Haskell. Its architecture transforms high-level Haskell through several intermediate languages and optimization phases into executable code supported by a runtime system.

## Architectural Style

- Multi-stage compiler architecture
- Intermediate representation pipeline
- Runtime-system architecture
- Optimization pipeline

## Main Components

- Parser and renamer
- Typechecker
- Core intermediate language
- Simplifier and optimizer
- STG language
- Cmm representation
- Code generators
- Runtime system
- Package and module system

## Interfaces

- Haskell source language interface
- Core and STG internal interfaces
- Foreign function interface
- Package interface
- Runtime system interface
- Command-line compiler interface

## Data and State Management

- Haskell source is transformed through typed intermediate representations.
- Core represents a small functional language suitable for optimization.
- STG models lazy evaluation and closure behavior.
- Cmm represents low-level code before machine code generation.
- Runtime state includes heap objects, thunks, stacks, and garbage collection metadata.

## Quality Attributes

- Correctness for complex language semantics
- Performance through aggressive optimization
- Modifiability through staged intermediate languages
- Extensibility for language extensions
- Reliability through explicit runtime support for laziness and concurrency

## Key Architectural Decisions

- Use a sequence of intermediate languages to separate concerns.
- Make Core the central optimization language.
- Represent lazy evaluation explicitly before code generation.
- Pair the compiler with a runtime system tailored to Haskell semantics.
- Support language evolution through compiler passes and extensions.

## Tradeoffs

- Multiple IRs make compiler stages clearer but add transformation complexity.
- Optimizations improve performance but complicate reasoning and debugging.
- Supporting many language extensions increases adoption but creates interactions in the typechecker and optimizer.
- A sophisticated runtime improves language support but raises implementation complexity.

## Useful Wiki Pages To Create Later

- wiki/projects/glasgow-haskell-compiler.md
- wiki/components/compiler-pipeline.md
- wiki/components/runtime-system.md
- wiki/patterns/pipeline-architecture.md
- wiki/quality-attributes/performance.md
