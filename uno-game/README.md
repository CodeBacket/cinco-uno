# uno-game scaffold

This directory contains the phased implementation scaffold for ticket #31.

## Current status

- Phase 01 complete:
  - folder/module structure created
  - shared state contract added in `js/state.js`
  - baseline rules reference recorded in `RULES.md`
- Phases 02-05 pending implementation.

## Structure

- `index.html` - app entry shell for the phased mini-app
- `styles.css` - base styling scaffold
- `js/state.js` - shared state constants and transition helpers
- `js/engine.js` - rule engine placeholder
- `js/ai.js` - AI placeholder
- `js/ui.js` - UI binding placeholder
- `js/main.js` - bootstrap placeholder

## Running locally

Open `uno-game/index.html` in a browser, or serve the repo root with a static
HTTP server and navigate to `/uno-game/`.
