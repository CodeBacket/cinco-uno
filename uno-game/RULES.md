# Cinco UNO Rules Baseline (v1)

This document mirrors the normative baseline from `docs/01-product-rules-and-architecture.plan.md`.

## Deck

- 108 cards total
- Colors: red, yellow, green, blue
- Number cards: one `0` per color, two each of `1-9` per color
- Action cards per color: two each of `skip`, `reverse`, `draw2`
- Wild cards: four `wild`, four `wild4`

## Setup

- One human player plus N AI opponents where `N` is an integer in `[1, 5]`
- Deal 7 cards to each player
- Start discard pile by flipping from draw pile until a non-wild colored card appears

## Turn and legal play

- Turn order starts clockwise; reverse flips direction
- A play is legal if it matches top discard by color, number, or action symbol
- `wild` is always legal and sets the next active color
- `wild4` is legal only when the acting player has no card matching the current effective color

## Special cards

- `skip`: next player loses their turn
- `reverse`: direction changes (in 2-player games this behaves like skip)
- `draw2`: next player draws two and is skipped
- `wild4`: after color choice, next player draws four and is skipped
- Stacking is off for v1

## Round end and reshuffle

- A round ends immediately when a player has zero cards
- UNO declaration is automatic when one card remains (v1)
- If draw pile is empty, reshuffle discard pile except the top card into a new draw pile
