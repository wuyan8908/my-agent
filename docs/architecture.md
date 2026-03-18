# Architecture

## System Shape

- `blueprints/` define install policy, included assets, business priorities, aliases, and recommended modes
- `templates/` hold reusable markdown source files, including the generated start layer
- `scripts/` handle detection, rendering, merge safety, install metadata, and the local `codex:start` helper
- `output-examples/` show install outcomes and day-1 usage

## Bootstrap Flow

1. Detect repo mode, stack, signals, and project name.
2. Suggest a blueprint and resolve any alias the user selected.
3. Build a fixed render context.
4. Render templates into a file plan.
5. Apply the plan using `safe`, `smart`, or `replace`.
6. Write the generated start layer plus `.codex-team/manifest.json` and `.codex-team/install-report.json`.

## Install Modes

- `safe`: create missing managed files only
- `smart`: update proven tool-owned files and create missing ones
- `replace`: regenerate the tracked managed layer and remove stale tool-owned files from earlier installs

No mode performs semantic merge.

## Ownership Rules

A file is treated as tool-owned when it is present in the manifest, present in the latest install report, or has the generated markdown header. If ownership is unclear and the file already occupies a managed path, the tool records manual review instead of taking control of it.

Brownfield contract:

- missing file -> create
- tracked tool-owned file -> update only in `smart` or `replace`
- untracked file in a managed path -> manual review
- unrelated user file outside managed paths -> ignore

## Template Rendering

Rendering is intentionally simple:

- syntax: `{{variableName}}`
- one pass only
- plain-text replacement only
- missing values render as empty strings

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

## Generated Artifacts

Generated content lives in:

- `agents/`
- `docs/ai-team/`
- `prompts/ai-team/`
- `workflows/ai-team/`

Generated onboarding and metadata live in:

- `.codex-team/start.md`
- `.codex-team/orchestrator-prompt.md`
- `.codex-team/quick-reference.md`
- `.codex-team/manifest.json`
- `.codex-team/install-report.json`

The first three files are the start layer for humans and Codex. The manifest is the durable ownership record. The install report is the last-run execution record.

## Non-Goals

- no runtime orchestration engine
- no plugin system
- no database
- no hidden merge magic
