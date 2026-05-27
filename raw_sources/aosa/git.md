# Git

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 2, "Git" by Susan Potter: https://aosabook.org/en/v2/git.html

## Project Purpose

Git is a distributed version control system for maintaining a digital body of
work across many collaborators and repositories. It supports local commits,
offline work, branching, merging, and synchronization between peer repositories.

## Architectural Style

- Distributed version control
- Content-addressed object storage
- Directed acyclic graph for content and history
- Toolkit-style command architecture
- File-system-backed repository format

## Main Components

- Working directory: the checked-out files a user edits.
- Index: the staging area between the working directory and the repository.
- Repository directory: the `.git` directory that stores all repository state.
- Object database: immutable objects under `.git/objects`.
- References: mutable pointers under `.git/refs`, including branches and tags.
- `HEAD`: the current reference or commit.
- Hooks: user-provided scripts triggered by repository lifecycle events.
- Packfiles and pack indexes: compressed storage for many objects.
- Porcelain and plumbing commands: user-facing commands and lower-level tools.

## Interfaces

- Command-line interface through Git commands.
- File-system interface through the `.git` directory format.
- Remote repository communication protocols.
- Hook script interface.
- Environment variables that can customize repository, index, and working tree
  paths.
- Library-style consumers through related projects such as JGit and libgit2,
  outside the core toolkit model.

## Data and State Management

- Git stores content as immutable objects.
- The primitive object types are blob, tree, commit, and tag.
- Objects are identified by hashes, so identity and integrity are connected.
- A tree object represents directory structure; a blob represents file content;
  a commit points to a root tree and parent commits.
- References are mutable names that point to objects, usually commits or tags.
- The index stores staged content before it becomes a commit.
- Packfiles compress and group objects to reduce storage and transfer cost.
- Remote synchronization computes which commits and objects need to be sent.

## Quality Attributes

- Integrity: object hashes detect identity and corruption problems.
- Reliability: each clone can contain complete repository history.
- Availability: users can commit and inspect history offline.
- Performance: most operations are local; packfiles reduce storage and transfer
  overhead.
- Modifiability: the repository format and plumbing commands are scriptable.
- Usability: distributed workflows are powerful, but can be harder to understand
  than centralized version control.

## Key Architectural Decisions

- Store snapshots and history as directed acyclic graphs.
- Use content-addressed immutable objects.
- Keep references outside the object database so branch names can move.
- Use an explicit index as a staging area.
- Provide many small commands in a toolkit model.
- Compress object storage with packfiles and pack indexes.

## Tradeoffs

- Distributed workflows provide flexibility but increase conceptual complexity.
- A toolkit command model is scriptable, but core Git was historically harder to
  embed in long-running applications than a linkable library.
- Loose objects are easy to create and inspect, but inefficient for large
  repositories without packing.
- Content-addressed storage protects integrity, but exposes users and tools to
  low-level object concepts.

## Useful Wiki Pages To Create Later

- `wiki/projects/git.md`
- `wiki/adrs/git-adr-001-content-addressed-storage.md`
- `wiki/components/object-database.md`
- `wiki/components/index-staging-area.md`
- `wiki/components/reference-store.md`
- `wiki/patterns/content-addressed-storage.md`
- `wiki/quality-attributes/integrity.md`
- `wiki/quality-attributes/modifiability.md`
