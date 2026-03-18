# Architecture

## System Shape

- `blueprints/` define which assets to install by project type.
- `templates/` hold reusable source files for agents, docs, prompts, and workflows.
- `scripts/` detect the target repo, build a file plan, and merge generated output safely.
- `output-examples/` show how generated output differs across repo contexts.

## Runtime Model

This repository does not run an application. It produces a file-based operating layer for another repository.

## Bootstrap Flow

1. Inspect the target repo.
2. Suggest or confirm a blueprint.
3. Select template files from that blueprint manifest.
4. Generate a target file plan.
5. Merge the generated files with explicit overwrite behavior.

## Design Rules

- Prefer files over frameworks.
- Prefer manifest-driven behavior over script hardcoding.
- Keep output compact enough to live in a real repo.
- Preserve safe defaults when the target already has content.

## Generated Output Model

The installed output always centers on the same contract:

- `agents/` for role definitions
- `docs/ai-team/` for operating rules
- `prompts/ai-team/` for task intake
- `workflows/ai-team/` for execution playbooks
- `.codex-team/manifest.json` for traceability

## Non-Goals

- no runtime agent scheduler
- no plugin marketplace
- no opaque generation framework
