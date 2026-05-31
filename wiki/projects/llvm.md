---
title: LLVM
type: project
status: reviewed
sources:
  - ../../raw_sources/aosa/llvm.md
adrs:
  - ../adrs/llvm-adr-001-central-intermediate-representation.md
components:
  - ../components/intermediate-representation.md
patterns: []
quality_attributes:
  - ../quality-attributes/performance.md
  - ../quality-attributes/modifiability.md
---

# LLVM

## Concise Architecture Summary

Front ends emit one IR.
Passes transform shared programs.
Backends reuse infrastructure.

## Context

LLVM is reusable compiler and toolchain infrastructure. It provides libraries,
intermediate representations, optimization passes, and target support that
clients can assemble into compilers, analysis tools, JIT systems, and language
runtimes.

## Functional Requirements

- Let front ends lower source languages into a common representation.
- Optimize and analyze programs through reusable passes.
- Generate code for multiple targets.
- Provide textual, in-memory, and bitcode forms of IR.
- Allow tools and clients to compose only the libraries they need.

## Main Components

- Front ends that parse source languages and emit LLVM IR.
- [Intermediate representation](../components/intermediate-representation.md):
  the optimizer and backend boundary.
- Optimizer passes and PassManager.
- Code generators and target backends.
- Target description files processed by `tblgen`.
- Bitcode tools and client tools.

## Interfaces

- LLVM IR in textual, in-memory, and bitcode forms.
- C++ library APIs for IR, passes, analyses, and code generation.
- Pass creation functions.
- Target description files.
- Command-line tools such as `llvm-as` and `llvm-dis`.
- Machine-code, assembler, and disassembler interfaces.

## Data And State Management

Front ends lower program structure into strongly typed LLVM IR. Optimizer passes
read, analyze, and transform IR, while the PassManager coordinates dependencies.
Target descriptions store register, instruction, encoding, and assembly
knowledge in reusable declarative files.

## Quality Attributes

- [Modifiability](../quality-attributes/modifiability.md): libraries and passes
  can be understood and reused independently.
- Reusability: clients can assemble the compiler capabilities they need.
- Portability: front ends and backends share a common IR boundary.
- [Performance](../quality-attributes/performance.md): optimization pipelines
  and target-specific backends can be specialized.
- Testability: declarative target descriptions help verify instruction behavior.

## Key Architecture Decisions

- [Use LLVM IR as the central interface](../adrs/llvm-adr-001-central-intermediate-representation.md).
- Build LLVM as reusable libraries rather than one monolithic compiler.
- Organize optimization as a pipeline of loosely coupled passes.
- Generate target-specific support from declarative descriptions.

## Tradeoffs

The central IR boundary enables many front ends and backends, but clients must
obey IR invariants. Modular passes improve isolation while making pass pipeline
design and dependency management important.

## Links

- Source note: [raw_sources/aosa/llvm.md](../../raw_sources/aosa/llvm.md)
