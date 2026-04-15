# Cinco UNO rules baseline (phase-01)

This note mirrors the product-rules contract from `docs/01-product-rules-and-architecture.plan.md`.

## Core rules

- Deck: standard 108-card UNO distribution.
- Deal: 7 cards per player.
- Starter discard: must be a colored (non-wild) card; reshuffle/retry otherwise.
- Turn order: clockwise by default, reverse flips direction.
- Legal play: match color, number, or symbol; wild cards are special.
- Wild Draw Four: legal only when the player has no colored card matching the active color.
- Draw Two: next player draws two cards and loses turn (no stacking in v1).
- Round end: first player to empty their hand wins.
- Empty draw pile: reshuffle discard pile except the top card.

## v1 defaults

- One human player plus an AI opponent count selected in range `1..5`.
- Single-round game flow.
- Automatic UNO declaration when a hand reaches one card.
