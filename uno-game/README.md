# uno-game scaffold (ticket #31, phase 01)

This directory is the implementation scaffold created from:

- Ticket: `#31 Product Rules and Architecture Plan`
- Plan: `docs/01-product-rules-and-architecture.plan.md`

## Current status

- Directory and module boundaries are established.
- Shared state contract is implemented in `js/state.js`.
- Rules baseline is mirrored in `RULES.md`.
- Engine, AI, UI, and bootstrap modules exist as placeholders for follow-up plans.

## Files

- `index.html` — static shell for menu and game table regions.
- `styles.css` — baseline layout styling.
- `js/state.js` — game phases, transition helpers, AI bounds, event vocabulary.
- `js/engine.js` — placeholder rule engine surface.
- `js/ai.js` — placeholder AI decision surface.
- `js/ui.js` — placeholder renderer surface.
- `js/main.js` — placeholder bootstrap integration.

## Next phases

- Plan 02: implement semantic UI and accessible layout behavior.
- Plan 03: implement full DOM-free rule engine.
- Plan 04: implement multi-opponent and AI behavior.
- Plan 05: run end-to-end QA and polish.
