# Cinco UNO app scaffold

This directory contains the phased implementation of the Cinco UNO browser game.

## Current status

Phase 01 (product rules and architecture scaffold) is implemented:

- Baseline static shell (`index.html`, `styles.css`)
- Layered JS boundary stubs in `js/`
- Shared game-state contract in `js/state.js`
- Rules reference in `RULES.md`

## Module boundaries

- `js/state.js`: constants and shared game-state contract.
- `js/engine.js`: pure game rule transitions (implemented in phase 03).
- `js/ai.js`: computer move selection helpers (implemented in phase 04).
- `js/ui.js`: rendering and DOM binding (implemented in phase 02).
- `js/main.js`: bootstrap and orchestration entrypoint.

## Run locally

Open `uno-game/index.html` in a browser, or serve the repository root with any static file server.
