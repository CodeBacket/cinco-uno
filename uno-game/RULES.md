# Cinco UNO rules baseline (phase 01 reference)

This document mirrors the normative rules in:

- `docs/01-product-rules-and-architecture.plan.md`

## Deck and dealing

- 108-card UNO deck:
  - Four colors: red, yellow, green, blue
  - Number cards: one `0` and two each of `1-9` per color
  - Action cards per color: two `skip`, two `reverse`, two `draw2`
  - Wild cards: four `wild`, four `wild4`
- Deal 7 cards per player
- Starter discard must be a colored card
  - If wild/wild4 is flipped first, reshuffle and retry

## Player model and game flow

- Exactly one human player
- AI opponent count is selected in range `1-5`
- Start direction is clockwise
- State phases:
  - `menu`
  - `playing`
  - `roundOver`
  - `gameOver` (reserved for future match mode)

## Legal play and effects

- A play is legal if it matches discard by color, number, or symbol
- `wild` is always legal
- `wild4` is legal only when no other card in hand matches current effective color
- `skip`: next seat loses turn
- `reverse`: direction flips (with 2 players, reverse acts like skip)
- `draw2`: next seat draws 2 and is skipped
- `wild` / `wild4`: acting player chooses the next color

## Round completion and reshuffle

- Round ends when one player empties their hand
- If draw pile empties, reshuffle discard pile except top card into new draw pile
- If reshuffle cannot produce a drawable card, engine should raise a deadlock-style error in later phases
