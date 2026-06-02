#!/usr/bin/env node
import { spawnSync } from "node:child_process";

const questionChecks = [
  {
    id: "Q01",
    name: "nginx components and process interaction",
    queries: [
      {
        lex: "nginx master worker event loop shared memory",
        vec: "nginx process architecture master workers event loop shared memory",
        expected: ["wiki/projects/nginx.md", "wiki/components/event-loop.md"],
      },
    ],
  },
  {
    id: "Q02",
    name: "Git storage and integrity",
    queries: [
      {
        lex: "Git blobs trees commits references index integrity",
        vec: "Git object database blobs trees commits refs index content hash integrity",
        expected: ["wiki/projects/git.md", "wiki/components/object-database.md"],
      },
    ],
  },
  {
    id: "Q03",
    name: "MediaWiki patterns and caching",
    queries: [
      {
        lex: "MediaWiki caching hooks extensibility Varnish Memcached parser cache",
        vec: "MediaWiki layered caching extension hooks parser cache architecture",
        expected: [
          "wiki/projects/mediawiki.md",
          "wiki/patterns/caching-strategies.md",
          "wiki/components/plugin-system.md",
        ],
      },
    ],
  },
  {
    id: "Q04",
    name: "HDFS fault tolerance and scalability",
    queries: [
      {
        lex: "HDFS NameNode DataNode replication heartbeats block reports",
        vec: "Hadoop HDFS NameNode DataNode block replication heartbeat fault tolerance",
        expected: ["wiki/projects/hadoop-hdfs.md", "wiki/components/namenode.md"],
      },
      {
        lex: "HDFS reliability replication checksum heartbeat block report",
        vec: "HDFS reliability fault tolerance replication heartbeats checksums",
        expected: ["wiki/quality-attributes/reliability.md"],
      },
    ],
  },
  {
    id: "Q05",
    name: "LLVM IR and modularity",
    queries: [
      {
        lex: "LLVM intermediate representation PassManager frontends backends",
        vec: "LLVM IR modular compiler pipeline frontends backends optimization passes",
        expected: [
          "wiki/projects/llvm.md",
          "wiki/components/intermediate-representation.md",
        ],
      },
    ],
  },
  {
    id: "Q06",
    name: "scalable web architecture components",
    queries: [
      {
        lex: "load balancer caching concurrent web traffic",
        vec: "scalable web architecture load balancing caching concurrent requests",
        expected: [
          "wiki/patterns/load-balancing.md",
          "wiki/patterns/caching-strategies.md",
        ],
      },
      {
        lex: "database sharding shard key horizontal scaling",
        vec: "database sharding for scalable web architecture",
        expected: ["wiki/patterns/database-sharding.md"],
      },
      {
        lex: "message queue asynchronous messaging concurrent load",
        vec: "asynchronous queues manage high concurrent load",
        expected: ["wiki/patterns/asynchronous-messaging.md"],
      },
    ],
  },
  {
    id: "Q07",
    name: "architectural styles and patterns",
    queries: [
      {
        lex: "client-server layered pub-sub event sourcing architectural patterns",
        vec: "architecture patterns client server layered publish subscribe event sourcing",
        expected: [
          "wiki/patterns/client-server.md",
          "wiki/patterns/layered-architecture.md",
          "wiki/patterns/asynchronous-messaging.md",
          "wiki/patterns/event-sourcing.md",
        ],
      },
    ],
  },
  {
    id: "Q08",
    name: "API Gateway rationale",
    queries: [
      {
        lex: "API Gateway authentication authorization rate limiting SSL termination",
        vec: "API gateway centralized cross cutting concerns authentication authorization rate limiting",
        expected: ["wiki/components/api-gateway.md"],
      },
      {
        lex: "API Gateway security scalability authentication authorization rate limiting",
        vec: "API gateway quality attributes security scalability centralized policy",
        expected: [
          "wiki/quality-attributes/security.md",
          "wiki/quality-attributes/scalability.md",
        ],
      },
    ],
  },
  {
    id: "Q09",
    name: "queue pub-sub event stream",
    queries: [
      {
        lex: "message queue publish-subscribe event stream consumer groups offsets",
        vec: "asynchronous messaging queue pub sub event stream durable log consumer groups",
        expected: [
          "wiki/patterns/asynchronous-messaging.md",
          "wiki/components/message-broker.md",
        ],
      },
    ],
  },
  {
    id: "Q10",
    name: "API Gateway internals",
    queries: [
      {
        lex: "API Gateway reverse proxy service discovery middleware backend interfaces",
        vec: "API gateway internal components public endpoint routing policy backend services middleware",
        expected: ["wiki/components/api-gateway.md"],
      },
    ],
  },
  {
    id: "Q11",
    name: "caching strategies and consistency",
    queries: [
      {
        lex: "cache-aside read-through write-through write-back",
        vec: "cache strategy selection read path write path write back",
        expected: ["wiki/patterns/caching-strategies.md"],
      },
      {
        lex: "cache consistency stale data eventual consistency",
        vec: "caching consistency tradeoffs and stale data",
        expected: ["wiki/quality-attributes/consistency.md"],
      },
    ],
  },
  {
    id: "Q12",
    name: "database sharding",
    queries: [
      {
        lex: "database sharding shard key hotspots re-sharding",
        vec: "database sharding shard key hotspot range hash directory resharding",
        expected: ["wiki/patterns/database-sharding.md"],
      },
      {
        lex: "database sharding scalability consistency shard key rebalancing",
        vec: "database sharding quality attributes scalability consistency tradeoffs",
        expected: [
          "wiki/quality-attributes/scalability.md",
          "wiki/quality-attributes/consistency.md",
        ],
      },
    ],
  },
  {
    id: "Q13",
    name: "distributed reliability",
    queries: [
      {
        lex: "retries circuit breakers bulkheads rate limiters cascading failures",
        vec: "distributed reliability retries circuit breaker bulkhead rate limiter cascading failure",
        expected: [
          "wiki/patterns/distributed-reliability.md",
          "wiki/quality-attributes/reliability.md",
        ],
      },
      {
        lex: "distributed reliability availability retries circuit breakers rate limiters",
        vec: "distributed reliability availability fault tolerance circuit breakers",
        expected: ["wiki/quality-attributes/availability.md"],
      },
    ],
  },
  {
    id: "Q14",
    name: "nginx quality attributes",
    queries: [
      {
        lex: "nginx performance scalability availability event-driven workers",
        vec: "nginx quality attributes performance scalability availability event driven worker",
        expected: [
          "wiki/projects/nginx.md",
          "wiki/quality-attributes/performance.md",
          "wiki/quality-attributes/scalability.md",
        ],
      },
      {
        lex: "nginx availability master workers live reconfiguration",
        vec: "nginx availability worker supervision uptime redundancy",
        expected: ["wiki/quality-attributes/availability.md"],
      },
    ],
  },
  {
    id: "Q15",
    name: "MediaWiki quality tradeoffs",
    queries: [
      {
        lex: "MediaWiki performance security hooks caching CSRF",
        vec: "MediaWiki quality attributes performance security hooks caching CSRF",
        expected: [
          "wiki/projects/mediawiki.md",
          "wiki/quality-attributes/security.md",
        ],
      },
      {
        lex: "MediaWiki performance caching ResourceLoader request path",
        vec: "MediaWiki performance caching request path optimization",
        expected: ["wiki/quality-attributes/performance.md"],
      },
      {
        lex: "MediaWiki plugin system hooks extensions skins gadgets",
        vec: "MediaWiki plugin system hooks extensions customization",
        expected: ["wiki/components/plugin-system.md"],
      },
      {
        lex: "MediaWiki modifiability extensions hooks skins gadgets",
        vec: "MediaWiki modifiability extension hooks customization",
        expected: ["wiki/quality-attributes/modifiability.md"],
      },
    ],
  },
  {
    id: "Q16",
    name: "Eclipse Jitsi MediaWiki extensibility",
    queries: [
      {
        lex: "Eclipse Jitsi MediaWiki plugins extension points OSGi hooks",
        vec: "Eclipse Jitsi MediaWiki extensibility plugin architecture OSGi services hooks",
        expected: [
          "wiki/projects/eclipse.md",
          "wiki/projects/jitsi.md",
          "wiki/projects/mediawiki.md",
          "wiki/patterns/plugin-architecture.md",
        ],
      },
    ],
  },
  {
    id: "Q17",
    name: "nginx versus HDFS scalability",
    queries: [
      {
        lex: "nginx HDFS scalability event-driven NameNode DataNode",
        vec: "nginx HDFS scalability concurrency distributed block storage NameNode DataNode",
        expected: [
          "wiki/projects/nginx.md",
          "wiki/projects/hadoop-hdfs.md",
          "wiki/quality-attributes/scalability.md",
        ],
      },
    ],
  },
  {
    id: "Q18",
    name: "Git versus Mercurial data management",
    queries: [
      {
        lex: "Git content-addressed DAG object database",
        vec: "Git object database content addressed directed acyclic graph",
        expected: ["wiki/projects/git.md"],
      },
      {
        lex: "Mercurial revlog dirstate changeset manifest filelog",
        vec: "Mercurial revlog storage dirstate changesets manifests filelogs",
        expected: ["wiki/projects/mercurial.md"],
      },
    ],
  },
  {
    id: "Q19",
    name: "API Gateway versus direct service access",
    queries: [
      {
        lex: "API Gateway direct client microservices topology bottleneck latency",
        vec: "API gateway versus direct client microservice access topology bottleneck latency",
        expected: [
          "wiki/components/api-gateway.md",
          "wiki/patterns/api-gateway-topology.md",
        ],
      },
    ],
  },
  {
    id: "Q20",
    name: "plugin-based modular open-source systems",
    queries: [
      {
        lex: "Eclipse MediaWiki Moodle plugin modular architecture modifiability",
        vec: "Eclipse MediaWiki Moodle plugin based modular architecture modifiability",
        expected: [
          "wiki/projects/eclipse.md",
          "wiki/projects/mediawiki.md",
          "wiki/projects/moodle.md",
        ],
      },
      {
        lex: "plugin architecture extension points modular systems",
        vec: "plugin architecture pattern modifiability extension points",
        expected: [
          "wiki/patterns/plugin-architecture.md",
        ],
      },
    ],
  },
  {
    id: "Q21",
    name: "Git cryptographic hash integrity",
    queries: [
      {
        lex: "Git object database SHA-1 hash integrity corruption commits",
        vec: "Git object database SHA-1 cryptographic hash integrity commits corruption",
        expected: [
          "wiki/projects/git.md",
          "wiki/components/object-database.md",
          "wiki/quality-attributes/security.md",
        ],
      },
    ],
  },
  {
    id: "Q22",
    name: "remaining reviewed coverage gaps",
    queries: [
      {
        lex: "remaining reviewed coverage gaps raw source only projects",
        vec: "which questions are unanswerable from reviewed wiki due to missing content",
        expected: ["wiki/index.md"],
      },
    ],
    rawQueries: [
      {
        lex: "AOSA catalog source-layer coverage Mercurial Moodle",
        vec: "raw source catalog for reviewed coverage gaps",
        expected: ["raw_sources/aosa/catalog.md"],
      },
    ],
  },
  {
    id: "Q23",
    name: "missing planned project syntheses",
    queries: [
      {
        lex: "missing planned project pages raw AOSA source-only",
        vec: "planned missing project pages source only AOSA notes",
        expected: ["wiki/index.md"],
      },
    ],
    rawQueries: [
      {
        lex: "AOSA catalog project chapters source-layer coverage",
        vec: "raw AOSA catalog project source notes",
        expected: ["raw_sources/aosa/catalog.md"],
      },
    ],
  },
  {
    id: "Q24",
    name: "recurring components and patterns",
    queries: [
      {
        lex: "API gateway recurring component routing authentication rate limiting",
        vec: "recurring API gateway component across architecture sources",
        expected: ["wiki/components/api-gateway.md"],
      },
      {
        lex: "message broker asynchronous messaging recurring component queue pub-sub stream",
        vec: "recurring messaging component queue pub sub event stream",
        expected: [
          "wiki/components/message-broker.md",
          "wiki/patterns/asynchronous-messaging.md",
        ],
      },
      {
        lex: "caching strategies recurring component MediaWiki scalable architecture",
        vec: "recurring caching pattern across MediaWiki and web architecture",
        expected: ["wiki/patterns/caching-strategies.md"],
      },
    ],
  },
];

function normalizePath(path) {
  return path
    .replace(/^\.\//, "")
    .replace(/^qmd:\/\/architecture-wiki\//, "wiki/")
    .replace(/^qmd:\/\/raw-sources\//, "raw_sources/")
    .replace(/extra-sources\//, "extra_sources/");
}

function qmdQuery({ lex, vec }, collection) {
  const queryDocument = `lex: ${lex}\nvec: ${vec}`;
  const result = spawnSync(
    "qmd",
    [
      "query",
      queryDocument,
      "-c",
      collection,
      "-n",
      "10",
      "--files",
      "--no-rerank",
    ],
    { encoding: "utf8", timeout: 30000 },
  );

  if (result.error) {
    throw result.error;
  }

  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
  if (result.status !== 0) {
    throw new Error(`qmd query failed for ${collection}: ${output}`);
  }

  const files = [];
  for (const line of output.split("\n")) {
    const match =
      line.match(/^#[^,]+,-?\d+(?:\.\d+)?,([^,]+),/) ??
      line.match(/^-?\d+(?:\.\d+)?,([^,]+),/);
    if (match) {
      files.push(normalizePath(match[1]));
    }
  }
  return files;
}

function runExpectedQueries(queries, collection) {
  const found = new Set();
  const missing = [];

  for (const query of queries) {
    const files = qmdQuery(query, collection);
    for (const file of files) found.add(file);

    for (const expected of query.expected) {
      if (!files.includes(expected)) {
        missing.push(expected);
      }
    }
  }

  return { found: [...found], missing };
}

let failed = false;
console.log("Full question bank QMD check");
console.log("Collection: architecture-wiki; fallback collection: raw-sources");

for (const check of questionChecks) {
  const reviewed = runExpectedQueries(check.queries, "architecture-wiki");
  const raw = check.rawQueries
    ? runExpectedQueries(check.rawQueries, "raw-sources")
    : { found: [], missing: [] };

  const missing = [...reviewed.missing, ...raw.missing];
  const status = missing.length === 0 ? "ok" : "FAIL";
  if (missing.length > 0) failed = true;

  console.log(
    `${check.id}: ${status} - ${check.name} (${check.queries.length} reviewed quer${
      check.queries.length === 1 ? "y" : "ies"
    })`,
  );

  if (missing.length > 0) {
    console.log(`  missing: ${missing.join(", ")}`);
    console.log(`  reviewed found: ${reviewed.found.slice(0, 8).join(", ")}`);
    if (raw.found.length > 0) {
      console.log(`  raw found: ${raw.found.slice(0, 5).join(", ")}`);
    }
  }
}

process.exit(failed ? 1 : 0);
