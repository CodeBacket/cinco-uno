# Cinco UNO rules baseline (v1)

This mirrors the baseline contract from `docs/01-product-rules-and-architecture.plan.md`.

## Deck

- 108 cards total
- four colors: red, yellow, green, blue
- numbers:
  - one `0` per color
  - two each of `1` through `9` per color
- actions per color:
  - two `skip`
  - two `reverse`
  - two `draw2`
- wild cards:
  - four `wild`
  - four `wild4`

## Round rules

- Deal 7 cards to each player.
- Flip starting discard from draw pile; if it is `wild`/`wild4`, reshuffle it and retry until a colored starter appears.
- Legal play matches:
  - color, or
  - number/symbol, or
  - wild cards (with `wild4` restriction)
- `wild4` is legal only when the current player has no other card matching current color.
- `draw2`: next player draws 2 and loses turn (no stacking in v1).
- `wild`: player chooses next color.
- `wild4`: player chooses next color, then next player draws 4 and loses turn.
- Empty draw pile: reshuffle discard (excluding top card) into new draw pile.

## Game flow

- one human + user-selected AI count in range `[1, 5]`
- baseline phase flow:
  - `menu -> playing -> roundOver -> menu`
  - optional `gameOver` for match-scoring expansions
- v1 is a single-round win condition: first player to empty hand wins.
