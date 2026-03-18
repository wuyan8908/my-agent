# Customization

## Customize First

- blueprint manifests
- included agents and workflow assets
- business priorities and context notes
- prompt wording for recurring repo work

## Template Variables

Templates support a small fixed render context:

- `projectName`
- `projectType`
- `stack`
- `repoMode`
- `blueprint`
- `packageManager`
- `workflowEmphasis`
- `businessFocus`
- `generatedAt`
- `installMode`
- `startPath`
- `orchestratorPromptPath`
- `fastModePromptPath`
- `quickReferencePath`

Compatibility aliases also work:

- `blueprintName` -> `blueprint`
- `detectedStack` -> `stack`
- `businessConcerns` -> `businessFocus`

Use variables when they improve trust or repo-specific usefulness. Avoid threading them through every section or changing stable headings.

## Safe Extension Path

1. edit blueprint manifests
2. edit or add templates
3. rerun bootstrap

That path keeps the generated layer compact and predictable.

## Avoid Early Drift

- do not rename the generated roots
- do not add a second ownership mechanism
- do not vary section order between similar templates
- do not over-template every sentence

## What Is Safe To Change

- blueprint aliases and recommended modes
- business priorities
- workflow emphasis
- custom prompts and docs
- optional agent coverage
