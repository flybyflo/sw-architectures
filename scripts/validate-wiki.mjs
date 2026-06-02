#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const reviewDirs = new Set(["projects", "adrs", "components", "patterns", "quality-attributes"]);
const markdownLink = /(?<!!)\[[^\]]+\]\(([^)]+)\)/g;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    if (entry.isFile() && entry.name.endsWith(".md")) files.push(full);
  }
  return files;
}

function rel(file) {
  return path.relative(root, file);
}

function validateLinks(files) {
  const failures = [];
  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    for (const match of text.matchAll(markdownLink)) {
      const target = match[1].trim();
      if (!target || target.startsWith("#") || /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(target)) continue;
      const targetPath = target.split("#", 1)[0].replace(/^<|>$/g, "");
      if (!targetPath) continue;
      const destination = path.resolve(path.dirname(file), targetPath);
      if (!fs.existsSync(destination)) {
        const line = text.slice(0, match.index).split("\n").length;
        failures.push(`${rel(file)}:${line} broken link -> ${target}`);
      }
    }
  }
  return failures;
}

function validateFrontmatter() {
  const failures = [];
  for (const file of walk(path.join(root, "wiki"))) {
    const parts = rel(file).split(path.sep);
    if (parts.length >= 3 && reviewDirs.has(parts[1])) {
      const text = fs.readFileSync(file, "utf8");
      if (!text.startsWith("---\n")) failures.push(`${rel(file)} missing frontmatter`);
    }
  }
  return failures;
}

function validateIndexCoverage() {
  const failures = [];
  const index = fs.readFileSync(path.join(root, "wiki", "index.md"), "utf8");
  for (const file of walk(path.join(root, "wiki"))) {
    const wikiRel = path.relative(path.join(root, "wiki"), file);
    const first = wikiRel.split(path.sep)[0];
    if (reviewDirs.has(first) && !index.includes(wikiRel.split(path.sep).join("/"))) {
      failures.push(`wiki/index.md missing ${wikiRel}`);
    }
  }
  return failures;
}

function validateRawSourceUrls() {
  const failures = [];
  for (const file of walk(path.join(root, "raw_sources"))) {
    if (path.basename(file) === "README.md") continue;
    const text = fs.readFileSync(file, "utf8");
    if (!text.includes("http://") && !text.includes("https://")) {
      failures.push(`${rel(file)} has no source URL`);
    }
  }
  return failures;
}

function validatePortability(files) {
  const failures = [];
  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    if (text.includes("file:///Users/") || text.includes("file:///home/")) {
      failures.push(`${rel(file)} contains an absolute local file URI`);
    }
  }
  return failures;
}

const files = walk(root);
const checks = new Map([
  ["links", validateLinks(files)],
  ["frontmatter", validateFrontmatter()],
  ["index", validateIndexCoverage()],
  ["raw_source_urls", validateRawSourceUrls()],
  ["portability", validatePortability(files)],
]);

let failed = false;
for (const [name, failures] of checks.entries()) {
  if (failures.length === 0) {
    console.log(`${name}: ok`);
  } else {
    failed = true;
    console.log(`${name}: FAIL (${failures.length})`);
    for (const failure of failures) console.log(`  - ${failure}`);
  }
}

process.exit(failed ? 1 : 0);
