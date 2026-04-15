# Cinco UNO Rules Baseline (v1)

This ruleset mirrors the product architecture contract in
`docs/01-product-rules-and-architecture.plan.md`.

## Deck and setup

- Standard 108-card UNO deck:
  - Four colors: red, yellow, green, blue
  - Number cards: one `0` and two each of `1-9` per color
  - Action cards per color: two `skip`, two `reverse`, two `draw2`
  - Wild cards: four `wild`, four `wild4`
- Deal 7 cards to each player.
- Flip the first discard card from draw pile.
- If the starter card is `wild` or `wild4`, reshuffle it into draw and flip again
  until starter is colored.

## Turn flow

- Start clockwise.
- `reverse` flips direction (in 2-player games, reverse behaves like skip).
- `skip` skips one player.
- `draw2` makes next player draw 2 and lose their turn (no stacking in v1).
- `wild` lets the actor choose next active color.
- `wild4` is legal only when actor has no colored card matching current color.
- `wild4` makes next player draw 4 and lose their turn (no challenge rule in v1).

## Legal play

A card is legal when it matches:

1. current color, or
2. current number/symbol, or
3. is a `wild` / `wild4` (with `wild4` restriction above).

## Round end and reset

- A round ends when a player reaches 0 cards.
- V1 defaults to single-round games.
- Phase transitions:
  - `menu -> playing`
  - `playing -> roundOver`
  - `roundOver -> menu` (or `gameOver` for future match mode)

## Player model

- Exactly one human player.
- User-selected AI opponents must be in range `1-5`.
