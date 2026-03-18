# Existing Node API Example

This example shows a brownfield install into a Node API repository. The suggested blueprint is `internal-tools`, and the example uses `safe` mode to emphasize first-install caution in an existing backend codebase.

The day-1 entrypoint is `.codex-team/start.md`, which routes the user into the orchestrator prompt and the installed backend workflows.

For the exact first prompt, see `.codex-team/example-first-prompt.md`.
For a small bounded task, see `.codex-team/fast-mode-prompt.md`.

Notable differences from the Next.js example:

- backend and operational roles dominate the default roster
- release and bugfix workflows matter more than growth content
- the generated package stays compact because the repo is not UI-first
