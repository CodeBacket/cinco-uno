# Cinco UNO app folder

This folder contains the implementation scaffold for the phased Cinco UNO plans.

## Current status

Phase 01 completed:

- Module/file layout is seeded (`index.html`, `styles.css`, `js/*`).
- Rules baseline is documented in `RULES.md`.
- Shared state contract is defined in `js/state.js`:
  - AI count constants (`MIN_AI_OPPONENTS`, `MAX_AI_OPPONENTS`)
  - State machine phases (`menu`, `playing`, `roundOver`, `gameOver`)
  - Allowed phase transitions
  - Event vocabulary constants

Phase 02+ will implement gameplay UI, engine transitions, and AI behavior.

## Running locally

Open `uno-game/index.html` in a browser for the scaffold view.
