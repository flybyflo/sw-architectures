# The Bourne-Again Shell

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 1, "The Bourne-Again Shell": https://aosabook.org/en/v1/bash.html

## Project Purpose

Bash is a command interpreter and scripting language compatible with the Bourne shell while adding interactive features, job control, command-line editing, and many extensions. Its architecture coordinates parsing, expansion, execution, process control, and user interaction.

## Architectural Style

- Interpreter architecture
- Pipeline and process-control architecture
- Layered command-processing architecture
- Interactive shell architecture

## Main Components

- Lexer and parser
- Expansion engine
- Command executor
- Builtin commands
- Shell variables and environment manager
- Job control subsystem
- Readline integration
- History mechanism
- Signal handling

## Interfaces

- Interactive terminal interface
- Shell scripting language interface
- POSIX process and file descriptor interfaces
- Environment variable interface
- Readline editing interface
- Builtin and external command invocation interfaces

## Data and State Management

- Parsed commands become internal command structures.
- Variables, positional parameters, and environment state influence expansion and execution.
- Jobs track process groups, states, and terminal ownership.
- History stores previously entered commands.
- Redirections and pipelines manipulate file descriptor state during execution.

## Quality Attributes

- Compatibility with historical shell behavior
- Usability for interactive users
- Portability across Unix-like systems
- Extensibility through builtins and shell functions
- Reliability concerns around signals, quoting, and process state

## Key Architectural Decisions

- Separate parsing, expansion, and execution phases.
- Support both script execution and interactive command-line use.
- Use builtins for operations that must affect shell process state.
- Integrate job control with process groups and terminal behavior.
- Preserve Bourne/POSIX compatibility while adding extensions.

## Tradeoffs

- Compatibility preserves existing scripts but constrains simplification.
- Shell expansion is powerful but difficult to reason about.
- Interactive features improve daily use but add state and signal-handling complexity.
- Builtins are necessary for shell semantics but make the command model less uniform.

## Useful Wiki Pages To Create Later

- wiki/projects/bash.md
- wiki/components/parser.md
- wiki/components/command-executor.md
- wiki/components/job-control.md
- wiki/quality-attributes/compatibility.md
