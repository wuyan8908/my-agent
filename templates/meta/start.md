# Start Here

This AI dev workflow layer is installed for `{{projectName}}` using the `{{blueprintName}}` blueprint.

## What Was Installed

- agents: `agents/`
- team docs: `docs/ai-team/`
- prompts: `prompts/ai-team/`
- workflows: `workflows/ai-team/`
- metadata and onboarding: `.codex-team/`

Available agents: `{{selectedAgents}}`

## What To Do Next

1. Open `{{orchestratorPromptPath}}`.
2. Paste that prompt into Codex with your real task.
3. Let Codex inspect the repo, choose the right workflow, and use subagents where useful.
4. Use `{{quickReferencePath}}` when you need a compact reminder of the installed flows.

## Recommended First Prompt

Use `{{orchestratorPromptPath}}` as the default start for feature work, bugfixes, code review, release readiness, or support-driven product follow-up.

## When To Use Subagents

Use subagents for parallelizable work such as:

- docs or design analysis alongside implementation
- separate frontend and backend slices
- review and release-readiness checks running beside implementation
- support and feedback synthesis while product work continues

Do not use subagents when the next step depends on one immediate blocking answer or when the task is too small to split cleanly.

## Default Workflow

- feature work: start from `prompts/ai-team/new-feature-request.md` and `workflows/ai-team/feature-delivery.md`
- bugfixes: start from `prompts/ai-team/bugfix-request.md` and `workflows/ai-team/bugfix-flow.md`
- review: use `agents/code-reviewer.md` plus `workflows/ai-team/release-readiness.md`

## Useful Paths

- start layer: `{{startPath}}`
- orchestrator prompt: `{{orchestratorPromptPath}}`
- quick reference: `{{quickReferencePath}}`
- installed prompts: `{{availablePrompts}}`
- installed workflows: `{{availableWorkflows}}`
