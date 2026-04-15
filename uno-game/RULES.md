# Cinco UNO Rules Baseline (v1)

This document mirrors the rule contract defined in `docs/01-product-rules-and-architecture.plan.md`.

## Deck and setup

- Use the standard 108-card UNO inventory:
  - Four colors: red, yellow, green, blue.
  - Number cards per color: one `0`, two each of `1` to `9`.
  - Action cards per color: two `skip`, two `reverse`, two `draw2`.
  - Wild cards: four `wild`, four `wild4`.
- Deal 7 cards per player.
- Flip cards from the draw pile until the opening discard is a colored (non-wild) card.

## Turn and legal play

- Default direction is clockwise.
- A card is legal if it matches by color, number, or action symbol.
- `wild` is always legal and requires choosing a next color.
- `wild4` is legal only when the acting player has no colored card matching the current effective color.
- No stacking in v1.

## Special card resolution

- `skip`: next seat loses turn.
- `reverse`: direction flips (in 2-player games, reverse behaves like skip).
- `draw2`: next seat draws two and loses turn.
- `wild4`: after color choice, next seat draws four and loses turn.

## Round end and lifecycle

- A round ends when any player empties their hand.
- v1 defaults to automatic UNO declaration when one card remains.
- v1 uses single-round gameplay and returns to menu after round over.
- If draw pile is empty, reshuffle discard pile minus top discard card into new draw pile.
