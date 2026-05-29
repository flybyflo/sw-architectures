Question:
How does Git manage data and state?

Pages consulted:
- wiki/index.md
- wiki/projects/git.md
- wiki/patterns/content-addressable-storage.md

Answer:
Git manages its version control state and data using an immutable Directed Acyclic Graph (DAG) composed of objects stored in a content-addressable system. Every structural asset (files, directories, commit history) is uniquely identified by a cryptographic SHA-1 checksum computed directly from its content. Git structures data using four primary object components: `blobs` (storing raw file data), `trees` (representing directory states pointing to blobs or sub-trees), `commits` (snapshots referencing a specific top-level tree with metadata and parent history pointers), and `tags`. This ensures data integrity and high performance, as identical file versions share the same blob references naturally.

Sources used:
- wiki/projects/git.md
- wiki/patterns/content-addressable-storage.md
