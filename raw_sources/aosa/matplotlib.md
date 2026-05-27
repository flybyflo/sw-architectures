# Matplotlib

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 2, "matplotlib" by John Hunter and Michael Droettboom:
  https://aosabook.org/en/v2/matplotlib.html

## Project Purpose

Matplotlib is a Python plotting library for creating 2D graphics and limited 3D
graphics in scientific, interactive, desktop, web, and hardcopy contexts. It
supports simple MATLAB-style plotting, object-oriented control for more advanced
programs, multiple UI toolkits, and multiple raster/vector output formats.

## Architectural Style

- Layered architecture
- Backend abstraction
- Object-oriented graphics model
- Stateful scripting facade over an object-oriented core
- Cross-platform UI and rendering adapter architecture
- Scene graph-like artist hierarchy

## Main Components

- Figure: top-level object that contains and manages the elements of a graphic.
- Backend layer: concrete implementations for drawing to UI windows or output
  files.
- FigureCanvas: abstraction for the drawing surface.
- Renderer: low-level drawing interface used to render graphical primitives.
- Event: abstraction for keyboard, mouse, and other user input events.
- Artist hierarchy: middle layer of objects that know how to draw themselves
  using a renderer.
- Primitive artists: lines, text, rectangles, images, patches, and similar
  visible elements.
- Composite artists: Figure, Axes, Axis, Tick, and collections of other artists.
- Axes: central plotting area that contains many plotting methods and manages
  artists for plotted data.
- Scripting layer: `pyplot`, a stateful interface for quick interactive and
  script-style plotting.
- Transform framework: coordinate transformation graph from data coordinates to
  display/output coordinates.
- Agg renderer: high-quality anti-aliased pixel renderer used for consistent
  raster output and UI integration.

## Interfaces

- Object-oriented Python API through Figure, Axes, and Artist objects.
- Stateful `pyplot` API for MATLAB-style plotting.
- Backend API with required drawing methods such as path, image, text, and text
  metrics operations.
- Optional backend API methods for more efficient output, such as markers, path
  collections, and meshes.
- UI toolkit interfaces for GTK, Qt, Tk, FLTK, wxWidgets, Cocoa, and similar
  environments.
- Hardcopy output interfaces for PNG, PDF, SVG, PostScript, and other formats.
- Event callback interface for interactive plotting.
- Configuration interface for selecting default backends and behavior.

## Data and State Management

- Figure contains the high-level graph of visible content.
- Artists hold visual properties, transforms, visibility, labels, clipping
  regions, and interaction hooks.
- Composite artists contain primitive artists and other composites.
- Axes stores plotted artists such as lines, images, patches, ticks, and labels.
- `pyplot` keeps module-level state for the current figure and current axes.
- Backend selection is controlled through configuration and runtime environment.
- Transform nodes form a dependency graph that maps data, axes, figure, and
  display coordinate systems.
- Transform invalidation avoids recomputing unrelated transformations when only
  part of a plot changes.

## Quality Attributes

- Portability: backend abstraction supports many UI toolkits and output formats.
- Modifiability: rendering devices are isolated behind backend interfaces.
- Usability: `pyplot` supports simple exploratory plotting with little boilerplate.
- Flexibility: the object-oriented API supports advanced embedding and custom
  graphics behavior.
- Performance: Agg provides efficient anti-aliased raster rendering and transform
  invalidation reduces unnecessary recomputation.
- Consistency: shared core rendering and Agg output help produce similar results
  across UI toolkits and PNG output.
- Extensibility: new backends and artists can be added through the established
  interfaces.

## Key Architectural Decisions

- Separate the representation of a Figure from the act of rendering it.
- Use a three-layer stack: backend, artist, and scripting.
- Provide a stateful `pyplot` facade for interactive users while keeping an
  object-oriented core for applications.
- Abstract rendering through FigureCanvas and Renderer interfaces.
- Normalize UI events into a Matplotlib event framework.
- Use Agg as a core pixel renderer for high-quality and consistent output.
- Simplify the backend API by moving shared behavior into the core.
- Represent visible plot elements as Artists.
- Model coordinate transformations as a graph with invalidation behavior.

## Tradeoffs

- A stateful scripting interface improves usability, but hides object ownership
  and can make program structure less explicit.
- Backend abstraction enables portability, but requires careful design so backend
  APIs stay small and stable.
- Supporting many UI toolkits increases reach, but creates integration and
  compatibility work.
- Moving behavior from backends into the core simplifies backend development,
  but may require optional backend hooks for efficient output.
- The transform graph enables powerful plotting behavior, but adds conceptual
  and implementation complexity.
- Reimplementing some graphics infrastructure gave Matplotlib control over its
  architecture, but created maintenance cost that integration with existing
  toolkits might have reduced.

## Useful Wiki Pages To Create Later

- `wiki/projects/matplotlib.md`
- `wiki/adrs/matplotlib-adr-001-separate-figure-model-from-rendering-backends.md`
- `wiki/adrs/matplotlib-adr-002-layer-pyplot-over-object-oriented-core.md`
- `wiki/adrs/matplotlib-adr-003-use-agg-renderer-for-consistent-output.md`
- `wiki/components/figure.md`
- `wiki/components/artist-hierarchy.md`
- `wiki/components/backend-layer.md`
- `wiki/components/renderer.md`
- `wiki/components/transform-graph.md`
- `wiki/patterns/layered-architecture.md`
- `wiki/patterns/adapter.md`
- `wiki/quality-attributes/portability.md`
- `wiki/quality-attributes/usability.md`
- `wiki/quality-attributes/modifiability.md`
