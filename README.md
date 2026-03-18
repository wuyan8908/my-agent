# Codex Team Bootstrapper

Codex Team Bootstrapper is a Codex-first installer for a practical AI team operating layer. It generates a compact set of agents, team docs, prompts, workflows, and blueprint guidance that can be dropped into an empty repository or merged safely into an existing one.

It is designed for software teams shipping ecommerce products, SaaS products, admin portals, B2B ordering systems, and other modern web products. Instead of copying prompt files by hand, you install a reusable team package with clear ownership, handoffs, and workflow defaults.

## Concept

This repository is a generator, not an application and not a prompt dump. The source of truth lives here in:

- `templates/` for reusable agent, doc, prompt, and workflow templates
- `blueprints/` for domain-specific installation choices
- `scripts/` for detection, generation, and safe merge behavior
- `output-examples/` for sample generated installs
- `docs/` for product and architecture guidance

The generated output is intentionally small:

- `agents/`
- `docs/ai-team/`
- `prompts/ai-team/`
- `workflows/ai-team/`
- `.codex-team/manifest.json`

## Why This Exists

Most agent repos stop at “here are some prompt files.” Real teams need more than that:

- a compact roster with defined ownership
- shared operating docs
- repeatable prompt inputs
- standard handoff rules
- safe installation into brownfield repos

This repository turns those needs into a file-based operating layer that Codex can read, install, extend, and keep consistent.

## Why Not Just Fork agency-agents?

The reference repo was useful design inspiration because it shows the value of specialized, deliverable-focused agents with practical tone and clear role boundaries. This project intentionally differs in a few ways:

- It is a bootstrapper, not a large agent catalog.
- It optimizes for installation into arbitrary repositories, not direct consumption as a role library.
- It is Codex-first and built around repo-aware workflows, handoffs, and merge safety.
- It uses blueprints to keep the generated team small and relevant.

The goal is to keep the strengths of specialization and practical tone without copying the reference structure or shipping a massive roster by default.

## Use Cases

- Install a default AI team into a new product repo.
- Add a lightweight AI operating layer to an existing Next.js app.
- Add structured support, review, and release workflows to an existing Node API.
- Standardize how product, engineering, support, sales, and growth hand work to each other.

## Folder Structure

```text
blueprints/
  core/
  ecommerce/
  saas/
  internal-tools/
templates/
  agents/
  docs/
  prompts/
  workflows/
scripts/
  bootstrap.js
  detect-project.js
  merge-into-repo.js
output-examples/
  empty-repo/
  existing-nextjs-project/
  existing-node-api/
docs/
  product-vision.md
  architecture.md
  usage-with-codex.md
  customization.md
  roadmap.md
```

## How Bootstrap Works

1. `detect-project.js` inspects the target repo and classifies it as `empty`, `nextjs`, `node-api`, or `unknown`.
2. The detector suggests a blueprint such as `core`, `saas`, `internal-tools`, or `ecommerce`.
3. `bootstrap.js` loads the chosen blueprint, selects the right templates, and builds a file plan.
4. `merge-into-repo.js` writes the generated files with explicit overwrite behavior and clear logging.

The scripts use blueprint manifests and template files directly. There is no hidden runtime or separate orchestration engine.

## Example Commands

```bash
npm run detect -- /path/to/repo
npm run bootstrap -- /path/to/repo
npm run bootstrap -- /path/to/repo --blueprint ecommerce
npm run bootstrap -- /path/to/repo --dry-run
npm run bootstrap -- /path/to/repo --overwrite replace
```

## How This Works In A New Repo

For an empty repository, the bootstrapper installs the full core team package and baseline operating docs. The result is a ready-to-use working layer for defining features, routing work, reviewing changes, and preparing releases.

Recommended flow after installation:

1. Start with `agents/project-shepherd.md`.
2. Use `prompts/ai-team/new-feature-request.md` to define the first task.
3. Follow `workflows/ai-team/feature-delivery.md`.

## How This Works In An Existing Repo

For a brownfield repository, detection looks for obvious stack and domain signals before suggesting a blueprint. The bootstrapper then installs only the selected team assets and avoids destructive overwrites by default.

Examples:

- existing Next.js app -> usually `saas`
- existing Node API -> usually `internal-tools`
- commerce signals such as Stripe or Shopify -> often `ecommerce`
- uncertain repo -> fallback to `core`

## How To Use After Installation

Treat the generated assets as your default team operating layer:

- `project-shepherd` routes and sequences work
- `product-manager` clarifies the request
- `software-architect` or `backend-architect` sets boundaries
- `frontend-developer` or `backend-architect` implements
- `code-reviewer` checks correctness and drift
- `devops-automator` handles release and delivery concerns

The docs define shared rules. The prompts standardize task intake. The workflows make handoffs concrete instead of implicit.

## Usage With Codex

Use Codex as the working surface for the installed team package:

- ask Codex to detect the repo and confirm the blueprint
- route work through the generated prompts and workflows
- reference specific agent files when you want clearer ownership
- use the release and feedback workflows before closing work

Example:

```text
Use Project Shepherd with the SaaS blueprint to route this feature request.
Preserve existing repo conventions, use the generated handoff rules,
and finish with a Code Reviewer pass before finalizing.
```

## Recommended Workflow

1. Intake through `project-shepherd`.
2. Clarify through `product-manager`.
3. Design through `software-architect` or `backend-architect`.
4. Implement through the owning engineering agent.
5. Validate through `code-reviewer`.
6. Use `release-readiness.md` before shipping meaningful changes.
7. Feed support and sales signals back through the feedback workflows.

## Reference Influence

The reference repository influenced this project in three narrow ways:

- specialized agent roles with clear ownership
- practical, execution-oriented tone
- deliverable-focused templates instead of vague personas

This project intentionally improves on that model by keeping the default install smaller, making the output repo-aware, and centering the workflow around Codex and repeatable installation.

## Roadmap

- Improve project detection and blueprint suggestions.
- Add upgrade guidance for teams that outgrow the default roster.
- Add additional domain blueprints only when real usage justifies them.
- Tighten brownfield merge behavior from real installs.

See [docs/roadmap.md](/Users/zhanleili/Desktop/work/my-agent/docs/roadmap.md) for more detail.
