# Puppet

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 2, "Puppet": https://aosabook.org/en/v2/puppet.html

## Project Purpose

Puppet is a configuration management system. Its architecture lets users declare desired infrastructure state, compile catalogs, apply resources through providers, and report changes across managed nodes.

## Architectural Style

- Declarative configuration management
- Master-agent architecture
- Resource graph architecture
- Provider adapter architecture
- Infrastructure as code

## Main Components

- Puppet manifests
- Parser and compiler
- Catalog
- Resources
- Types and providers
- Facts
- Agent
- Master/server
- Reporting system
- Module system

## Interfaces

- Puppet DSL interface
- Agent-server protocol
- Resource type API
- Provider API
- Fact interface
- Report interface
- Module interface

## Data and State Management

- Manifests declare desired resource state.
- Facts describe node-specific data used during compilation.
- The compiler produces a catalog for a node.
- Agents apply catalog resources through providers.
- Reports record changes, failures, and compliance state.

## Quality Attributes

- Reproducibility through declarative desired state
- Scalability across many nodes
- Modifiability through modules and resource abstractions
- Operability through reports and convergence behavior
- Security concerns around privileged agents and secrets

## Key Architectural Decisions

- Use a declarative DSL instead of imperative scripts.
- Compile node-specific catalogs from manifests and facts.
- Abstract platform operations through types and providers.
- Use agents to converge local state.
- Package reusable configuration as modules.

## Tradeoffs

- Declarative state improves reasoning but can obscure execution order.
- Provider abstraction improves portability but may hide platform-specific failure modes.
- Master-agent architecture centralizes policy but creates availability and scaling concerns.
- Convergence can repair drift but may surprise manual operators.

## Useful Wiki Pages To Create Later

- wiki/projects/puppet.md
- wiki/components/catalog-compiler.md
- wiki/components/provider.md
- wiki/patterns/declarative-configuration.md
- wiki/quality-attributes/reproducibility.md
