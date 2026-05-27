# GNU Mailman

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 2, "GNU Mailman": https://aosabook.org/en/v2/mailman.html

## Project Purpose

GNU Mailman is mailing-list management software. Its architecture receives messages, applies list policy, queues work, delivers mail, manages subscriptions, and exposes administrative and archive interfaces.

## Architectural Style

- Message-processing pipeline
- Queue-based architecture
- Policy-driven application architecture
- Web/admin plus mail integration

## Main Components

- Mail receiver
- List manager
- Queue runners
- Message handlers
- Membership database
- Policy and moderation logic
- Delivery engine
- Web administration interface
- Archive integration

## Interfaces

- SMTP/mail transport interface
- List address interface
- Web admin interface
- Subscription and moderation interfaces
- Queue file interface
- Archive interface

## Data and State Management

- Incoming messages are queued and processed by handlers.
- List configuration defines membership, moderation, and delivery policy.
- Subscriber data stores addresses, preferences, and permissions.
- Archives retain public or private message history.
- Queue state persists pending messages and retries.

## Quality Attributes

- Reliability through queues and retries
- Modifiability through handler pipelines
- Security through moderation and access controls
- Operability through admin interfaces
- Scalability for list volume through runners

## Key Architectural Decisions

- Use queues to decouple receiving, processing, and delivery.
- Represent list behavior through configuration and policy.
- Separate administrative web interfaces from mail-processing paths.
- Use handler pipelines for message transformations and checks.
- Persist membership and pending message state.

## Tradeoffs

- Queues improve reliability but introduce delayed behavior and operational cleanup.
- Policy flexibility supports varied list use cases but increases configuration complexity.
- Email protocols require defensive handling of malformed and hostile input.
- Archiving improves transparency but raises privacy and storage concerns.

## Useful Wiki Pages To Create Later

- wiki/projects/gnu-mailman.md
- wiki/components/message-pipeline.md
- wiki/components/list-policy.md
- wiki/patterns/message-queue.md
- wiki/quality-attributes/reliability.md
