# Usage With Codex

## What Codex Does Here

Codex is the main working surface before and after installation. After install, the generated system is meant to be used through one orchestrator prompt, standardized workflows, and bounded specialist handoffs.

## Default Start Sequence

1. Open `.codex-team/start.md`.
2. Paste `.codex-team/orchestrator-prompt.md` into Codex.
3. Point Codex at the right installed prompt or workflow file.
4. Let one orchestrator coordinate the work end to end.

## New Repository Flow

1. Run detection or a dry-run bootstrap against the empty repo.
2. Accept `core` unless the product domain is already clear.
3. Install in `safe` mode.
4. Start with `.codex-team/start.md`.
5. Use `.codex-team/orchestrator-prompt.md` and `prompts/ai-team/new-feature-request.md`.

## Existing Repository Flow

1. Detect stack and signals.
2. Confirm the suggested blueprint or override it.
3. Start with `safe` if this is the first install.
4. Move to `smart` once the repo has a tracked generated layer.
5. Route real work through the installed prompts and workflows while respecting existing repo conventions.

## Practical Prompt Pattern

When using Codex after installation, provide:

- the real task
- the expected deliverable
- the relevant repo area
- the installed prompt or workflow file to follow
- whether a final review or release gate is required

## When To Use Subagents

Use subagents when work can be split without blocking the next step:

- frontend and backend slices
- docs or design analysis beside implementation
- review or release-readiness beside build work
- support and feedback synthesis beside product work

Do not use subagents for tiny tasks, single blocking questions, or overlapping ownership.

## Recommended Operating Sequence

Use `project-shepherd` for routing, `product-manager` for scope, the relevant implementation specialist for execution, and `code-reviewer` before finalizing. Use the manifest and install report when you need to see what the bootstrapper owns.
