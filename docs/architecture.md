# Architecture

## System Shape

- `blueprints/` define install policy, included assets, business priorities, aliases, and recommended modes.
- `templates/` hold reusable markdown source files that are rendered with a small fixed variable map.
- `scripts/` handle detection, file planning, merge safety, and install metadata.
- `output-examples/` act as validation artifacts for different repo contexts.

## Bootstrap Flow

1. Detect repo mode, stack, signals, and project name.
2. Suggest a blueprint and resolve any alias the user selected.
3. Build a fixed render context.
4. Render the selected templates into a file plan.
5. Apply the plan using `safe`, `smart`, or `replace`.
6. Write `.codex-team/manifest.json` and `.codex-team/install-report.json`.

## Install Modes

- `safe`: create missing generated files only
- `smart`: update proven tool-owned files and create missing ones
- `replace`: regenerate the tracked generated layer and remove stale tool-owned files from earlier installs

No mode performs semantic merge.

## Ownership Rules

A file is treated as tool-owned when it is present in the manifest, present in the latest install report, or has the generated markdown header. If ownership is unclear and the file already occupies a generated path, the tool records manual review instead of taking control of it.

This is the brownfield safety contract:

- missing file -> create
- tracked tool-owned file -> update only in `smart` or `replace`
- untracked file in generated path -> manual review
- unrelated user file outside generated paths -> ignore

## Template Rendering

Rendering is intentionally simple:

- syntax: `{{variableName}}`
- one pass only
- plain-text replacement only
- missing values render as empty strings

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

## Generated Artifacts

Generated content lives in:

- `agents/`
- `docs/ai-team/`
- `prompts/ai-team/`
- `workflows/ai-team/`

Generated metadata lives in:

- `.codex-team/manifest.json`
- `.codex-team/install-report.json`

The manifest is the durable ownership record. The install report is the last-run execution record.

## Non-Goals

- no runtime orchestration engine
- no plugin system
- no database
- no hidden merge magic
