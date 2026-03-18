# Order Management Design

## Goal

Design a practical order flow for a modern commerce system.

## Inputs

- order states
- fulfillment rules
- payment assumptions
- cancellation and refund rules
- admin needs
- customer-facing needs

## Expected Output

- state model
- API and data boundaries
- UX implications
- edge cases
- risks and open questions

## Coordination

- `product-manager` defines business rules
- `backend-architect` owns state and persistence
- `frontend-developer` maps user-facing flows
- `code-reviewer` checks for unsafe assumptions
