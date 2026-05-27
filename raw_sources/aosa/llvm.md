# LLVM

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 1, "LLVM" by Chris Lattner: https://aosabook.org/en/v1/llvm.html

## Project Purpose

LLVM is reusable compiler and toolchain infrastructure. It provides libraries,
intermediate representations, optimization passes, and target support that can
be assembled into many different compilers, analysis tools, JIT systems, and
language runtimes.

## Architectural Style

- Three-phase compiler architecture
- Library-based infrastructure
- Intermediate-representation-centered design
- Modular pass pipeline
- Declarative target description
- Reusable backend framework

## Main Components

- Front ends: parse source languages and emit LLVM IR.
- LLVM IR: the central representation used by optimizers and code generators.
- Optimizer passes: independent analysis and transformation units.
- PassManager: schedules passes and satisfies declared pass dependencies.
- Code generators/backends: lower LLVM IR to target machine code.
- Target description files: declarative `.td` files processed by `tblgen`.
- Bitcode tools: convert between textual IR and compact binary bitcode.
- Client tools: compilers, static analyzers, JIT compilers, and domain-specific
  systems built on the libraries.

## Interfaces

- LLVM IR in textual, in-memory, and bitcode forms.
- C++ library APIs for IR, passes, analyses, and code generation.
- Pass creation functions exported by pass implementations.
- Target description files consumed by `tblgen`.
- Command-line tools such as `llvm-as` and `llvm-dis`.
- Machine-code, assembler, and disassembler interfaces for target backends.

## Data and State Management

- Front ends usually produce an AST and lower it into LLVM IR.
- LLVM IR is strongly typed and acts as the complete optimizer interface.
- The same IR can be represented as text, in-memory objects, or bitcode.
- Optimizer passes read, analyze, and transform IR.
- Pass dependency declarations let the PassManager coordinate required analyses.
- Target descriptions store register, instruction, encoding, and assembly
  knowledge in a reusable form.
- Generated target information reduces disagreement between assemblers,
  disassemblers, encoders, and code generators.

## Quality Attributes

- Modifiability: individual libraries and passes can be understood and reused
  without understanding the whole compiler.
- Reusability: clients can assemble only the compiler capabilities they need.
- Portability: front ends and backends share a common IR boundary.
- Performance: optimization pipelines and target-specific backends can be
  specialized for different use cases.
- Testability: declarative target descriptions make instruction behavior easier
  to verify in isolation.
- Interoperability: LLVM was designed to work with existing Unix-style tools and
  toolchain expectations.

## Key Architectural Decisions

- Use LLVM IR as the complete and stable interface between front ends,
  optimizers, and backends.
- Provide IR in textual, in-memory, and bitcode forms.
- Build LLVM as a set of reusable libraries instead of a monolithic compiler.
- Organize optimization as a pipeline of loosely coupled passes.
- Let clients choose which passes and libraries they need.
- Describe target-specific details declaratively and generate shared code from
  those descriptions.
- Reuse backend infrastructure while allowing target-specific scheduling,
  lowering, and instruction handling.

## Tradeoffs

- A library infrastructure is highly reusable, but clients must understand how to
  compose the pieces.
- The central IR boundary enables many front ends and backends, but all clients
  must obey the IR invariants.
- Modular passes improve isolation, but pipeline design and pass dependencies
  add complexity.
- Declarative target descriptions reduce duplication, but require target authors
  to learn LLVM's domain-specific language and generation flow.

## Useful Wiki Pages To Create Later

- `wiki/projects/llvm.md`
- `wiki/adrs/llvm-adr-001-use-llvm-ir-as-central-interface.md`
- `wiki/adrs/llvm-adr-002-library-based-compiler-infrastructure.md`
- `wiki/components/intermediate-representation.md`
- `wiki/components/pass-manager.md`
- `wiki/components/compiler-backend.md`
- `wiki/patterns/pipeline-architecture.md`
- `wiki/quality-attributes/modifiability.md`
- `wiki/quality-attributes/portability.md`
