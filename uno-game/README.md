# Cinco UNO scaffold

This directory contains the phased implementation for the browser-based Cinco UNO game.

## Phase-01 status

- `index.html` and `styles.css` define an initial shell for setup and gameplay screens.
- `js/main.js`, `js/engine.js`, `js/ai.js`, and `js/ui.js` are module-boundary stubs.
- `js/state.js` defines shared architecture contracts for:
  - AI opponent bounds (`MIN_AI_OPPONENTS`, `MAX_AI_OPPONENTS`)
  - game phase transitions (`GAME_PHASES`, `canTransitionPhase`)
  - canonical event vocabulary (`EVENT_TYPES`)

## Run locally

Open `uno-game/index.html` directly in a browser, or serve the repository root with any static server.

