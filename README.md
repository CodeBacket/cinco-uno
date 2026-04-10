# UNO Card Game (Vanilla JS)

This project implements a simple browser-based UNO card game using only:

- HTML
- CSS
- JavaScript (Vanilla)

No frameworks or build tools are used.

The goal of the project is to implement the core mechanics of UNO in small incremental tasks.

The game should run simply by opening `index.html` in the browser.

---

# Project Structure

/uno-game
index.html
style.css
script.js
README.md

# Game Goal

Implement a playable UNO card game with:

- deck generation
- card rendering
- player hands
- draw pile
- discard pile
- basic UNO rules

---

# Task List

The AI agent should pick ONE unchecked task and implement it.

## Core Setup

- [x] Create base HTML layout
- [x] Add game container UI
- [x] Create basic CSS styling
- [x] Initialize JavaScript game object

## Deck System

- [x] Create UNO deck generator (108 cards)
- [x] Shuffle deck function
- [x] Create draw pile
- [x] Create discard pile

## Player System

- [x] Create player object
- [x] Deal 7 cards to each player
- [x] Render player hand
- [x] Implement draw card action

## Card Rendering

- [x] Create card component UI
- [x] Render card colors
- [x] Render card numbers
- [x] Render special cards (skip, reverse, draw two)

## Gameplay Logic

- [x] Implement turn system
- [x] Validate playable cards
- [x] Play card to discard pile
- [x] Draw card when no playable card

## Special Cards

- [x] Implement Skip card
- [x] Implement Reverse card
- [x] Implement Draw Two card
- [x] Implement Wild card

## Win Condition

- [x] Detect when player has 1 card (UNO)
- [x] Detect win condition
- [x] Display winner message

---

# Development Rules

The project must follow these rules:

- Use only **HTML, CSS, and vanilla JavaScript**
- No frameworks (React, Vue, Angular, etc.)
- No external dependencies
- Code must run directly in the browser
- Keep code simple and readable

---

# How to Run

1. Clone the repository
2. Open `index.html` in a browser
3. Open the browser console for debugging

---

# Game Features

## Special Cards Implementation

### Skip Card (⊘)
- When played, the next player's turn is skipped
- Available in all four colors (2 per color)

### Reverse Card (⟲)
- Reverses the direction of play
- In a 2-player game, acts like a Skip card
- Available in all four colors (2 per color)

### Draw Two Card (+2)
- Forces the next player to draw 2 cards and lose their turn
- Available in all four colors (2 per color)

### Wild Card (W)
- Can be played on any card
- Player chooses the color for the next play
- 4 Wild cards in the deck

### Wild Draw Four Card (+4)
- Can be played on any card
- Forces the next player to draw 4 cards and lose their turn
- Player chooses the color for the next play
- 4 Wild Draw Four cards in the deck

## Gameplay

- 4 players (1 human, 3 CPU)
- Each player starts with 7 cards
- Match cards by color, number, or type
- Draw a card if you can't play
- First player to empty their hand wins!

---

# Goal

The final result should be a simple playable UNO game in the browser.
