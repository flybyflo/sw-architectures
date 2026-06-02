---
title: Modifiability
type: quality-attribute
status: reviewed
projects:
  - ../projects/eclipse.md
  - ../projects/git.md
  - ../projects/jitsi.md
  - ../projects/mediawiki.md
  - ../projects/moodle.md
  - ../projects/hadoop-hdfs.md
  - ../projects/llvm.md
sources:
  - ../../raw_sources/aosa/eclipse.md
  - ../../raw_sources/aosa/git.md
  - ../../raw_sources/aosa/jitsi.md
  - ../../raw_sources/aosa/mediawiki.md
  - ../../raw_sources/aosa/moodle.md
  - ../../raw_sources/aosa/hadoop-hdfs.md
  - ../../raw_sources/aosa/llvm.md
---

# Modifiability

## Definition In This Wiki

Modifiability describes how easily a system can be changed, extended,
reconfigured, scripted, or recomposed.

## Project Comparisons

- [Eclipse](../projects/eclipse.md): plugins, extension points, OSGi bundles,
  exported APIs, and lazy activation support a large extension ecosystem.
- [Git](../projects/git.md): the repository format and plumbing commands are
  scriptable.
- [Jitsi](../projects/jitsi.md): protocol and feature modules evolve behind
  OSGi service interfaces.
- [MediaWiki](../projects/mediawiki.md): hooks, extensions, skins, gadgets, and
  configuration support customization.
- [Moodle](../projects/moodle.md): activity modules, blocks, themes,
  authentication plugins, enrolment plugins, and configuration support
  institution-specific customization.
- [Hadoop HDFS](../projects/hadoop-hdfs.md): the storage model is simple, but
  the central NameNode is an important architectural constraint.
- [LLVM](../projects/llvm.md): libraries and passes can be understood and reused
  without understanding the whole compiler.

## Supporting Decisions And Patterns

- [LLVM ADR 001](../adrs/llvm-adr-001-central-intermediate-representation.md)
- [Layered architecture](../patterns/layered-architecture.md)
- [Plugin system](../components/plugin-system.md)
- [Plugin architecture](../patterns/plugin-architecture.md)

## Tradeoffs

Extension points and reusable pieces improve modifiability, but they can add
startup cost, abstraction complexity, composition work, or additional concepts
for users and maintainers.
