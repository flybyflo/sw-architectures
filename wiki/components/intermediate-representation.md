---
title: Intermediate representation
type: component
status: reviewed
projects:
  - ../projects/llvm.md
sources:
  - ../../raw_sources/aosa/llvm.md
---

# Intermediate Representation

## Responsibility

LLVM IR is the shared representation used by front ends, optimizer passes, and
backends. It provides a stable compiler pipeline boundary.

## Collaborators

- Front ends.
- Optimizer passes and PassManager.
- Code generators and target backends.
- Bitcode tools and client tools.

## State And Interfaces

LLVM IR exists in textual, in-memory, and bitcode forms. Optimizer passes read,
analyze, and transform IR, while clients use C++ library APIs and tools such as
`llvm-as` and `llvm-dis`.

## Project Uses

- [LLVM](../projects/llvm.md): uses LLVM IR as the central interface that lets
  compiler clients reuse optimization and backend infrastructure.

## Related Decisions

- [LLVM ADR 001: Central intermediate representation](../adrs/llvm-adr-001-central-intermediate-representation.md)
