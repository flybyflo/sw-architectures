# Moodle

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 2, "Moodle": https://aosabook.org/en/v2/moodle.html

## Project Purpose

Moodle is a learning management system for courses, activities, users, roles, grading, and educational content. Its architecture is a PHP web application with a broad plugin ecosystem and database-backed course model.

## Architectural Style

- PHP web application architecture
- Plugin architecture
- Database-backed LMS architecture
- Role and capability model
- Modular course/activity architecture

## Main Components

- Course model
- Activity modules
- Blocks
- Themes
- User and role system
- Gradebook
- Database abstraction layer
- File storage
- Plugin manager
- Web UI and forms

## Interfaces

- Browser web interface
- Plugin APIs
- Database API
- Theme interface
- Authentication and enrolment interfaces
- File API
- Web service interfaces

## Data and State Management

- Courses contain sections and activities.
- Users, roles, capabilities, and contexts determine permissions.
- Activity modules store their own domain data through database tables.
- Grades and completion data are tracked across courses.
- Files and themes customize learning content and presentation.

## Quality Attributes

- Extensibility through plugins
- Modifiability for different educational institutions
- Security through role and capability checks
- Usability for teachers and students
- Scalability concerns around large courses and installations

## Key Architectural Decisions

- Make activities and blocks pluggable.
- Use a role/capability system scoped by context.
- Store course and activity data in a relational database.
- Provide theme and language customization.
- Support institutional variation through configuration and plugins.

## Tradeoffs

- Plugin breadth enables adaptation but creates compatibility and upgrade challenges.
- Fine-grained permissions improve security but add complexity.
- A relational schema supports reporting but may constrain plugin design.
- Institutional configurability can make deployments hard to standardize.

## Useful Wiki Pages To Create Later

- wiki/projects/moodle.md
- wiki/components/plugin-system.md
- wiki/components/role-capability-model.md
- wiki/patterns/layered-architecture.md
- wiki/quality-attributes/extensibility.md
