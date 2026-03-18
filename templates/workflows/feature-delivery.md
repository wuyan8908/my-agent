# Feature Delivery Workflow

## Trigger

Use when a feature request needs design, implementation, and review.

Current blueprint emphasis: `{{workflowEmphasis}}`.
Start from `{{orchestratorPromptPath}}` and the installed feature request prompt.

## Primary Agents

- `product-manager`
- `software-architect`
- `frontend-developer` or `backend-architect`
- `code-reviewer`

## Steps

1. Clarify the outcome and acceptance criteria.
2. Identify the owning agent and constraints.
3. Decide whether any bounded work can be parallelized with subagents.
4. Build the smallest usable version.
5. Review for correctness and consistency.
6. Consolidate handoffs into one final result.

## Exit Criteria

- feature works end to end
- acceptance criteria are met
- risks are documented
- handoff is clear
- the final answer reflects one orchestrated result, not disconnected specialist notes
