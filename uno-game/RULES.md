# Cinco UNO rules baseline (phase-01)

This developer note mirrors the normative rules from `docs/01-product-rules-and-architecture.plan.md`.

## Deck and deal

- Standard 108-card UNO deck.
- 7 cards dealt per player.
- Starter discard must be a colored card; if wild/wild draw four appears first, reshuffle and retry.

## Player model

- Exactly one human player.
- AI opponents are configurable from **1** to **5**.

## Turn and legal play

- Play clockwise by default; reverse flips direction.
- A legal play matches effective color, number, or symbol, or is a wild.
- Wild Draw Four is legal only when the acting player has no colored card matching the effective color.

## Special cards and v1 decisions

- Skip: next seat loses turn.
- Reverse: flips direction (in 2-player mode it effectively behaves as skip).
- Draw Two: next seat draws 2 and loses turn (stacking disabled for v1).
- Wild: player chooses next color.
- Wild Draw Four: choose color, then next seat draws 4 and loses turn.

## Round end and reshuffle

- A round ends immediately when any hand is empty.
- If draw pile is empty, reshuffle discard except top card into a new draw pile.

## Event vocabulary

Canonical event types are centralized in `js/state.js` as `EVENT_TYPES` to keep engine/controller/UI in sync.

