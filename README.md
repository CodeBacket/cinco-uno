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
- [ ] Add game container UI
- [ ] Create basic CSS styling
- [ ] Initialize JavaScript game object

## Deck System

- [ ] Create UNO deck generator (108 cards)
- [ ] Shuffle deck function
- [ ] Create draw pile
- [ ] Create discard pile

## Player System

- [ ] Create player object
- [ ] Deal 7 cards to each player
- [ ] Render player hand
- [ ] Implement draw card action

## Card Rendering

- [ ] Create card component UI
- [ ] Render card colors
- [ ] Render card numbers
- [ ] Render special cards (skip, reverse, draw two)

## Gameplay Logic

- [ ] Implement turn system
- [ ] Validate playable cards
- [ ] Play card to discard pile
- [ ] Draw card when no playable card

## Special Cards

- [ ] Implement Skip card
- [ ] Implement Reverse card
- [ ] Implement Draw Two card
- [ ] Implement Wild card

## Win Condition

- [ ] Detect when player has 1 card (UNO)
- [ ] Detect win condition
- [ ] Display winner message

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

# Goal

The final result should be a simple playable UNO game in the browser.
