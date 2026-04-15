# Cinco UNO mini-app

Ticket: #31  
Plan source: `docs/01-product-rules-and-architecture.plan.md`

## Status

Phase-01 architecture scaffold is in place:

- baseline HTML shell (`index.html`)
- baseline styling (`styles.css`)
- module boundary stubs (`js/main.js`, `js/engine.js`, `js/ai.js`, `js/ui.js`)
- shared state contract (`js/state.js`)
- rules baseline (`RULES.md`)

## Run locally

At this phase there is no full gameplay loop yet. Open `index.html` in a browser to view the scaffold.

If later phases switch to JS modules, run through a static server (example):

```bash
npx serve uno-game
```
