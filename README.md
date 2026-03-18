# Codex Team Bootstrapper

Codex Team Bootstrapper is a Codex-first bootstrap tool for installing a practical AI team layer into a new or existing repository. It generates a compact operating surface of agents, team docs, prompts, workflows, and install metadata so Codex can work with clearer ownership, safer handoffs, and more predictable repo upgrades.

This repository is not an app, not a plugin framework, and not a giant prompt catalog. It is a lightweight installer that turns reusable templates and blueprint policies into repo-specific generated files.

## Quick Start

Detect a repo:

```bash
npm run detect -- /path/to/repo
```

Preview a greenfield install:

```bash
npm run bootstrap -- /path/to/empty-repo --dry-run
```

Install into an existing Next.js repo with explicit mode:

```bash
npm run bootstrap -- /path/to/existing-nextjs-repo --blueprint saas --mode smart
```

Install into an existing Node API repo conservatively:

```bash
npm run bootstrap -- /path/to/existing-node-api --mode safe
```

## What Gets Generated

The generated layer stays intentionally small:

- `agents/`
- `docs/ai-team/`
- `prompts/ai-team/`
- `workflows/ai-team/`
- `.codex-team/manifest.json`
- `.codex-team/install-report.json`

The first four paths are the working surface for humans and Codex. The `.codex-team/` files are the trust layer used for ownership tracking, future upgrades, and install reporting.

## Install Modes

`safe` is the default.

- `safe`: create missing generated files only. Existing files are never overwritten.
- `smart`: create missing files and update files that are already proven tool-owned.
- `replace`: regenerate the tracked team layer, including stale tool-owned files from earlier installs, while still leaving unrelated user files alone.

The tool does not attempt semantic merges. If ownership is unclear, it skips the file and records it for manual review.

## How Detection Works

`scripts/detect-project.js` looks for practical signals, not heavy inference:

- empty repo -> `core`
- Next.js signals such as `next`, `next.config.*`, `app/`, `pages/` -> usually `saas`
- Node API signals such as `express`, `fastify`, `routes/`, `server.*` -> usually `internal-tools`
- commerce signals such as Stripe or Shopify dependencies -> `ecommerce`
- uncertain repo -> fallback to `core`

Detection returns project name, repo mode (`greenfield` or `brownfield`), stack guess, blueprint suggestion, signals, and package manager.

## How Merge Safety Works

This tool distinguishes between missing files, tool-owned files, and files with unclear ownership.

A file is considered tool-owned when at least one of these is true:

- it appears in `.codex-team/manifest.json`
- it appears in `.codex-team/install-report.json`
- it is a generated markdown file with the bootstrapper header comment

Behavior by mode:

- `safe` skips all existing generated-path files, even if tool-owned
- `smart` updates only proven tool-owned files
- `replace` updates tool-owned files and can remove stale tool-owned files from older installs
- any untracked file already occupying a generated path is treated conservatively and left for manual review

This keeps brownfield installs predictable and prevents the tool from claiming ownership of arbitrary repo files.

## Generated Files And Reports

`.codex-team/manifest.json` is the durable ownership record. It stores:

- selected blueprint
- install mode
- render variables
- blueprint priorities
- tracked tool-owned files

`.codex-team/install-report.json` is the latest install outcome. It records:

- target path
- detected stack and signals
- suggested blueprint
- selected blueprint
- install mode
- created, updated, skipped, deleted, and manual-review files
- timestamp and manifest path

Use the install report when you want to see exactly what the last install attempted.

## Template Variables

Templates are rendered with a small fixed placeholder system using `{{variableName}}`. There are no loops, conditionals, or filters in phase 2.

Supported variables:

- `projectName`
- `blueprintName`
- `detectedStack`
- `repoMode`
- `packageManager`
- `workflowEmphasis`
- `businessFocus`
- `generatedAt`
- `installMode`

These variables are used selectively in docs, prompts, workflows, manifest metadata, and a few agent instructions where repo context materially improves usefulness.

## Blueprint Policies

Blueprints do more than list files. Each one now defines:

- default agents
- included docs, prompts, and workflows
- business priorities
- workflow emphasis
- recommended install mode
- aliases and context notes

Examples:

- `core` and alias `core-web-team`
- `ecommerce` and alias `commerce-team`
- `saas` and alias `saas-team`
- `internal-tools` and alias `operations-team`

## New Repo vs Existing Repo

For a new repo:

- detection returns `greenfield`
- `core` is usually selected
- the tool installs the full baseline operating layer
- the next step is usually `project-shepherd` plus `new-feature-request.md`

For an existing repo:

- detection returns `brownfield`
- blueprint choice follows stack and domain signals
- `safe` is the default so existing files are not overwritten
- `smart` becomes useful once the generated layer is already tracked

## Example Commands

```bash
npm run detect -- /path/to/repo
npm run detect:json -- /path/to/repo
npm run bootstrap -- /path/to/repo --dry-run
npm run bootstrap -- /path/to/repo --blueprint commerce-team --mode smart
npm run bootstrap -- /path/to/repo --blueprint internal-tools --mode replace
npm run merge -- /path/to/repo --plan ./file-plan.json --mode safe
```

## How To Use After Installation

Treat the generated files as the team operating layer for Codex:

1. start with `agents/project-shepherd.md`
2. clarify work with `product-manager`
3. use the relevant prompt in `prompts/ai-team/`
4. follow the matching workflow in `workflows/ai-team/`
5. finish with `code-reviewer`

Recommended Codex pattern:

```text
Use Project Shepherd for this repo. Follow the installed handoff rules,
respect the existing codebase conventions, route design through the right
specialist agent, and finish with a Code Reviewer pass.
```

## How To Customize

The safe extension path is:

1. adjust blueprint manifests
2. edit or add templates
3. rerun bootstrap

Avoid renaming the generated roots or changing the ownership model unless you also update the scripts and documentation that depend on them.

## Output Examples

The repository includes validation-oriented examples under [output-examples](/Users/zhanleili/Desktop/work/my-agent/output-examples):

- [empty-repo](/Users/zhanleili/Desktop/work/my-agent/output-examples/empty-repo)
- [existing-nextjs-project](/Users/zhanleili/Desktop/work/my-agent/output-examples/existing-nextjs-project)
- [existing-node-api](/Users/zhanleili/Desktop/work/my-agent/output-examples/existing-node-api)

Each example includes before/after notes plus install metadata so you can see why a blueprint was chosen and what changed.

## Why Not Just Fork agency-agents?

The reference repo [agency-agents](https://github.com/msitarzewski/agency-agents) influenced this project in tone and role clarity, but the product is deliberately different:

- this repo installs a team layer into arbitrary repos
- it is optimized for repo-aware generation, not direct catalog consumption
- it focuses on trust, merge safety, and install reporting
- it keeps the default footprint small instead of shipping a massive roster

## Repository Structure

```text
blueprints/
templates/
scripts/
docs/
output-examples/
README.md
package.json
```

## Roadmap

- tighten brownfield safety from real-world installs
- improve detection signals and blueprint confidence
- expand upgrade guidance without growing the default footprint too much

See [docs/architecture.md](/Users/zhanleili/Desktop/work/my-agent/docs/architecture.md) and [docs/customization.md](/Users/zhanleili/Desktop/work/my-agent/docs/customization.md) for the operational details behind the install flow.
