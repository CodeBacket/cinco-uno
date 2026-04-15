# Cinco UNO rules baseline (v1)

This note mirrors the product rules contract from `docs/01-product-rules-and-architecture.plan.md`.

## Deck and deal

- Standard 108-card UNO deck:
  - Four colors: red, yellow, green, blue.
  - Number cards: one 0 and two of 1-9 per color.
  - Action cards: two Skip, two Reverse, two Draw Two per color.
  - Wild cards: four Wild and four Wild Draw Four.
- Deal seven cards to each player.
- Start discard by flipping from draw until a colored (non-wild) card appears.

## Turn and legal play

- Initial direction is clockwise.
- Legal play matches discard by color, number, or symbol; wild cards are always candidate plays.
- Reverse flips direction.
- Skip skips one seat.
- Draw Two makes next player draw two and lose turn (stacking disabled in v1).
- Wild Draw Four is legal only when actor has no card matching the current effective color.

## Wild and round flow

- Wild and Wild Draw Four require choosing the next color.
- UNO declaration is automatic at one card for v1.
- First player to empty hand wins the round (single-round game by default).
- If draw pile empties, reshuffle discard pile except its top card to form new draw pile.

## Setup limits

- Exactly one human plus a configurable number of AI opponents.
- Allowed AI range: 1-5.
