# Cinco UNO (phase 01 scaffold)

This folder contains the phase-01 architecture scaffold for the Cinco UNO mini-app.

## Current scope

- Static shell page (`index.html`, `styles.css`)
- JavaScript module boundaries under `js/`
- Shared state contract in `js/state.js` for:
  - AI opponent bounds (`MIN_AI_OPPONENTS`, `MAX_AI_OPPONENTS`)
  - game phases and allowed transitions
  - canonical UI/controller event names (`EVENT_TYPES`)

## Planned module boundaries

- `js/main.js`: bootstrap and turn-loop orchestration
- `js/engine.js`: rules engine (DOM-free)
- `js/ai.js`: AI move selection
- `js/ui.js`: rendering and interaction
- `js/state.js`: serializable state contract and constants

## Local validation

```bash
node --check uno-game/js/state.js
node --check uno-game/js/main.js
node --check uno-game/js/engine.js
node --check uno-game/js/ai.js
node --check uno-game/js/ui.js
```
