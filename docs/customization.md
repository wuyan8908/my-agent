# Customization

## Customize First

- blueprint selection
- default agent roster by blueprint
- repo-specific business vocabulary
- custom prompts for repeated work

## Avoid Customizing Early

- shared file naming
- install paths
- handoff format
- the core structure of agent templates

## Extension Model

The intended extension path is small:

1. adjust blueprint manifests
2. add or remove templates
3. rerun bootstrap

That keeps generated output consistent while still allowing project-specific changes.

## Naming Rules

- use `blueprint` for repo-type presets
- keep agent filenames in kebab-case
- keep generated docs under `docs/ai-team`
- keep shared workflow names stable across blueprints

## Safe Edits

You can safely edit product wording, business concerns, included files, and blueprint instructions without changing the installation contract.
