# Cinco UNO (static web app)

This folder contains the playable browser build for issue #34 and plan `docs/04-multi-opponent-and-ai.plan.md`.

## Run locally

Because this app uses ES modules, run it from a static server (not `file://`):

```bash
cd /workspace
python3 -m http.server 8080
```

Then open: `http://localhost:8080/uno-game/index.html`

## Controls

- Choose computer opponents: **1–5**
- Start game
- On your turn:
  - click a playable card (highlighted)
  - or click **Draw**
  - after drawing a playable card, either play that card or click **Pass**
- If you play a wild, choose a color in the picker dialog

## Debug flags

- `?seed=42` — deterministic shuffle seed for reproducible runs
- `?debugAi=1` — logs AI move selection and legal choices in console

Example:

`http://localhost:8080/uno-game/index.html?seed=42&debugAi=1`
