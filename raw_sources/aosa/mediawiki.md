# MediaWiki

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 2, "MediaWiki" by Sumana Harihareswara and Guillaume Paumier:
  https://aosabook.org/en/v2/mediawiki.html

## Project Purpose

MediaWiki is the wiki engine created for Wikipedia and later reused by many
third-party wikis. Its architecture is shaped by Wikipedia's needs: very high
read traffic, collaborative editing, openness, anti-abuse tools, international
use, and low-cost operation.

## Architectural Style

- PHP web application
- Database-backed content management
- Layered caching architecture
- Request pipeline with specialized page handlers
- Hook-based extension architecture
- API-enabled web platform

## Main Components

- `index.php`: main browser request entry point.
- `api.php`: machine-readable web API entry point.
- Article handling: normal page request flow.
- Special pages: software-generated pages for reports, logs, and admin tools.
- Parser and wikitext processor: transform wiki markup into rendered output.
- Database layer: stores pages, revisions, users, permissions, and metadata.
- Reverse proxy cache: Squid or Varnish for anonymous read traffic.
- Object cache: stores rendered or computed objects to avoid repeated work.
- Job queue and deferred updates: move expensive work out of the request path.
- ResourceLoader: optimizes JavaScript and CSS delivery.
- Extensions, hooks, and skins: customize behavior and appearance.
- Namespace system: separates page types such as article, talk, file, template,
  user, and system pages.

## Interfaces

- Browser interface for readers and editors.
- Web API for external programs.
- Hook interface for extensions.
- Skin interface for presentation.
- Configuration variables for deployment-specific behavior.
- Database interface for persistent content and metadata.
- Cache interfaces for reverse proxies, object caches, and file caches.
- Custom JavaScript and CSS through wiki pages in controlled namespaces.
- Foreign media repository API for shared media such as Wikimedia Commons.

## Data and State Management

- User-generated content is stored as wikitext, not as final HTML.
- Pages are organized with namespaces and categories.
- Revisions preserve page history and support collaborative editing.
- User settings, rights, and identity are represented in user-related data
  structures, with common rendering settings cached in cookies where possible.
- Rendered pages and computed objects can be cached at multiple layers.
- Media can be local or referenced from foreign repositories, with local
  thumbnail caching.
- Deferred updates and jobs allow write-side and maintenance work to happen
  outside the main response path.

## Quality Attributes

- Performance: strong emphasis on profiling, caching, ResourceLoader, and
  request-path optimization.
- Scalability: reverse proxies and layered caches let anonymous read traffic
  avoid application servers when possible.
- Modifiability: hooks, extensions, skins, gadgets, and configuration support
  many kinds of customization.
- Security and abuse resistance: permissions, user roles, anti-spam, and
  anti-vandalism features are central to Wikipedia-style operation.
- Internationalization: message files, database message overrides, language
  fallback, and translation tooling support many languages.
- Usability: page editing, diffs, namespaces, categories, and user preferences
  support collaborative knowledge work.

## Key Architectural Decisions

- Optimize around Wikipedia's traffic and community model rather than a generic
  corporate CMS model.
- Use layered caching, including reverse proxy caching for anonymous reads.
- Store editable content in wikitext and render it through a parser.
- Provide namespaces to separate content, discussion, media, templates, users,
  and system pages.
- Use hooks and extensions so customization does not require changing core code.
- Provide a machine-readable API for external programs.
- Use ResourceLoader to reduce front-end asset cost.

## Tradeoffs

- Wikipedia's needs improved scalability but biased MediaWiki away from some
  generic CMS features.
- Heavy caching improves read performance, but pushes constraints into
  application behavior and invalidation logic.
- Hooks make extensions flexible, but can complicate abstraction, startup, and
  performance.
- Wikitext is editable and historically useful, but parsing and transformation
  are complex.
- Iterative evolution kept the site running, but left some architectural choices
  tied to historical constraints.

## Useful Wiki Pages To Create Later

- `wiki/projects/mediawiki.md`
- `wiki/adrs/mediawiki-adr-001-layered-caching.md`
- `wiki/adrs/mediawiki-adr-002-hook-based-extension-system.md`
- `wiki/components/parser.md`
- `wiki/components/reverse-proxy-cache.md`
- `wiki/components/plugin-system.md`
- `wiki/patterns/layered-architecture.md`
- `wiki/quality-attributes/performance.md`
- `wiki/quality-attributes/modifiability.md`
