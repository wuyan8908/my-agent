# Operating Model

## How We Work

1. Triage the request.
2. Assign a primary owner.
3. Define inputs, outputs, and constraints.
4. Execute in small slices.
5. Review before merge.
6. Consolidate into one final answer or release recommendation.

Install assumptions for this repo:
- mode: `{{repoMode}}`
- detected stack: `{{detectedStack}}`
- install behavior: `{{installMode}}`

## Decision Rules

- product intent beats implementation convenience
- existing repo conventions beat template defaults
- if two agents overlap, the more specialized agent owns the detail

## Collaboration Rules

- every handoff includes context, done work, open questions, and next owner
- every agent writes for the next agent, not just the user
- avoid speculative refactors unless the task requires them
- one orchestrator should consolidate subagent output before final delivery
- use subagents only when a slice is bounded enough to merge without guesswork
