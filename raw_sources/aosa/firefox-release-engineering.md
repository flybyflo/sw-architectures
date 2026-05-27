# Firefox Release Engineering

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 2, "Firefox Release Engineering": https://aosabook.org/en/v2/ffreleng.html

## Project Purpose

Firefox Release Engineering describes the systems and processes that build, test, package, sign, ship, and update Firefox across many platforms and release channels.

## Architectural Style

- Release pipeline architecture
- Build farm architecture
- Automation workflow architecture
- Artifact promotion architecture

## Main Components

- Source repositories
- Build automation
- Build workers
- Test automation
- Artifact storage
- Signing infrastructure
- Update generation
- Release channels
- Dashboard and monitoring

## Interfaces

- Version control interface
- Build scheduler interface
- Worker execution interface
- Test result interface
- Signing interface
- Update server interface
- Release dashboard interface

## Data and State Management

- Source revisions flow into build jobs.
- Build jobs produce artifacts per platform and channel.
- Test results and logs record quality status.
- Signed artifacts become release candidates.
- Update metadata directs users to appropriate builds.

## Quality Attributes

- Reliability through repeatable automation
- Traceability from source revision to released artifact
- Scalability across platforms and channels
- Security through controlled signing
- Operability through dashboards and logs

## Key Architectural Decisions

- Automate release steps to reduce manual risk.
- Separate build, test, signing, and update stages.
- Use release channels to manage rollout risk.
- Preserve artifacts and metadata for traceability.
- Treat release engineering as production infrastructure.

## Tradeoffs

- Automation reduces human error but requires continual maintenance.
- Many supported platforms multiply pipeline complexity.
- Signing improves security but creates a critical path dependency.
- Channel-based rollout reduces risk but requires clear promotion rules.

## Useful Wiki Pages To Create Later

- wiki/projects/firefox-release-engineering.md
- wiki/components/release-pipeline.md
- wiki/components/signing-service.md
- wiki/patterns/pipeline-architecture.md
- wiki/quality-attributes/traceability.md
