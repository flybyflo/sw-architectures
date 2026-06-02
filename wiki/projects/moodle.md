---
title: Moodle
type: project
status: reviewed
sources:
  - ../../raw_sources/aosa/moodle.md
adrs: []
components:
  - ../components/plugin-system.md
patterns:
  - ../patterns/plugin-architecture.md
  - ../patterns/layered-architecture.md
quality_attributes:
  - ../quality-attributes/modifiability.md
  - ../quality-attributes/security.md
  - ../quality-attributes/scalability.md
---

# Moodle

## Concise Architecture Summary

Courses hold activities.
Plugins adapt institutions.
Configurability adds upgrade risk.

## Context

Moodle is a learning management system for courses, activities, users, roles,
grading, and educational content. It is a PHP web application with a database
back end, a broad plugin ecosystem, and institutional configuration needs.

## Functional Requirements

- Model courses, sections, activities, users, roles, grades, and completion.
- Support activity modules, blocks, themes, authentication, enrolment, and web
  service integrations.
- Enforce permissions through users, roles, capabilities, and contexts.
- Store course and activity state in a relational database.
- Let institutions customize behavior, content, presentation, and language.

## Main Components

- Course model: courses, sections, activities, and course content.
- Activity modules: pluggable learning activities with their own data.
- Blocks and themes: UI customization and page structure.
- User and role system: permission checks through roles, capabilities, and
  contexts.
- Gradebook and completion tracking.
- Database abstraction layer.
- File storage.
- [Plugin system](../components/plugin-system.md): plugin manager and plugin
  APIs for activity modules, blocks, themes, authentication, enrolment, and
  services.
- Web UI, forms, and web service interfaces.

## Interfaces

- Browser web interface.
- Plugin APIs.
- Database API.
- Theme interface.
- Authentication and enrolment interfaces.
- File API.
- Web service interfaces.

## Data And State Management

Courses contain sections and activities. Users, roles, capabilities, and
contexts determine permissions. Activity modules store their domain data through
database tables, while grades, completion data, files, and themes customize the
educational experience across installations.

## Quality Attributes

- [Modifiability](../quality-attributes/modifiability.md): plugins, themes, and
  configuration support institutional variation.
- [Security](../quality-attributes/security.md): role, capability, and context
  checks control access to course and user data.
- [Scalability](../quality-attributes/scalability.md): large courses and
  installations create pressure on database-backed course, grade, and activity
  state.
- Usability: teachers and students need course and activity workflows that match
  educational use.

## Key Architecture Decisions

- Make activities, blocks, themes, authentication, and enrolment pluggable.
- Use roles and capabilities scoped by context for permissions.
- Store course and activity state in a relational database.
- Support customization through themes, language settings, and configuration.

## Tradeoffs

Plugin breadth supports institutional adaptation, but it creates compatibility
and upgrade challenges. Fine-grained permissions improve security, but they add
complexity. Relational storage supports reporting and shared course state, but
it can constrain plugin design and scaling choices.

## Links

- Source note: [raw_sources/aosa/moodle.md](../../raw_sources/aosa/moodle.md)
- Component: [Plugin system](../components/plugin-system.md)
- Pattern: [Plugin architecture](../patterns/plugin-architecture.md)
- Quality attribute: [Modifiability](../quality-attributes/modifiability.md)
