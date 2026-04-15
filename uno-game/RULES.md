# Cinco UNO v1 Rules Baseline

This file mirrors the approved baseline from `docs/01-product-rules-and-architecture.plan.md`.

## Deck

- Standard 108-card UNO-style deck.
- Colors: red, yellow, green, blue.
- Number cards per color: one `0`, two each of `1`-`9`.
- Action cards per color: two `skip`, two `reverse`, two `draw2`.
- Wilds: four `wild`, four `wild4`.

## Setup

- Exactly one human player plus configurable AI opponents.
- AI opponent count must be within `1..5`.
- Deal 7 cards to each seat.
- Flip cards from draw pile to start discard until the starter is a non-wild colored card.

## Turn and Play

- Turn order starts clockwise.
- A legal play matches top discard on color, number, or symbol.
- `wild` is always legal and requires a color choice.
- `wild4` is legal only when the acting player has no colored card matching the current effective color.
- No stacking for `draw2`/`wild4` in v1.

## Special Cards

- `skip`: next player loses turn.
- `reverse`: direction flips; in two-player games it behaves like skip.
- `draw2`: next player draws two and loses turn.
- `wild`: acting player chooses the next color.
- `wild4`: acting player chooses color; next player draws four and loses turn.

## Round End

- A round ends immediately when any player has no cards left.
- v1 uses automatic UNO declaration when a player reaches one card.
- v1 default is single-round play (no match scoring required).

## Draw Pile Exhaustion

- If draw pile is empty, reshuffle discard except top card into a new draw pile.
- If no redraw is possible, the engine must return a terminal/deadlock-style error for safe recovery.
