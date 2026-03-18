# Release Readiness Workflow

## Trigger

Use before shipping meaningful changes.

Install note: this team layer was installed in `{{installMode}}` mode for a `{{repoMode}}` repo.

## Primary Agents

- `devops-automator`
- `code-reviewer`
- `project-shepherd`

## Steps

1. Confirm scope is complete.
2. Check tests, build, and deployment assumptions.
3. Review release notes and rollback risk.
4. Verify cross-file naming and doc alignment.
5. Consolidate any specialist review notes.
6. Decide whether to ship or hold.

## Exit Criteria

- no known blockers remain
- validation is explicit
- release risk is acceptable
