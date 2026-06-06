# Wiki Fixes and Remaining Gaps from Evaluation

This document records the gaps found during evaluation and the current status of
the fixes.

## Resolved Gaps

Earlier evaluation runs found that general distributed-systems questions
required raw source fallback because the reviewed wiki lacked generic pages for
API gateways, messaging, sharding, caching, distributed reliability,
availability, and consistency.

Those gaps have been addressed with reviewed pages:

- `wiki/components/api-gateway.md`
- `wiki/components/message-broker.md`
- `wiki/patterns/asynchronous-messaging.md`
- `wiki/patterns/caching-strategies.md`
- `wiki/patterns/database-sharding.md`
- `wiki/patterns/distributed-reliability.md`
- `wiki/patterns/event-sourcing.md`
- `wiki/patterns/load-balancing.md`
- `wiki/patterns/plugin-architecture.md`
- `wiki/patterns/api-gateway-topology.md`
- `wiki/quality-attributes/availability.md`
- `wiki/quality-attributes/consistency.md`
- updated `wiki/quality-attributes/reliability.md`
- `wiki/projects/eclipse.md`
- `wiki/projects/jitsi.md`
- `wiki/projects/mercurial.md`
- `wiki/projects/moodle.md`

The updated evaluation answers now cite reviewed pages first for all selected
evaluation questions, and the full 24-question bank passes QMD retrieval
coverage with `node scripts/check-questions.mjs`.

## Remaining Gaps

The reviewed layer is not complete for every raw source note. Remaining
improvements:

1. Add reviewed project pages for additional AOSA notes such as Bash, Asterisk,
   Berkeley DB, and the remaining raw-source-only projects.
2. Add reviewed pages for Observability, Service Discovery, and deeper
   load-balancer internals.
3. Re-run manual validation when new reviewed pages are added.

## Fix Log Reference

The corresponding maintainer log entries are in `wiki/log.md` under:

- 2026-05-31 Evaluation Validation and Gap Identification
- 2026-06-01 Closing the Gaps: Full Synthesis of Extra Sources
- 2026-06-02 Assignment Alignment and Retrieval Hardening
