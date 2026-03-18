# Usage With Codex

## What Codex Does Here

Codex reads the target repository, helps choose the right blueprint, installs the team package, and then uses the generated files as the working protocol for future tasks.

## New Repository Flow

1. Run the bootstrapper against an empty repo.
2. Accept the default `core` blueprint or choose a domain blueprint.
3. Start with `agents/project-shepherd.md`.
4. Use the generated prompt and workflow files to define the first task.

## Existing Repository Flow

1. Detect stack and repo signals.
2. Choose the suggested blueprint or override it.
3. Install non-destructively.
4. Use the generated team files alongside the existing codebase conventions.

## Practical Prompt Pattern

When using Codex after installation, provide:

- the business goal
- the relevant repo context
- the owning agent
- the expected deliverable
- whether a handoff or review is required

## Recommended Starting Sequence

Start with `project-shepherd`, clarify through `product-manager`, hand design work to `software-architect` or `backend-architect`, implement through the owning builder, and finish with `code-reviewer`.
