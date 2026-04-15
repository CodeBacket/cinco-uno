# Cinco UNO rules baseline (v1)

This file mirrors the normative rules from `docs/01-product-rules-and-architecture.plan.md`.

## Deck and deal

- 108-card deck:
  - Colors: red, yellow, green, blue
  - Numbers: one `0` and two each of `1` to `9` per color
  - Action cards per color: two `skip`, two `reverse`, two `draw2`
  - Wilds: four `wild`, four `wild4`
- Deal 7 cards to each player.
- The opening discard must be a colored card. If a wild is flipped, reshuffle it back and retry.

## Players and setup

- Exactly one human player.
- AI opponent count is selectable and constrained to `1..5`.
- Single-round game for v1 (no match scoring).

## Turn and play rules

- Start direction is clockwise.
- A play is legal when the card matches top discard color, number, or symbol.
- `wild` is always legal and requires choosing the next color.
- `wild4` is legal only when the player has no card matching the current effective color.
- `draw2`: next player draws 2 and loses turn.
- `skip`: next player loses turn.
- `reverse`: direction flips.
- No stacking in v1.

## Round end and UNO behavior

- Auto-UNO policy for v1: declaring UNO is automatic when one card remains.
- First player to empty hand wins the round.

## Draw pile exhaustion

- If draw pile is empty, reshuffle discard minus top card into a new draw pile.
- If still not recoverable, engine must expose a terminal/deadlock outcome.
