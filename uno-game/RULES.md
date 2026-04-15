# Cinco UNO rules baseline

This document mirrors the approved rules baseline from `docs/01-product-rules-and-architecture.plan.md`.

## Deck

- 108 cards total.
- Colors: red, yellow, green, blue.
- Number cards per color: one `0`, two each of `1-9`.
- Action cards per color: two `skip`, two `reverse`, two `draw2`.
- Wild cards: four `wild`, four `wild4`.

## Round setup

1. Deal 7 cards to each player.
2. Place remaining cards into draw pile.
3. Flip top card to discard pile.
4. If starter card is `wild` or `wild4`, reshuffle it into draw pile and flip again until a colored starter appears.

## Turn rules

- A play is legal when card color, number, or symbol matches the top discard.
- `wild` is always legal and sets the next active color.
- `wild4` is only legal if player has no card matching the active color.
- `draw2`: next player draws 2 and is skipped (stacking off in v1).
- `skip`: next player is skipped.
- `reverse`: turn direction flips.

## Round end

- Player with one card remaining is considered to have declared UNO automatically for v1.
- First player to empty their hand wins the round.
- Default v1 mode is a single-round game.

## Draw pile recovery

When draw pile is empty, reshuffle all discard cards except the top discard into a new draw pile.

## Player counts

- Exactly one human player.
- AI opponents are user-selectable in range `1-5`.
