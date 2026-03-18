# Bugfix Flow

## Trigger

Use when behavior is broken, unstable, or inconsistent.

## Primary Agents

- `project-shepherd`
- `software-architect`
- `frontend-developer` or `backend-architect`
- `code-reviewer`

## Steps

1. Reproduce the issue.
2. Identify the smallest failing boundary.
3. Fix the root cause, not the symptom.
4. Add the narrowest useful regression check.
5. Verify adjacent behavior did not regress.

## Exit Criteria

- root cause is understood
- fix is minimal and safe
- validation is documented
