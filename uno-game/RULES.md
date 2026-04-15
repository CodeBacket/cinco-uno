# Cinco UNO rules baseline (v1)

This developer-facing note mirrors the baseline rules in
`docs/01-product-rules-and-architecture.plan.md`.

## Deck

- 108 cards total
- Four colors: red, yellow, green, blue
- Number cards: one `0` and two each of `1` through `9` per color
- Action cards per color: two `skip`, two `reverse`, two `draw2`
- Wild cards: four `wild`, four `wild4`

## Core gameplay

- Deal 7 cards to each player.
- Start discard by flipping cards from draw until a non-wild colored card appears.
- Legal play matches effective top color, number, or symbol.
- Wild can be played at any time and sets next color.
- Wild Draw Four is legal only if the player has no colored card matching the
  current effective color.
- Draw Two makes the next player draw 2 and lose their turn.
- Reverse changes direction (in 2-player games, reverse behaves like skip).
- Skip skips the next player.

## Turn and round flow

- One human player plus `N` AI opponents where `N` must be in `[1, 5]`.
- Automatic UNO declaration is assumed in v1 when one card remains.
- Round ends immediately when any player empties their hand.
- v1 default is single-round games.

## Draw pile reshuffle

When draw pile is empty, reshuffle discard into draw while preserving the top
discard card. If no valid reshuffle is possible, engine should emit an error
state/event for QA visibility.
