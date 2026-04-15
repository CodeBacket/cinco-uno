# Cinco UNO v1 Rules Baseline

This file mirrors the normative rules contract defined in `docs/01-product-rules-and-architecture.plan.md` for ticket #31.

## Deck

- Standard 108-card UNO deck.
- Colors: red, yellow, green, blue.
- Number cards per color: one `0`, two each of `1-9`.
- Action cards per color: two `skip`, two `reverse`, two `draw2`.
- Wild cards: four `wild`, four `wild4`.

## Round Setup

- One human plus `N` AI opponents where `N` must be within `[1, 5]`.
- Deal 7 cards to each player.
- Place remaining cards in draw pile.
- Flip draw cards to initialize discard until the top card is a colored non-wild card.

## Turn Flow and Play Legality

- Turn direction starts clockwise.
- A play is legal when card matches top discard by color, number, or action symbol.
- `wild` is always playable.
- `wild4` is playable only if the actor has no colored card matching current effective color.
- After a `wild`/`wild4`, actor chooses next color.

## Special Cards

- `skip`: next seat loses turn.
- `reverse`: flips direction.
- `draw2`: next seat draws 2 and loses turn (no stacking in v1).
- `wild4`: next seat draws 4 and loses turn after wild color is chosen.

## Round End and Draw Pile Exhaustion

- Automatic UNO declaration is used in v1 when a hand reaches one card.
- Round ends as soon as a hand size reaches zero.
- If draw pile empties, reshuffle discard pile except top discard into new draw pile.

## Scoring and Match Scope

- v1 defaults to a single-round game.
- Match scoring is out of scope unless added in later phases.
