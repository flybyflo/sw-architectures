# FreeRTOS

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 2, "FreeRTOS": https://aosabook.org/en/v2/freertos.html

## Project Purpose

FreeRTOS is a small real-time operating system kernel for embedded systems. Its architecture provides tasks, scheduling, synchronization, timers, and portable hardware abstraction for resource-constrained devices.

## Architectural Style

- Real-time kernel architecture
- Portable embedded OS architecture
- Priority-based scheduling architecture
- Small modular kernel

## Main Components

- Scheduler
- Tasks
- Queues
- Semaphores and mutexes
- Timers
- Interrupt integration
- Portable layer
- Memory management options
- Configuration header

## Interfaces

- Task API
- Queue API
- Synchronization APIs
- Timer API
- Interrupt-safe API variants
- Port layer interface
- Configuration macros

## Data and State Management

- Task control blocks store task state, stack, priority, and scheduling data.
- Queues hold messages between tasks and interrupts.
- Semaphores and mutexes coordinate shared resources.
- Timers store callback and expiry state.
- Configuration constants select kernel features and memory behavior.

## Quality Attributes

- Predictability for real-time workloads
- Portability across microcontrollers
- Small footprint for constrained devices
- Configurability by compile-time options
- Reliability through simple kernel mechanisms

## Key Architectural Decisions

- Use priority-based scheduling for deterministic task selection.
- Keep the kernel small and configurable.
- Expose queues as a central communication primitive.
- Separate portable kernel code from processor-specific port code.
- Provide interrupt-safe API variants.

## Tradeoffs

- Small configurable kernels reduce footprint but push feature choices to integrators.
- Priority scheduling is predictable but can suffer priority inversion without careful synchronization.
- Compile-time configuration improves size but reduces runtime flexibility.
- Manual memory and stack sizing require embedded expertise.

## Useful Wiki Pages To Create Later

- wiki/projects/freertos.md
- wiki/components/scheduler.md
- wiki/components/task.md
- wiki/patterns/real-time-kernel.md
- wiki/quality-attributes/predictability.md
