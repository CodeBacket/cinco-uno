# Cinco UNO (`uno-game/`)

This folder contains the phased implementation scaffold for a browser-based UNO game:

- one human player
- a configurable number of AI opponents (`MIN_AI_OPPONENTS` to `MAX_AI_OPPONENTS`)
- plain HTML/CSS/JavaScript with no framework dependency

## Current status

Phase 01 scaffold is in place:

- `index.html` and `styles.css` application shell
- `js/state.js` architecture contract constants, phase transitions, and shared event vocabulary
- module boundary stubs in `js/engine.js`, `js/ai.js`, `js/ui.js`, and `js/main.js`

## Next phases

Follow docs plans in order from repository root:

1. `docs/02-ui-html-css.plan.md`
2. `docs/03-core-engine-and-turn-loop.plan.md`
3. `docs/04-multi-opponent-and-ai.plan.md`
4. `docs/05-qa-polish-and-ship.plan.md`
