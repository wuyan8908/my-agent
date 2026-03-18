# Feature Delivery Workflow

## Trigger

Use when a feature request needs design, implementation, and review.
Start from `{{orchestratorPromptPath}}` and the installed feature request prompt.

Current blueprint emphasis: `{{workflowEmphasis}}`.
Use subagents only for bounded slices that can be merged back into one consolidated result.

## Primary Agents

- `product-manager`
- `software-architect`
- `frontend-developer` or `backend-architect`
- `code-reviewer`

## Steps

1. Read the request and extract the outcome, constraints, and acceptance criteria.
2. Confirm the primary owner and any secondary specialists.
3. Split only if a slice is independent, bounded, and easy to reconcile.
4. Execute the plan in the owning agent's layer.
5. Review the result against the docs, prompts, and handoff rules.
6. Return one final consolidated answer with files changed, validation, and remaining risk.

## Exit Criteria

- feature works end to end
- acceptance criteria are met
- risks are documented
- handoff is clear
- the final answer is one orchestrated result, not disconnected specialist notes
