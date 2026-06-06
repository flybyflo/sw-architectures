# Example Answer: Git Data Management

Question:
How does Git manage data and state?

Pages consulted:
- wiki/index.md
- wiki/projects/git.md
- wiki/components/object-database.md
- wiki/patterns/content-addressed-storage.md
- wiki/adrs/git-adr-001-content-addressed-storage.md

Answer:
Git manages data with an immutable content-addressed object database and
separate mutable references. Blobs store file contents, trees store directory
structure, commits point to root trees and parent commits, and references name
moving positions such as branches. The index is a staging boundary between the
working directory and the repository. Content-addressed storage connects object
identity to stored content, supporting integrity checks across repository
history.

Sources used:
- wiki/projects/git.md
- wiki/components/object-database.md
- wiki/patterns/content-addressed-storage.md
- wiki/adrs/git-adr-001-content-addressed-storage.md
