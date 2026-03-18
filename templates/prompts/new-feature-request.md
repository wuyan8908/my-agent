# New Feature Request

## Context

We are working in a real repository with existing conventions.

Repository: `{{projectName}}`
Detected stack: `{{detectedStack}}`
Repo mode: `{{repoMode}}`
Default orchestrator prompt: `{{orchestratorPromptPath}}`

## Request

Add: `<feature>`

## Inputs

- repo type: `{{repoMode}}`
- detected stack: `{{detectedStack}}`
- blueprint: `{{blueprintName}}`
- workflow emphasis: `{{workflowEmphasis}}`
- constraints: `<performance, UX, security, compatibility>`
- patterns to preserve: `<list>`

## Expected Output

- short implementation plan
- files to change
- implementation summary
- validation notes
- follow-up recommendations

## Coordination

- start from `{{orchestratorPromptPath}}`
- `product-manager` clarifies scope
- `software-architect` checks boundaries
- `frontend-developer` or `backend-architect` implements
- `code-reviewer` verifies the result
- use subagents only for bounded work that can be consolidated cleanly
- keep one orchestrator responsible for final consolidation
