# Bugfix Request

## Problem

Describe the bug with observed behavior, expected behavior, and repro steps.

## Inputs

- detected stack: `{{detectedStack}}`
- package manager: `{{packageManager}}`
- repo mode: `{{repoMode}}`
- default orchestrator prompt: `{{orchestratorPromptPath}}`
- repro steps
- logs or error message
- affected area
- suspected files
- severity

## Expected Output

- root cause analysis
- minimal fix
- regression check
- risk note if behavior changes

## Coordination

- start from `{{orchestratorPromptPath}}`
- `project-shepherd` confirms scope
- `software-architect` checks whether the bug is local or systemic
- owning implementation agent fixes it
- `code-reviewer` verifies the fix is narrow and safe
- use subagents only if investigation, fix, and review can be split cleanly
