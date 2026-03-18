# Bugfix Flow

## Trigger

Use when behavior is broken, unstable, or inconsistent.
Start from `{{orchestratorPromptPath}}` and the installed bugfix prompt.
Use subagents only when reproduction, fix, and verification can be separated without losing context.

## Primary Agents

- `project-shepherd`
- `software-architect`
- `frontend-developer` or `backend-architect`
- `code-reviewer`

## Steps

1. Reproduce the issue and capture the smallest failing case.
2. Identify the boundary that actually breaks.
3. Decide whether a subagent can investigate or verify a separate slice.
4. Fix the root cause, not the symptom.
5. Add the narrowest regression check that proves the fix.
6. Verify adjacent behavior and report any unresolved ambiguity.

## Exit Criteria

- root cause is understood
- fix is minimal and safe
- validation is documented
- manual review is called out if ownership or behavior remains unclear
