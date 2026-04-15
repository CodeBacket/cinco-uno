# Cinco UNO — implementation plans

This folder contains phased **planning-only** documents for a single-page UNO game: one human player plus a user-selected number of computer opponents, built with plain HTML, CSS, and JavaScript (no framework required).

The playable build lives in [`uno-game/`](uno-game/). See [`uno-game/README.md`](uno-game/README.md) for how to run it locally.

Read the plans in order; each file assumes decisions and interfaces from earlier phases.

| Order | Document | Summary |
|-------|----------|---------|
| 1 | [01-product-rules-and-architecture.plan.md](docs/01-product-rules-and-architecture.plan.md) | Product rules, game states, architecture, folder layout |
| 2 | [02-ui-html-css.plan.md](docs/02-ui-html-css.plan.md) | HTML structure, CSS layout, accessibility |
| 3 | [03-core-engine-and-turn-loop.plan.md](docs/03-core-engine-and-turn-loop.plan.md) | Deck, rules engine, turn loop, legal moves |
| 4 | [04-multi-opponent-and-ai.plan.md](docs/04-multi-opponent-and-ai.plan.md) | Selectable AI count, seating, AI behavior |
| 5 | [05-qa-polish-and-ship.plan.md](docs/05-qa-polish-and-ship.plan.md) | Master test matrix, polish, shipping checklist |

