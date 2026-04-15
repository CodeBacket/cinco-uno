# Cinco UNO Rules Baseline (v1)

This document mirrors the rule contract from
`docs/01-product-rules-and-architecture.plan.md` for implementation reference.

## Deck

- 108 cards total.
- Colors: red, yellow, green, blue.
- Number cards by color:
  - one `0`
  - two each of `1` through `9`
- Action cards by color:
  - two `skip`
  - two `reverse`
  - two `draw2`
- Wild cards:
  - four `wild`
  - four `wild4`

## Setup

- One human player plus AI opponents selected in the range `1-5`.
- Deal 7 cards to every player.
- Remaining cards become the draw pile.
- Start discard by flipping the top draw card.
- If starter is `wild` or `wild4`, reshuffle it back and flip again until a colored
  starter appears.

## Turn and play rules

- Default turn direction is clockwise.
- Legal play requires matching:
  - color, or
  - number/symbol, or
  - a wild card.
- `wild4` is legal only when the active player has no colored card matching the
  current effective color.
- Wild cards require choosing the next color.
- `draw2`: next player draws two and is skipped.
- `wild4`: next player draws four and is skipped after color choice.
- `reverse` flips direction.
- `reverse` acts as `skip` in two-player games.
- Stacking is disabled for v1.

## Draw pile exhaustion

- When draw pile is empty, reshuffle discard pile minus its top card into a new
  draw pile.
- If the draw pile still cannot be rebuilt, engine should surface a deadlock
  error for QA handling.

## Round completion

- Automatic UNO declaration is used for v1.
- First player with an empty hand wins the round.
- v1 default is single-round game flow with return to menu.
