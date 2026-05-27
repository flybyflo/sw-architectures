# Selenium WebDriver

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 1, "Selenium WebDriver": https://aosabook.org/en/v1/selenium.html

## Project Purpose

Selenium WebDriver is a browser automation system for testing web applications through real browsers. Its architecture standardizes client commands while delegating browser-specific control to drivers.

## Architectural Style

- Client-driver architecture
- Remote control protocol architecture
- Adapter architecture
- Test automation architecture

## Main Components

- Language client bindings
- Command executor
- Wire protocol
- Browser-specific driver
- Browser automation backend
- Element reference model
- Test framework integration

## Interfaces

- WebDriver API
- JSON wire or WebDriver protocol
- Browser driver interfaces
- DOM element command interface
- Language binding APIs
- Test runner interfaces

## Data and State Management

- Tests issue commands through client bindings.
- Commands identify sessions, windows, frames, and elements.
- Drivers map standardized commands to browser-specific automation mechanisms.
- Element references represent browser-side DOM objects.
- Command responses carry success, errors, and values back to clients.

## Quality Attributes

- Portability across browsers and languages
- Reliability for end-to-end tests
- Interoperability through a shared protocol
- Usability through language-specific bindings
- Maintainability through separation of client API and browser implementation

## Key Architectural Decisions

- Use browser-specific drivers behind a common API.
- Make tests drive real browser behavior instead of only simulated DOM behavior.
- Expose a remote protocol so drivers can run out of process.
- Represent browser elements with remote references.
- Provide bindings in multiple programming languages.

## Tradeoffs

- Real browser automation improves fidelity but can be slower and less deterministic.
- Protocol standardization improves portability but must handle browser differences.
- Remote element references can become stale as pages change.
- Supporting many language bindings increases ecosystem reach but adds maintenance cost.

## Useful Wiki Pages To Create Later

- wiki/projects/selenium-webdriver.md
- wiki/components/browser-driver.md
- wiki/components/command-executor.md
- wiki/patterns/adapter.md
- wiki/quality-attributes/interoperability.md
