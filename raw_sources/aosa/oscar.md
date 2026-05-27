# OSCAR

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 2, "OSCAR": https://aosabook.org/en/v2/oscar.html

## Project Purpose

OSCAR is a toolkit for installing, configuring, and managing high-performance computing clusters. Its architecture packages cluster software, deployment workflows, images, and management tools into a reusable cluster-building system.

## Architectural Style

- Cluster management architecture
- Package-based deployment architecture
- Workflow/toolkit architecture
- Provisioning architecture

## Main Components

- Server node
- Compute nodes
- Package system
- Image creation tools
- Provisioning workflow
- Configuration scripts
- Cluster services
- Monitoring and management tools

## Interfaces

- Installer interface
- Package metadata interface
- Node provisioning interface
- Configuration script interface
- Cluster service interfaces
- Administrative command interface

## Data and State Management

- Cluster configuration describes nodes, packages, services, and deployment choices.
- Images or package sets define what compute nodes receive.
- Provisioning state tracks node installation and configuration progress.
- Package metadata captures dependencies and install behavior.
- Monitoring data reflects cluster health.

## Quality Attributes

- Repeatability for cluster installation
- Operability for administrators
- Modifiability through packages
- Scalability across many nodes
- Reliability concerns around provisioning and configuration drift

## Key Architectural Decisions

- Package cluster capabilities as reusable installable units.
- Automate node provisioning and configuration.
- Separate management node responsibilities from compute node roles.
- Use metadata to manage package dependencies and installation.
- Provide a toolkit rather than a single monolithic cluster product.

## Tradeoffs

- Package modularity supports customization but increases integration testing.
- Automation speeds deployment but failures can affect many nodes.
- Supporting diverse cluster software creates dependency complexity.
- Management-node centralization simplifies coordination but can become an operational dependency.

## Useful Wiki Pages To Create Later

- wiki/projects/oscar.md
- wiki/components/provisioning-system.md
- wiki/components/package-manager.md
- wiki/patterns/infrastructure-as-code.md
- wiki/quality-attributes/operability.md
