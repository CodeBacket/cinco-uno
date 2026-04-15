# Cinco UNO (phase scaffold)

This folder contains the phased implementation target for ticket #31.

## Included in this scaffold

- `index.html` and `styles.css` for the app shell
- module-boundary stubs under `js/`:
  - `main.js`
  - `engine.js`
  - `ai.js`
  - `ui.js`
  - `state.js` (shared contract/constants)
- `RULES.md` baseline rule note for developers

## State contract highlights

- AI opponent bounds:
  - `MIN_AI_OPPONENTS = 1`
  - `MAX_AI_OPPONENTS = 5`
- phase constants and transition helper
- canonical event types consumed by engine/controller/UI phases

## Local syntax checks

Run:

```bash
node --check uno-game/js/state.js
node --check uno-game/js/main.js
node --check uno-game/js/engine.js
node --check uno-game/js/ai.js
node --check uno-game/js/ui.js
```
