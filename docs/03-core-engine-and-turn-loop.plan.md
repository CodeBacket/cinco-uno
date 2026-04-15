# AI Implementation Plan — Core engine and turn loop (Cinco UNO)

## Summary

Implement a DOM-free rule engine: deck construction, shuffle, deal, discard pile rules, legal play validation, special card resolution, turn advancement, draw pile reshuffle, and a stable API consumed by the controller and AI.

## Objective

Encode the rules from [01-product-rules-and-architecture.plan.md](01-product-rules-and-architecture.plan.md) so all players (human and AI) use the same transition functions.

## Scope

### In scope

- `uno-game/js/engine.js` (or equivalent module): pure functions or class with no `document` access.
- Card model: `{ id, color | 'wild', value }` where `value` enumerates `0-9`, `skip`, `reverse`, `draw2`, `wild`, `wild4`.
- Operations: `createInitialState(playerCount)`, `shuffleDeck(seed?)`, `legalPlays(state, seatIndex)`, `applyPlay(state, seatIndex, cardId)`, `applyDraw(state, seatIndex)`, `applyWildColorChoice(state, color)`, `stepTurnAfterSpecials(state)` internal to apply.
- Wild Draw Four legality per plan 01.
- Reshuffle discard into draw when draw empty (preserve top discard).

### Out of scope

- Rendering and event listeners (plan 02 UI + controller wiring).
- AI heuristics (plan 04).
- Persistence and networking.

## Affected areas

- [uno-game/js/engine.js](uno-game/js/engine.js)
- [uno-game/js/state.js](uno-game/js/state.js) (optional types/helpers)
- Unit tests optional: if repo has no test runner, use dev-only `engine.selfTest()` guarded by query flag (document in plan 05).

## Implementation plan

1. **Constants**: `COLORS`, `VALUES`, `HAND_SIZE`, `MAX_PLAYERS` derived from `1 human + MAX_AI`.
2. **Deck builder**: build 108 cards with unique `id` integers for stable references.
3. **Shuffle**: Fisher–Yates; optional `seed` parameter for deterministic QA (plan 05).
4. **Deal**: deal 7 to each seat in round-robin; build discard: flip from draw until first non-wild colored top (per plan 01).
5. **Top discard helper**: read effective color (after wild, use `pendingWildColor` until next colored play resolves display color for matching).
6. **Legal plays**:
   - Match effective color, or number/symbol on face-up non-wild card; wild always playable except wild4 restriction.
   - Wild Draw Four: illegal if player has any hand card matching **effective color** (excluding wild as color match unless you treat wild as absent—spec: match colored cards only).
7. **Apply play**: move card from hand to discard; if wild, set state phase `awaitWildColor` for that seat (human or AI); wild4 also `awaitWildColor` after marking draw penalty queue.
8. **Special resolution**:
   - Skip: advance turn twice in current direction.
   - Reverse: flip direction; in 2-player UNO, reverse acts like skip (document and implement).
   - Draw Two: next player draws 2, loses turn (no stack).
   - Wild: after color choice, single advance.
   - Wild4: next draws 4, loses turn after color choice.
9. **Draw**: if no legal play, player may draw one; if drawn card is playable, optional immediate play rule—**v1**: allow pass only after draw (player may play drawn card or click “Pass” if still no play—simpler: **after draw, if playable, player gets one chance to play it or ends turn**). Document chosen rule in code comment and Open Questions if ambiguous.
10. **Round end**: when hand empty, emit terminal flag in result `{ roundWinner: seatIndex }`.
11. **Events array**: push structured events for UI (`{ type, payload }`) for each mutation, and source `type` values from `EVENT_TYPES` in `uno-game/js/state.js` to keep vocabulary canonical.

## Risks / edge cases

- **Two-player reverse**: must match Mattel-style behavior.
- **awaitWildColor** with AI: controller must not advance turn until color chosen.
- **Draw pile reshuffle**: only one top card remains on discard; if draw still empty, rare—define error `DEADLOCK` for QA.
- **Same id played twice**: prevent by removing card from hand by id.

## Validation / testing

| ID | Preconditions | Steps | Expected result |
|----|---------------|-------|-----------------|
| T3.1 | `seed=1` fixed | `createInitialState(4)`, inspect deck order | Reproducible order across runs |
| T3.2 | Fresh state | Deal hands | Each hand size 7; draw+discard counts sum to 108 |
| T3.3 | Top discard red `5` | `legalPlays` for seat with red `3` and blue `5` | Includes red `3`, blue `5`; excludes green `4` |
| T3.4 | Top wild with pending blue | Hand has only red cards | Legal set includes wild4 only if no red matches top—follow plan 01 wild4 rule |
| T3.5 | Play `draw2` | Apply and inspect next seat | Next hand +2; next turn skipped |
| T3.6 | 2 players | Play reverse | Current player advances as skip |
| T3.7 | Draw pile size 0, discard >1 | `applyDraw` | New draw pile from shuffled discard minus top; game continues |
| T3.8 | Illegal play attempt | `applyPlay` wrong card | Returns `{ ok: false, reason }`, state unchanged |
| T3.9 | Win | Play last card legally | `{ roundWinner }` set; hands consistent |
| T3.10 | Wild play | Apply wild without color | State `awaitWildColor` true for actor |
| T3.11 | Top discard is Wild; pending color green | Hand contains green `7` | `legalPlays` includes green `7` |
| T3.12 | Wild4 fully resolved (color chosen); next seat receives draw+skip | Run scripted sequence per engine API | Next player hand size increased by 4 before their skipped turn; state consistent |

**Cross-plan regression**:

- After AI plan: re-run T3.4, T3.8 whenever `legalPlays` changes.
- After UI: run manual scenarios derived from T3.* through controller.

## Open questions

1. **After draw one card rule**: immediate optional play vs forced end of turn—pick one for v1 and test accordingly.
2. **Challenge rule** for Wild4: omitted for v1 per plan 01—confirm.
