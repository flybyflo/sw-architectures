# The Dynamic Language Runtime and the Iron Languages

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 2, "The Dynamic Language Runtime and the Iron Languages": https://aosabook.org/en/v2/ironlang.html

## Project Purpose

The Dynamic Language Runtime supports dynamic languages on .NET, including IronPython and IronRuby. Its architecture provides shared runtime services for dynamic dispatch, hosting, expression trees, and language interoperability.

## Architectural Style

- Runtime platform architecture
- Language implementation framework
- Dynamic dispatch architecture
- Expression tree architecture

## Main Components

- DLR hosting APIs
- Expression trees
- Call sites
- Binders
- Language runtimes
- Dynamic object protocol
- Compiler pipeline
- .NET integration layer

## Interfaces

- Language hosting interface
- Dynamic object interfaces
- Call site and binder interfaces
- .NET type system interface
- Expression tree interface
- Compiler/runtime service interfaces

## Data and State Management

- Dynamic operations are represented through call sites and binding rules.
- Expression trees represent executable program fragments.
- Binders encode language-specific semantics for dynamic operations.
- Language runtimes manage parsing, compilation, and execution services.
- Interop data maps dynamic objects to .NET objects and vice versa.

## Quality Attributes

- Reusability across dynamic language implementations
- Interoperability with .NET libraries
- Performance through call-site caching
- Modifiability through shared runtime services
- Extensibility for new dynamic languages

## Key Architectural Decisions

- Provide a shared runtime layer instead of duplicating dynamic-language infrastructure.
- Represent dynamic operations with call sites and binders.
- Use expression trees as an intermediate executable representation.
- Let each language provide semantic binding rules.
- Expose hosting APIs for embedding dynamic languages.

## Tradeoffs

- Shared runtime services reduce duplication but require abstractions general enough for multiple languages.
- Call-site caching improves performance but adds invalidation and semantic complexity.
- Interop with .NET increases reach but constrains runtime design.
- Language-specific semantics can make common abstractions leaky.

## Useful Wiki Pages To Create Later

- wiki/projects/dynamic-language-runtime-iron-languages.md
- wiki/components/dynamic-dispatch.md
- wiki/components/expression-tree.md
- wiki/patterns/runtime-platform.md
- wiki/quality-attributes/reusability.md
