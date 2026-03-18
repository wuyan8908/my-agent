# Quick Reference

## Day 1 Flow

1. Open `{{startPath}}`.
2. Paste `{{orchestratorPromptPath}}` into Codex with the real task.
3. Point Codex at the right installed prompt or workflow file.
4. Let one orchestrator consolidate the result.

## Common Workflows

- feature work: `prompts/ai-team/new-feature-request.md` -> `workflows/ai-team/feature-delivery.md`
- bugfixes: `prompts/ai-team/bugfix-request.md` -> `workflows/ai-team/bugfix-flow.md`
- release or review: `agents/code-reviewer.md` -> `workflows/ai-team/release-readiness.md`

## Agents At A Glance

Installed agents: `{{selectedAgents}}`

## Subagent Rules

- use subagents for parallelizable, bounded work
- keep one orchestrator responsible for final output
- do not split work when the task is tiny or blocked on one answer
- avoid overlapping ownership between subagents

## Keep Codex Focused

- give one clear task
- name the expected deliverable
- point to the relevant prompt or workflow file
- ask for a final consistency pass
