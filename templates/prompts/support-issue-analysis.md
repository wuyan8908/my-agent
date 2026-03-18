# Support Issue Analysis

## Goal

Turn a support issue into a useful product signal.

Start from `{{orchestratorPromptPath}}` and route the issue through the support workflow, not a freeform analysis.

## Inputs

- customer report
- frequency
- severity
- affected workflow
- known workaround
- related tickets or logs

## Expected Output

- problem summary
- likely root cause
- immediate support response
- product impact
- recommendation for engineering

## Coordination

- `support-responder` drafts the customer-facing reply
- `feedback-synthesizer` classifies the pattern
- `project-shepherd` routes the follow-up
- keep the output as one triaged handoff with a clear next owner
