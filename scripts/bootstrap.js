#!/usr/bin/env node

const fs = require("fs/promises");
const path = require("path");
const { detectProject } = require("./detect-project");
const { mergeIntoRepo } = require("./merge-into-repo");

const REPO_ROOT = path.resolve(__dirname, "..");
const GENERATED_ROOTS = {
  agents: "agents",
  docs: path.join("docs", "ai-team"),
  prompts: path.join("prompts", "ai-team"),
  workflows: path.join("workflows", "ai-team")
};

async function loadBlueprint(name) {
  const blueprintPath = path.join(REPO_ROOT, "blueprints", name, "blueprint.json");
  const raw = await fs.readFile(blueprintPath, "utf8");
  return JSON.parse(raw);
}

async function loadTemplate(group, fileName) {
  const templatePath = path.join(REPO_ROOT, "templates", group, fileName);
  return fs.readFile(templatePath, "utf8");
}

async function buildFilePlan(blueprint, detected) {
  const filePlan = [];

  for (const agent of blueprint.defaultAgents) {
    const content = await loadTemplate("agents", `${agent}.md`);
    filePlan.push({
      targetPath: path.join(GENERATED_ROOTS.agents, `${agent}.md`),
      content
    });
  }

  for (const fileName of blueprint.include.docs) {
    const content = await loadTemplate("docs", fileName);
    filePlan.push({
      targetPath: path.join(GENERATED_ROOTS.docs, fileName),
      content
    });
  }

  for (const fileName of blueprint.include.prompts) {
    const content = await loadTemplate("prompts", fileName);
    filePlan.push({
      targetPath: path.join(GENERATED_ROOTS.prompts, fileName),
      content
    });
  }

  for (const fileName of blueprint.include.workflows) {
    const content = await loadTemplate("workflows", fileName);
    filePlan.push({
      targetPath: path.join(GENERATED_ROOTS.workflows, fileName),
      content
    });
  }

  filePlan.push({
    targetPath: path.join(".codex-team", "manifest.json"),
    content: JSON.stringify(
      {
        generatedBy: "codex-team-bootstrapper",
        blueprint: blueprint.id,
        stack: detected.stack,
        suggestedByDetection: detected.blueprint,
        signals: detected.signals,
        defaultAgents: blueprint.defaultAgents,
        include: blueprint.include,
        instructions: blueprint.instructions,
        businessConcerns: blueprint.businessConcerns,
        workflowEmphasis: blueprint.workflowEmphasis
      },
      null,
      2
    ) + "\n"
  });

  return filePlan;
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

    if (key === "json") {
      parsed.json = true;
      continue;
    }

    parsed[key] = argv[index + 1];
    index += 1;
  }

  return parsed;
}

function formatSummary(targetDir, detected, blueprint, mergeResult) {
  return [
    `targetDir: ${targetDir}`,
    `detectedStack: ${detected.stack}`,
    `suggestedBlueprint: ${detected.blueprint}`,
    `selectedBlueprint: ${blueprint.id}`,
    `created: ${mergeResult.created}`,
    `replaced: ${mergeResult.replaced}`,
    `skipped: ${mergeResult.skipped}`,
    `planned: ${mergeResult.planned}`
  ].join("\n");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const targetDir = path.resolve(args._[0] || process.cwd());
  const detected = await detectProject(targetDir);
  const blueprint = await loadBlueprint(args.blueprint || detected.blueprint);
  const filePlan = await buildFilePlan(blueprint, detected);
  const mergeResult = await mergeIntoRepo(targetDir, filePlan, {
    overwrite: args.overwrite || "skip",
    dryRun: args.dryRun
  });

  if (args.json || args.dryRun) {
    console.log(
      JSON.stringify(
        {
          targetDir,
          detected,
          blueprint,
          filePlan,
          mergeResult
        },
        null,
        2
      )
    );
    return;
  }

  console.log(formatSummary(targetDir, detected, blueprint, mergeResult));
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}

module.exports = {
  buildFilePlan,
  loadBlueprint
};
