# Yesod

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 2, "Yesod": https://aosabook.org/en/v2/yesod.html

## Project Purpose

Yesod is a Haskell web framework designed for type-safe web applications. Its architecture uses Haskell types, templates, routing, forms, persistence, and WAI integration to catch web application errors early.

## Architectural Style

- Type-safe web framework
- MVC-like web architecture
- Template-driven architecture
- Compile-time checked routing and forms

## Main Components

- Routes
- Handlers
- Templates
- Forms
- Persistent database layer
- Foundation type
- WAI integration
- Middleware
- Static asset support

## Interfaces

- Route declaration interface
- Handler API
- Template languages
- Form API
- Persistent schema interface
- WAI application interface
- Database interface

## Data and State Management

- Routes define URL structure and handler mapping.
- Handlers process requests using typed parameters and application state.
- Templates generate HTML, CSS, and JavaScript with compile-time checks.
- Forms validate user input.
- Persistent models describe database entities and relationships.

## Quality Attributes

- Correctness through static typing
- Security through typed routes, forms, and escaping helpers
- Modifiability through structured handlers and templates
- Performance through compiled Haskell code
- Usability tradeoffs from Haskell learning curve

## Key Architectural Decisions

- Make routes type-safe and checked at compile time.
- Use templates integrated with Haskell types.
- Provide a foundation type for application-wide state.
- Use WAI as the lower-level web interface.
- Include persistence and form abstractions in the framework.

## Tradeoffs

- Compile-time safety catches many errors but can increase complexity for new developers.
- Typed templates reduce runtime errors but require framework-specific languages.
- Integrated persistence is convenient but may constrain database usage.
- Strong abstractions improve correctness but can make simple applications feel heavy.

## Useful Wiki Pages To Create Later

- wiki/projects/yesod.md
- wiki/components/type-safe-routing.md
- wiki/components/template-engine.md
- wiki/patterns/model-view-controller.md
- wiki/quality-attributes/correctness.md
