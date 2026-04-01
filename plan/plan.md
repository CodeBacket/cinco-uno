# 🤖 AI Implementation Plan

## 🧾 Summary
Implement the card rendering layer for the UNO game so cards are visually represented with clear color coding and value labels, including number cards and special action cards (skip, reverse, draw two).

## 🎯 Objective
Create a reusable card UI rendering approach that correctly displays UNO card color and face value/action in the browser for player hand and pile views.

## 📦 Scope

### In Scope
- Define card visual structure (card container, value/action text, color treatment)
- Render number cards with correct numeric labels
- Render special cards: skip, reverse, draw two
- Ensure rendered cards integrate with existing DOM layout and styles

### Out of Scope
- Implementing game rule behavior for special cards
- Turn system, play validation, draw logic, or win condition logic

## 🧩 Affected Areas
- index.html
- style.css
- script.js

## 🛠 Implementation Plan
1. Review existing card data model in JavaScript and confirm how card type/value/color are represented.
2. Define a single card render function/component pattern in `script.js` that maps card data to DOM elements and classes.
3. Add/update CSS in `style.css` for base card appearance (size, border, typography) and color variants (red, blue, green, yellow).
4. Implement rendering rules for number cards (numeric label) and action cards (`skip`, `reverse`, `draw two`) with readable display text/icons.
5. Wire card rendering into current hand/pile render flows so cards are consistently displayed wherever they appear.
6. Verify rendering manually in browser with a representative sample of number and special cards across all supported colors.

## ⚠️ Risks / Edge Cases
- Inconsistent card data naming (e.g., `draw_two` vs `draw two`) may cause missing labels/styles.
- Text contrast/readability issues for certain color backgrounds.
- UI overflow or clipping when many cards render in a hand container.

## 🧪 Validation / Testing
- Step 1: Open `index.html` in the browser and inspect player hand/discard rendering.
- Step 2: Validate that each color variant (red/blue/green/yellow) appears with correct visual styling.
- Step 3: Validate that number cards show correct numbers and special cards show correct action labels.
- Expected result: Cards render consistently with correct color and face/action values, including skip, reverse, and draw two.

## ❓ Open Questions
- Should special cards use text labels only, Unicode symbols, or custom graphics for final UI?
- Is there a preferred card size/responsive behavior for small screens?
