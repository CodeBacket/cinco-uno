# Cinco UNO Rules Baseline (v1 contract)

This document mirrors the normative rules from
`docs/01-product-rules-and-architecture.plan.md`.

## Core setup

- 108-card UNO deck:
  - Colors: red, yellow, green, blue.
  - Number cards: one `0` per color, two each of `1` through `9` per color.
  - Action cards per color: two `skip`, two `reverse`, two `draw2`.
  - Wild cards: four `wild`, four `wild4`.
- Deal 7 cards per player.
- The first discard card must be a colored (non-wild) card. If a wild is flipped,
  reshuffle it into draw and flip again until colored.

## Turn/play rules

- Legal plays match discard by color, number, or action symbol.
- `wild` is always playable.
- `wild4` is legal only when the active player has no other card matching the
  current effective color.
- `draw2`: next player draws two cards and is skipped (no stacking in v1).
- `reverse`: direction flips; in 2-player games it acts as skip behavior.
- `skip`: skips the next player.
- `wild` / `wild4`: current player chooses next color.

## Round rules

- AI opponent count selectable in range `1..5` (human player is always included).
- UNO call behavior for v1 is automatic when one card remains.
- Single-round game: first player to empty hand wins.
- If draw pile is empty, reshuffle discard pile except top card into new draw pile.

## Notes

- Wild Draw Four challenge mechanics are omitted in v1.
- Stacking is off in v1.
