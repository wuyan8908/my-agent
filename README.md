# Codex Team Bootstrapper

Codex Team Bootstrapper is a Codex-first bootstrap tool for installing a practical AI team layer into a new or existing repository. It generates a compact operating surface of agents, docs, prompts, workflows, and `.codex-team/` onboarding files so a user can move from install to real execution with minimal confusion.

This repository is not an app, not a plugin framework, and not a giant prompt catalog. It is a lightweight installer plus workflow engine for day-1 Codex usage.

## Quick Start

Detect a repo:

```bash
npm run detect -- /path/to/repo
```

Preview an install:

```bash
npm run bootstrap -- /path/to/repo --dry-run
```

Install into an existing repo:

```bash
npm run bootstrap -- /path/to/repo --mode safe
```

Print the installed start experience:

```bash
npm run codex:start -- /path/to/repo
```

## What Gets Generated

The generated layer stays intentionally small:

- `agents/`
- `docs/ai-team/`
- `prompts/ai-team/`
- `workflows/ai-team/`
- `.codex-team/start.md`
- `.codex-team/orchestrator-prompt.md`
- `.codex-team/quick-reference.md`
- `.codex-team/manifest.json`
- `.codex-team/install-report.json`

The first four paths are the working surface. The `.codex-team/` files are the onboarding and trust layer.

## What Happens After Installation

After installation, the first file to open is `.codex-team/start.md`.

That file tells the user:

- what was installed
- which blueprint is active
- which agents are available
- what prompt to paste into Codex first
- when to use subagents
- which workflow to use for feature work, bugfixes, or review

The intended day-1 path is:

1. open `.codex-team/start.md`
2. paste `.codex-team/orchestrator-prompt.md` into Codex
3. point Codex at the right installed prompt or workflow
4. let one orchestrator coordinate the work and consolidate the result

## codex:start

The repo includes a lightweight helper:

```bash
npm run codex:start -- /path/to/installed-repo
```

It prints the installed start guide and the recommended orchestrator prompt so users can begin without hunting for the right file.

## Install Modes

`safe` is the default.

- `safe`: create missing generated files only
- `smart`: create missing files and update files that are already proven tool-owned
- `replace`: regenerate the tracked generated layer and prune stale tool-owned files from earlier installs

The tool does not attempt semantic merges. If ownership is unclear, it records manual review instead of taking control of the file.

## How Detection Works

`scripts/detect-project.js` looks for practical signals:

- empty repo -> `core`
- Next.js signals -> usually `saas`
- Node API signals -> usually `internal-tools`
- commerce signals -> `ecommerce`
- uncertain repo -> fallback to `core`

Detection returns project name, repo mode, stack guess, blueprint suggestion, signals, and package manager.

## How Merge Safety Works

A file is considered tool-owned when at least one of these is true:

- it appears in `.codex-team/manifest.json`
- it appears in `.codex-team/install-report.json`
- it carries the bootstrapper’s generated markdown header

Behavior by mode:

- `safe` skips existing managed files
- `smart` updates only proven tool-owned files
- `replace` updates tool-owned files and can remove stale tool-owned files from the generated layer
- any untracked file already occupying a managed path is left for manual review

This keeps brownfield installs predictable.

## Start Using The Installed Team

The installed system is meant to be worked through one orchestrator prompt plus standardized workflows.

Recommended start prompt:

```text
Act as the main orchestrator for this repo. Inspect the installed AI team
files, choose the right workflow, use subagents only where bounded parallel
work helps, execute the task end to end, and consolidate the result into one
coherent final output.
```

### Feature Workflow

1. start from `.codex-team/orchestrator-prompt.md`
2. point Codex at `prompts/ai-team/new-feature-request.md`
3. follow `workflows/ai-team/feature-delivery.md`
4. finish with `agents/code-reviewer.md`

### Bugfix Workflow

1. start from `.codex-team/orchestrator-prompt.md`
2. point Codex at `prompts/ai-team/bugfix-request.md`
3. follow `workflows/ai-team/bugfix-flow.md`
4. finish with `agents/code-reviewer.md`

### Review And Release Readiness

Use `agents/code-reviewer.md` and `workflows/ai-team/release-readiness.md` when the change needs a final gate before shipping.

## How To Ask For Subagents

Ask for subagents when work can be split cleanly:

- separate frontend and backend slices
- docs or design analysis beside implementation
- review or release-readiness beside build work
- support and feedback synthesis beside product work

Do not ask for subagents when the task is tiny, blocked on one answer, or likely to create overlapping ownership.

Keep one orchestrator responsible for the final output.

## Template Variables

Templates are rendered with a small fixed placeholder system using `{{variableName}}`.

Supported variables include:

- `projectName`
- `blueprintName`
- `detectedStack`
- `repoMode`
- `packageManager`
- `workflowEmphasis`
- `businessFocus`
- `generatedAt`
- `installMode`
- `selectedAgents`
- `availablePrompts`
- `availableWorkflows`
- `startPath`
- `orchestratorPromptPath`
- `quickReferencePath`

## Blueprint Policies

Blueprints define:

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

## New Repo Vs Existing Repo

For a new repo:

- detection returns `greenfield`
- `core` is usually selected
- the tool installs the baseline operating layer
- `.codex-team/start.md` is the immediate entrypoint

For an existing repo:

- detection returns `brownfield`
- blueprint choice follows stack and domain signals
- `safe` is the right first install
- `smart` becomes useful once the generated layer is already tracked

## Example Commands

```bash
npm run detect -- /path/to/repo
npm run detect:json -- /path/to/repo
npm run bootstrap -- /path/to/repo --dry-run
npm run bootstrap -- /path/to/repo --blueprint commerce-team --mode smart
npm run bootstrap -- /path/to/repo --blueprint internal-tools --mode replace
npm run codex:start -- /path/to/repo
```

## Output Examples

The repository includes day-1 examples under [output-examples](/Users/zhanleili/Desktop/work/my-agent/output-examples):

- [empty-repo](/Users/zhanleili/Desktop/work/my-agent/output-examples/empty-repo)
- [existing-nextjs-project](/Users/zhanleili/Desktop/work/my-agent/output-examples/existing-nextjs-project)
- [existing-node-api](/Users/zhanleili/Desktop/work/my-agent/output-examples/existing-node-api)

Each example now includes before/after notes, install metadata, and generated start-layer files so the first-use experience is visible.

## Why Not Just Fork agency-agents?

The reference repo [agency-agents](https://github.com/msitarzewski/agency-agents) influenced this project in tone and role clarity, but the product is deliberately different:

- this repo installs a compact team layer into arbitrary repos
- it is optimized for repo-aware generation and execution
- it focuses on post-install usability, trust, and workflow guidance
- it keeps the default footprint small instead of shipping a massive roster

## Roadmap

- tighten brownfield safety from real installs
- improve detection confidence
- refine the post-install workflow engine without bloating the product

See [docs/architecture.md](/Users/zhanleili/Desktop/work/my-agent/docs/architecture.md), [docs/usage-with-codex.md](/Users/zhanleili/Desktop/work/my-agent/docs/usage-with-codex.md), and [docs/customization.md](/Users/zhanleili/Desktop/work/my-agent/docs/customization.md) for more detail.
