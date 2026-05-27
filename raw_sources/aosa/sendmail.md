# Sendmail

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 1, "Sendmail": https://aosabook.org/en/v1/sendmail.html

## Project Purpose

Sendmail is a mail transfer agent that routes, queues, rewrites, and delivers email across networks. Its architecture reflects email protocol requirements, configurable policy, address rewriting, and reliable delivery.

## Architectural Style

- Message transfer architecture
- Queue-based processing
- Rule-driven routing architecture
- Protocol adapter architecture

## Main Components

- SMTP server and client logic
- Message queue
- Address parser and rewriter
- Rulesets and configuration engine
- Delivery agents
- Mailer definitions
- Alias and routing databases
- Security and policy checks

## Interfaces

- SMTP protocol interface
- Configuration file interface
- Ruleset and macro interface
- Queue file interface
- Local delivery interface
- DNS and routing interfaces
- External mailer interface

## Data and State Management

- Messages move through parsing, rewriting, queuing, routing, and delivery stages.
- Configuration rules transform recipient and sender addresses.
- Queues persist messages that cannot be delivered immediately.
- Mailer definitions describe delivery mechanisms.
- Aliases and maps provide lookup data for routing and policy.

## Quality Attributes

- Reliability through durable queuing and retry behavior
- Configurability for complex mail routing environments
- Interoperability with SMTP and local mail systems
- Security sensitivity because mail transfer agents face hostile input
- Operability through logs, queues, and policy controls

## Key Architectural Decisions

- Use rule sets to express address rewriting and routing policy.
- Persist undelivered messages in queues.
- Separate protocol handling from delivery agents.
- Support external maps and aliases for routing decisions.
- Provide a highly configurable engine for varied deployment environments.

## Tradeoffs

- Configuration power supports many environments but makes the system hard to understand.
- Flexible rewriting rules are expressive but error-prone.
- Durable queues improve reliability but require queue management.
- A broad protocol-facing surface creates security and validation challenges.

## Useful Wiki Pages To Create Later

- wiki/projects/sendmail.md
- wiki/components/message-queue.md
- wiki/components/routing-rules.md
- wiki/patterns/pipeline-architecture.md
- wiki/quality-attributes/reliability.md
