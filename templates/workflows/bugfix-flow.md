# Bugfix Flow

## Trigger

Use when behavior is broken, unstable, or inconsistent.
Start from `{{orchestratorPromptPath}}` and the installed bugfix prompt.

## Primary Agents

- `project-shepherd`
- `software-architect`
- `frontend-developer` or `backend-architect`
- `code-reviewer`

## Steps

1. Reproduce the issue.
2. Identify the smallest failing boundary.
3. Decide whether investigation, fix, and review can be split without blocking each other.
4. Fix the root cause, not the symptom.
5. Add the narrowest useful regression check.
6. Verify adjacent behavior did not regress.

## Exit Criteria

- root cause is understood
- fix is minimal and safe
- validation is documented
- manual review is called out if ownership or behavior remains unclear
