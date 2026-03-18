#!/usr/bin/env node

const fs = require("fs/promises");
const path = require("path");

async function mergeIntoRepo(targetDir, filePlan, options = {}) {
  const overwrite = options.overwrite || "skip";
  const dryRun = Boolean(options.dryRun);
  const results = [];

  for (const item of filePlan) {
    const absolutePath = path.join(targetDir, item.targetPath);
    const exists = await pathExists(absolutePath);

    if (exists && overwrite === "fail") {
      throw new Error(`Refusing to overwrite existing file: ${item.targetPath}`);
    }

    if (exists && overwrite === "skip") {
      results.push({ path: item.targetPath, status: "skipped" });
      continue;
    }

    results.push({
      path: item.targetPath,
      status: dryRun ? "planned" : exists ? "replaced" : "created"
    });

    if (dryRun) continue;

    await fs.mkdir(path.dirname(absolutePath), { recursive: true });
    await fs.writeFile(absolutePath, item.content, "utf8");
  }

  return {
    overwrite,
    dryRun,
    created: results.filter((item) => item.status === "created").length,
    replaced: results.filter((item) => item.status === "replaced").length,
    skipped: results.filter((item) => item.status === "skipped").length,
    planned: results.filter((item) => item.status === "planned").length,
    results
  };
}

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readPlan(planArg) {
  if (!planArg || planArg === "-") {
    const chunks = [];
    for await (const chunk of process.stdin) chunks.push(chunk);
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  }

  const raw = await fs.readFile(path.resolve(planArg), "utf8");
  return JSON.parse(raw);
}

function parseArgs(argv) {
  const parsed = { _: [] };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (!arg.startsWith("--")) {
      parsed._.push(arg);
      continue;
    }

    const [key, inlineValue] = arg.slice(2).split("=");
    if (inlineValue !== undefined) {
      parsed[key] = inlineValue;
      continue;
    }

    if (key === "dry-run") {
      parsed.dryRun = true;
      continue;
    }

    parsed[key] = argv[index + 1];
    index += 1;
  }

  return parsed;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const targetDir = path.resolve(args._[0] || process.cwd());
  const plan = await readPlan(args.plan);
  const filePlan = Array.isArray(plan) ? plan : plan.filePlan;

  if (!Array.isArray(filePlan)) {
    throw new Error("Plan must be an array or an object with a filePlan array.");
  }

  const result = await mergeIntoRepo(targetDir, filePlan, {
    overwrite: args.overwrite || "skip",
    dryRun: args.dryRun
  });

  console.log(JSON.stringify(result, null, 2));
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}

module.exports = {
  mergeIntoRepo
};
