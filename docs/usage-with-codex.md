# Usage With Codex

## What Codex Does Here

Codex is the main working surface before and after installation. It can inspect the target repo, confirm the blueprint and install mode, apply the generated team layer, and then use the installed assets as the operating protocol for follow-on work.

## New Repository Flow

1. Run detection or a dry-run bootstrap against the empty repo.
2. Accept `core` unless the product domain is already clear.
3. Install in `safe` mode.
4. Start with `agents/project-shepherd.md`.
5. Use `prompts/ai-team/new-feature-request.md` to define the first task.

## Existing Repository Flow

1. Detect stack and signals.
2. Confirm the suggested blueprint or override it.
3. Start with `safe` if this is the first install.
4. Move to `smart` once the repo has a tracked generated layer.
5. Route real work through the generated prompts and workflows while respecting the repo’s existing conventions.

## Practical Prompt Pattern

When using Codex after installation, provide:

- the product or engineering goal
- the owning generated agent
- the relevant repo area
- the expected deliverable
- whether review or handoff is required

## Recommended Operating Sequence

Use `project-shepherd` for routing, `product-manager` for scope, the relevant implementation specialist for execution, and `code-reviewer` before finalizing. Use the install report and manifest when you need to understand what the bootstrapper already owns.
