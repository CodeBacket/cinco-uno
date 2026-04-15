# Cinco UNO mini-app (phase 01 scaffold)

Ticket: #31  
Plan: `docs/01-product-rules-and-architecture.plan.md`

This folder is the foundational scaffold for the Cinco UNO implementation.
It intentionally ships module boundaries and shared contracts first, while UI,
engine behavior, and AI logic are delivered in later plans.

## Files in this phase

- `index.html`: basic app shell placeholder.
- `styles.css`: minimal shell styling.
- `js/state.js`: shared contract constants:
  - AI opponent bounds (`MIN_AI_OPPONENTS`, `MAX_AI_OPPONENTS`)
  - phase model (`GAME_PHASES`, `canTransitionPhase`)
  - canonical event names (`EVENT_TYPES`)
- `js/main.js`, `js/engine.js`, `js/ai.js`, `js/ui.js`: module boundary stubs.
- `RULES.md`: written rules baseline for implementers.

## Run locally

Open `uno-game/index.html` directly in a browser, or serve from the repository
root with any static server. Example:

```bash
npx serve .
```

Then open the served `uno-game/index.html` route.
