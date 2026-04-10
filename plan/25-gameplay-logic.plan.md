# 🤖 AI Implementation Plan

## 🧾 Summary
Implement the core gameplay logic for the UNO card game, including the turn system, card validation, playing cards to the discard pile, and drawing cards when no playable card is available.

## 🎯 Objective
Create a fully functional turn-based gameplay system that enforces UNO rules for card matching, allows players to play valid cards to the discard pile, and handles the draw mechanic when a player has no playable cards.

## 📦 Scope

### In Scope
- Implement turn system with current player tracking
- Validate which cards are playable based on the top discard card (matching color or number/symbol)
- Allow playing a valid card to the discard pile
- Implement draw card action when no playable card exists
- Handle turn progression after play or draw
- Support Wild card color matching (any color playable)

### Out of Scope
- Special card effects (Skip, Reverse, Draw Two, Wild) - separate ticket
- Win condition detection - separate ticket
- UNO call mechanic - separate ticket
- AI/computer player logic
- Multiplayer networking
- Visual animations

## 🧩 Affected Areas
- script.js (primary implementation file)
- index.html (may need UI hooks for turn indicator)
- style.css (may need styling for turn indicator/active player)

## 🛠 Implementation Plan

### Phase 1: Game State Structure
1. Define game state object with:
   - `players` array (player objects with hand arrays)
   - `currentPlayerIndex` (tracks whose turn it is)
   - `direction` (1 for clockwise, -1 for counter-clockwise, prep for Reverse card)
   - `drawPile` array
   - `discardPile` array
   - `gameStarted` boolean flag

### Phase 2: Turn System
1. Create `getCurrentPlayer()` function to return active player
2. Create `nextTurn()` function to advance `currentPlayerIndex` based on direction
3. Create `startTurn()` function to begin a player's turn
4. Create `endTurn()` function to finalize turn and trigger next player

### Phase 3: Card Validation
1. Create `getTopCard()` function to return top card of discard pile
2. Create `canPlayCard(card, topCard)` function with rules:
   - Match by color (red on red, blue on blue, etc.)
   - Match by number (7 on 7, etc.)
   - Match by symbol (Skip on Skip, etc.)
   - Wild cards are always playable
   - Wild Draw Four cards are always playable
3. Create `getPlayableCards(hand, topCard)` function to filter playable cards from hand
4. Create `hasPlayableCard(hand, topCard)` function to check if any card is playable

### Phase 4: Play Card Action
1. Create `playCard(playerIndex, cardIndex)` function:
   - Validate it's the player's turn
   - Validate the card is playable
   - Remove card from player's hand
   - Add card to discard pile
   - Trigger end turn
2. Add click event handler for cards in hand (UI integration point)

### Phase 5: Draw Card Action
1. Create `drawCard(playerIndex)` function:
   - Validate it's the player's turn
   - Draw top card from draw pile
   - Add card to player's hand
   - Handle empty draw pile (reshuffle discard pile)
2. Create `reshuffleDiscardIntoDraw()` function:
   - Keep top card in discard
   - Shuffle remaining discard cards
   - Move shuffled cards to draw pile
3. Implement auto-draw when no playable card:
   - Option A: Force draw and end turn
   - Option B: Draw and allow play if drawn card is playable (standard UNO rule)

### Phase 6: Integration & UI Hooks
1. Create `updateUI()` function stub for rendering turn state
2. Expose gameplay functions to global scope or game object
3. Add console logging for debugging gameplay flow

## ⚠️ Risks / Edge Cases
- **Empty draw pile**: Must reshuffle discard pile (except top card) into draw pile
- **No playable cards after draw**: Player must pass turn
- **Rapid clicking**: Prevent multiple card plays in single turn
- **Wild card color selection**: Current scope may defer color selection UI to special cards ticket
- **Dependency on Deck System**: Gameplay logic assumes deck/hand structures exist; may need stubs if not implemented
- **Dependency on Player System**: Assumes player objects with hand arrays exist
- **Dependency on Card Rendering**: UI interactions depend on card elements being rendered

## 🧪 Validation / Testing

### Manual Console Tests
1. Initialize game state with mock players and cards
2. Call `getCurrentPlayer()` and verify correct player returned
3. Call `canPlayCard()` with matching/non-matching cards and verify boolean results
4. Call `playCard()` with valid card and verify:
   - Card removed from hand
   - Card added to discard pile
   - Turn advanced to next player
5. Call `drawCard()` and verify:
   - Card added to player's hand
   - Card removed from draw pile
6. Test `reshuffleDiscardIntoDraw()` when draw pile is empty

### Expected Results
- Turn system correctly tracks and advances current player
- Only valid cards can be played (color or number/symbol match)
- Invalid play attempts are rejected with appropriate feedback
- Draw action works and handles empty draw pile gracefully
- Game state remains consistent after all operations

## ❓ Open Questions
- **Wild card color selection**: Should color be selected immediately or deferred to Special Cards ticket?
- **Draw until playable**: Should player draw one card per turn or continue drawing until playable card found? (Standard UNO allows drawing one and optionally playing it if valid)
- **Prerequisite completion**: Are Deck System and Player System implemented, or should this plan include stubs?

---

**Plan File**: `/plan/25-gameplay-logic.plan.md`
**Issue Reference**: #25
**Created By**: AI Planning Agent
