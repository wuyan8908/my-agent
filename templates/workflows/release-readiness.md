# Release Readiness Workflow

## Trigger

Use before shipping meaningful changes.

Install note: this team layer was installed in `{{installMode}}` mode for a `{{repoMode}}` repo.
Start from `{{orchestratorPromptPath}}` and the latest implementation result.
Use `code-reviewer` and `devops-automator` as the primary gates.

## Primary Agents

- `devops-automator`
- `code-reviewer`
- `project-shepherd`

## Steps

1. Confirm the change set is complete and matches the request.
2. Check tests, build, deployment, and rollback assumptions.
3. Verify naming, docs, prompts, and workflow references still align.
4. Consolidate specialist notes into one release recommendation.
5. Decide whether to ship, hold, or request a manual review.

## Exit Criteria

- no known blockers remain
- validation is explicit
- release risk is acceptable
- the recommendation names any manual review boundary
