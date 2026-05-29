---
title: "LLVM ADR 001: Central intermediate representation"
type: adr
status: accepted
project: llvm
decision_date: 2026-05-29
sources:
  - ../../raw_sources/aosa/llvm.md
components:
  - ../components/intermediate-representation.md
quality_attributes:
  - ../quality-attributes/performance.md
  - ../quality-attributes/modifiability.md
patterns: []
---

# ADR: Central Intermediate Representation

## Context

LLVM provides reusable compiler infrastructure for many front ends, optimizers,
backends, analyzers, JIT systems, and language runtimes. These clients need a
shared representation that lets compiler pieces interoperate.

## Decision

Use LLVM IR as the complete interface between front ends, optimizer passes, and
backends. Provide the IR in textual, in-memory, and bitcode forms.

## Consequences

- Many front ends and backends can share optimizer and code generation
  infrastructure.
- Passes can analyze and transform a common representation.
- Clients can compose compiler pieces through library APIs.
- All clients must respect IR invariants, and pass pipeline design remains
  important.

## Considered Options

- Selected: a central, strongly typed LLVM IR boundary.
- Rejected: direct front-end to backend coupling, because it would reduce the
  reuse emphasized in the source note.

## Links

- Project: [LLVM](../projects/llvm.md)
- Functional requirements:
  [LLVM requirements](../projects/llvm.md#functional-requirements)
- Component: [intermediate representation](../components/intermediate-representation.md)
- Quality attributes: [modifiability](../quality-attributes/modifiability.md),
  [performance](../quality-attributes/performance.md)
- Source note: [raw_sources/aosa/llvm.md](../../raw_sources/aosa/llvm.md)
