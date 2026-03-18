# Existing Next.js Project Example

This example shows a brownfield install into a customer-facing Next.js application. The suggested blueprint is `saas`, and the example uses `smart` mode to show an additive install that can still update tracked generated files later.

The day-1 entrypoint is `.codex-team/start.md`, which routes the user into the orchestrator prompt and the installed feature or bugfix workflow.

Notable differences from an empty repo install:

- stronger emphasis on existing conventions
- frontend-heavy default roster
- support and feedback loops included by default
- generated assets are additive and non-destructive by default
