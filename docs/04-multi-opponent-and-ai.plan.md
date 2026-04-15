# AI Implementation Plan — Multi-opponent and AI (Cinco UNO)

## Summary

Wire the setup flow so the user selects N ∈ [1, 5] AI opponents, assign seat indices (human vs computers), run the turn loop with correct ordering and direction, and implement a predictable simple AI that only uses `legalPlays` from the engine.

## Objective

Deliver fair, boring-but-correct computer opponents so solo play is playable end-to-end before polish.

## Scope

### In scope

- `uno-game/js/main.js` (or `controller.js`): read `#ai-count`, build `playerCount = 1 + N`, call `createInitialState`.
- Seat map: index `0` = human (fixed convention) or document if human is last; **recommend human = seat 0** for DOM simplicity (`#human-hand` always seat 0).
- Turn loop: while not `roundOver`, if current seat is human, wait for UI intents; if AI, call `chooseAiMove(state, seat)` then `applyPlay` / `applyDraw` / `applyWildColorChoice`.
- AI policy **v1** (documented):
  1. If `legalPlays` non-empty, prefer **non-wild** card that matches current effective color; else lowest “nuisance” first: play `draw2`, `skip`, `reverse`, then numbers.
  2. If only wilds legal, play `wild4` before plain `wild` if both legal and `wild4` is legal under engine rules; otherwise play `wild`.
  3. On wild play, choose color **most frequent** in AI’s remaining hand; tie-break order red, yellow, green, blue.
  4. If `legalPlays` empty, `applyDraw` once; if after draw engine exposes optional one-card play window, attempt single legal play if any, else end turn.
- UX: optional short delay (300–600 ms) between AI moves so players can follow; add `.is-thinking` class per plan 02.

### Out of scope

- Strong AI, lookahead, or card counting across hidden hands.
- Difficulty levels (stretch for plan 05).

## Affected areas

- [uno-game/js/main.js](uno-game/js/main.js) (controller loop)
- [uno-game/js/ai.js](uno-game/js/ai.js)
- [uno-game/js/ui.js](uno-game/js/ui.js) (human input only)
- [uno-game/js/engine.js](uno-game/js/engine.js) (read-only helpers if needed)

## Implementation plan

1. **Bootstrap**: on `DOMContentLoaded`, bind `#start-game` to read `select#ai-count`, validate range, hide `#screen-setup`, show `#screen-game`, initialize state with `1 + N` seats.
2. **Render sync**: after each engine transition, call `renderState(state)` in `ui.js` to refresh counts, top discard, human hand; never render other players’ card faces.
3. **Human turn**:
   - Highlight `aria-current="true"` on active player panel.
   - Mark `.card--playable` using `legalPlays` for seat 0.
   - On card click: if wild, open `#wild-picker`; on color button, call `applyWildColorChoice`.
   - Provide `button#draw` visible when human has no legal plays **or** always visible per product—**recommend**: show Draw always; engine rejects redundant draws if illegal.
4. **AI turn**:
   - Set `aria-busy="true"` on active AI panel (optional).
   - `requestAnimationFrame` + `setTimeout` for small delay, then compute move, apply, emit events to announcer.
5. **Wild color for AI**: use `chooseWildColorFromHand(hand)` per policy.
6. **Round end**: show overlay “Player wins” / “Computer k wins”; button “Back to menu” resets to setup without reload.
7. **Logging**: `DEBUG_AI` flag in URL logs chosen move for QA (plan 05).

## Risks / edge cases

- **Re-entrancy**: disable human clicks while not human turn to avoid double-submit.
- **awaitWildColor**: if human plays wild, UI must block other actions until color picked; same for AI via immediate color choice.
- **Order of AI seats**: clockwise must match visual order left-to-right or circular; document mapping from seat index to DOM node to avoid “wrong player moved” bugs.

## Validation / testing

| ID | Preconditions | Steps | Expected result |
|----|---------------|-------|-----------------|
| T4.1 | N=1 | Start game | Total seats = 2 (1 human + 1 AI) |
| T4.1b | N=1 | Start game | Turn order alternates human ↔ AI until round ends |
| T4.2 | N=5 | Start game | Six seats; UI shows five AI panels with counts |
| T4.3 | AI turn | Observe 20 AI moves | No illegal card ever played (spot-check card id in `DEBUG_AI` log vs `legalPlays`) |
| T4.4 | Human plays skip | Verify next seat | Next is not the immediate human unless direction wraps in 2p |
| T4.5 | AI plays wild | Inspect announced color | Color matches AI policy frequency rule on reconstructed hand snapshot |
| T4.6 | Human not on turn | Click own card | No state change; optional toast “Not your turn” |
| T4.7 | Wild picker open | Click away / ESC | Either cancels illegal partial state or disabled until choice—document behavior; must not leave engine stuck |
| T4.8 | Round ends by AI | Force state in devtools or play out | Overlay shows correct winner seat |
| T4.9 | Back to menu | Click after round | Returns to setup; no leaked intervals/timeouts |
| T4.10 | Rapid Start clicks | Double-click Start | Single game instance only |

**Cross-plan regression**:

- Re-run T3.3, T3.8 via integrated game whenever engine updates.
- Re-run T2.9 after layout tweaks for max AI.

## Open questions

1. Should Draw button be hidden when human has legal plays (stricter UX) vs always visible?
2. Exact visual seat order for six players around a “table” (arc vs row).
