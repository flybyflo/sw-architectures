---
title: Security
type: quality-attribute
status: reviewed
projects:
  - ../projects/nginx.md
  - ../projects/git.md
  - ../projects/mediawiki.md
sources:
  - ../../raw_sources/aosa/nginx.md
  - ../../raw_sources/aosa/git.md
  - ../../raw_sources/aosa/mediawiki.md
---

# Security

## Definition In This Wiki

Security describes architectural support for isolation, integrity, permissions,
and abuse resistance where the source notes document those concerns.

## Project Comparisons

- [nginx](../projects/nginx.md): worker processes can run as unprivileged users
  while the master owns privileged setup tasks.
- [Git](../projects/git.md): hashes connect object identity and integrity.
- [MediaWiki](../projects/mediawiki.md): permissions, user roles, anti-spam, and
  anti-vandalism features are central to Wikipedia-style operation.

## Supporting Decisions And Patterns

- [Git ADR 001](../adrs/git-adr-001-content-addressed-storage.md)
- [Content-addressed storage](../patterns/content-addressed-storage.md)

## Tradeoffs

Security mechanisms overlap with other qualities. Privilege separation,
integrity hashes, and abuse controls add protection while introducing
operational and conceptual responsibilities.
