#!/usr/bin/env node

const fs = require("fs/promises");
const path = require("path");

const IGNORE_NAMES = new Set([
  ".git",
  ".DS_Store",
  "node_modules",
  ".next",
  "dist",
  "build",
  "coverage"
]);

async function detectProject(targetDir = process.cwd()) {
  const resolvedDir = path.resolve(targetDir);
  const entries = await safeReadDir(resolvedDir);
  const visibleEntries = entries.filter((entry) => !IGNORE_NAMES.has(entry.name));
  const packageJson = await readJson(path.join(resolvedDir, "package.json"));
  const deps = collectDependencies(packageJson);
  const names = new Set(entries.map((entry) => entry.name));
  const signals = [];

  if (packageJson) signals.push("package-json");
  if (hasNextConfig(names)) signals.push("next-config");
  if (names.has("app") || names.has("pages")) signals.push("next-routes");
  if (await pathExists(path.join(resolvedDir, "src", "app"))) signals.push("src-app");
  if (await hasNodeApiFiles(resolvedDir)) signals.push("node-entry");
  if (deps.has("next")) signals.push("next-dep");
  if (hasAny(deps, ["express", "fastify", "@nestjs/core", "hono", "koa"])) {
    signals.push("api-dep");
  }
  if (hasAny(deps, ["stripe", "@shopify/shopify-api", "medusa", "commerce-sdk"])) {
    signals.push("commerce-dep");
  }

  const isEmpty = visibleEntries.length === 0;
  const stack = classifyStack({ isEmpty, signals });
  const blueprint = suggestBlueprint({ isEmpty, stack, signals });

  return {
    targetDir: resolvedDir,
    isEmpty,
    stack,
    blueprint,
    signals,
    packageManager: detectPackageManager(names)
  };
}

async function safeReadDir(dir) {
  try {
    return await fs.readdir(dir, { withFileTypes: true });
  } catch (error) {
    throw new Error(`Unable to read target directory: ${dir}\n${error.message}`);
  }
}

async function readJson(filePath) {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function collectDependencies(packageJson) {
  const deps = new Set();
  if (!packageJson) return deps;

  for (const section of ["dependencies", "devDependencies", "peerDependencies"]) {
    for (const name of Object.keys(packageJson[section] || {})) {
      deps.add(name);
    }
  }

  return deps;
}

function hasNextConfig(names) {
  return ["next.config.js", "next.config.mjs", "next.config.ts"].some((name) =>
    names.has(name)
  );
}

async function hasNodeApiFiles(targetDir) {
  const candidates = [
    "server.js",
    "server.ts",
    "index.js",
    "index.ts",
    path.join("src", "server.js"),
    path.join("src", "server.ts"),
    path.join("src", "index.js"),
    path.join("src", "index.ts"),
    "routes",
    path.join("src", "routes")
  ];

  for (const candidate of candidates) {
    if (await pathExists(path.join(targetDir, candidate))) {
      return true;
    }
  }

  return false;
}

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function hasAny(set, names) {
  return names.some((name) => set.has(name));
}

function classifyStack({ isEmpty, signals }) {
  if (isEmpty) return "empty";
  if (signals.includes("next-dep") || signals.includes("next-config") || signals.includes("next-routes") || signals.includes("src-app")) {
    return "nextjs";
  }
  if (signals.includes("api-dep") || signals.includes("node-entry")) {
    return "node-api";
  }
  return "unknown";
}

function suggestBlueprint({ isEmpty, stack, signals }) {
  if (isEmpty) return "core";
  if (signals.includes("commerce-dep")) return "ecommerce";
  if (stack === "nextjs") return "saas";
  if (stack === "node-api") return "internal-tools";
  return "core";
}

function detectPackageManager(names) {
  if (names.has("pnpm-lock.yaml")) return "pnpm";
  if (names.has("yarn.lock")) return "yarn";
  if (names.has("package-lock.json")) return "npm";
  return "unknown";
}

function formatResult(result) {
  return [
    `targetDir: ${result.targetDir}`,
    `empty: ${result.isEmpty}`,
    `stack: ${result.stack}`,
    `blueprint: ${result.blueprint}`,
    `packageManager: ${result.packageManager}`,
    `signals: ${result.signals.join(", ") || "none"}`
  ].join("\n");
}

async function main() {
  const args = process.argv.slice(2);
  const targetDir = args.find((arg) => !arg.startsWith("--")) || process.cwd();
  const json = args.includes("--json");
  const result = await detectProject(targetDir);
  console.log(json ? JSON.stringify(result, null, 2) : formatResult(result));
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}

module.exports = {
  detectProject,
  suggestBlueprint,
  classifyStack
};
