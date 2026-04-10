# 🤖 AI Implementation Plan

## 🧾 Summary
Implement core gameplay flow for issue #25 by adding turn handling, legal card validation, play-to-discard behavior, and draw-when-stuck behavior.

## 🎯 Objective
Deliver a reliable turn-based gameplay loop that enforces playable card rules and keeps game state consistent after each play or draw action.

## 📦 Scope

### In Scope
- Track active player turns and advance turn order after actions.
- Validate whether a card can be played against the current discard top card.
- Allow players to play valid cards from hand to discard pile.
- Support drawing a card when no playable card is available, including draw-pile refill from discard.

### Out of Scope
- Special action card effects such as `Skip`, `Reverse`, `Draw Two`, and `Wild Draw Four` behavior.
- Win-condition handling, UNO call mechanics, and end-game screens.
- Multiplayer/network synchronization, AI strategy, and UI animation polish.

## 🧩 Affected Areas
- `script.js`
- `index.html`
- `style.css`

## 🛠 Implementation Plan
1. Define or normalize gameplay state structure for players, draw pile, discard pile, and current turn index.
2. Add helper functions to read the top discard card and determine playable cards using color/number/symbol/wild matching rules.
3. Implement turn lifecycle helpers to start a turn, validate acting player, and advance to the next player.
4. Implement a play-card action that rejects invalid moves and mutates player/discard state only for valid plays.
5. Implement a draw-card action for no-playable-card scenarios and add discard-to-draw reshuffle logic when the draw pile is empty.
6. Connect gameplay actions to existing UI events and state refresh hooks so turns and hand/discard updates are visible.

## ⚠️ Risks / Edge Cases
- Draw pile exhaustion must reshuffle discard cards while preserving the current top discard card.
- Out-of-turn or invalid card plays must not mutate game state.
- Repeated rapid input can cause duplicate actions if turn locking/guard checks are missing.

## 🧪 Validation / Testing
- Manually verify valid and invalid play attempts for color, number/symbol, and wild card cases.
- Manually verify draw behavior when no playable card exists and when the draw pile is exhausted.
- Expected result: only legal moves are accepted, turn order advances correctly, and draw/reshuffle behavior keeps gameplay continuous.

## ❓ Open Questions
- Should a player be allowed to immediately play the drawn card in the same turn if it is valid?
- Are special action card rules intentionally deferred to a follow-up issue, or should any subset be included now?
