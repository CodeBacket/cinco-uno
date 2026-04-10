# 🤖 AI Implementation Plan

## 🧾 Summary
Design and implement a polished, production-ready UNO card component system with authentic card styling, visual hierarchy, and accessibility support. Cards should look like real UNO cards with proper proportions, iconic design elements, and smooth interactions.

## 🎯 Objective
Create a visually appealing, reusable card-rendering system using HTML, CSS, and vanilla JavaScript that accurately represents UNO cards with professional-quality styling and prepares the foundation for future game mechanics.

## 📦 Scope

### In Scope
- **Card Data Model**: Define a comprehensive card data structure with type safety via JSDoc
- **Card Component Factory**: Create a modular DOM generation system for cards
- **Visual Design System**: Implement authentic UNO card aesthetics with proper proportions
- **Color System**: Four distinct color themes (red, yellow, green, blue) with accessible contrast
- **Number Cards**: Display numbers 0-9 with proper card layout (center + corners)
- **Special Action Cards**: Skip, Reverse, and Draw Two with iconic symbol representations
- **Card States**: Support for normal, hover, and selected states
- **Responsive Sizing**: Cards scale appropriately at different viewport sizes

### Out of Scope
- Deck generation and shuffle logic
- Wild cards (Wild, Wild Draw Four)
- Draw/discard pile mechanics
- Turn handling and card play validation
- Game rules and win conditions
- Card flip animations (future enhancement)

## 🧩 Affected Areas

| File | Changes |
|------|---------|
| `/index.html` | Add card container, demo sections for each card type |
| `/style.css` | Card component styles, color themes, responsive design, CSS custom properties |
| `/script.js` | Card data model, render functions, demo initialization |

## 🏗 Architecture

### Card Data Model
```javascript
/**
 * @typedef {Object} Card
 * @property {'red'|'yellow'|'green'|'blue'} color - Card color
 * @property {'number'|'skip'|'reverse'|'draw-two'} type - Card type
 * @property {number|null} value - Numeric value (0-9) or null for action cards
 */
```

### CSS Class Naming Convention
- `.card` - Base card styles
- `.card--{color}` - Color variants (red, yellow, green, blue)
- `.card--action` - Action card modifier
- `.card__value` - Center value display
- `.card__corner` - Corner value indicators
- `.card__symbol` - Action card symbols

### DOM Structure
```html
<div class="card card--red">
  <span class="card__corner card__corner--top">7</span>
  <span class="card__value">7</span>
  <span class="card__corner card__corner--bottom">7</span>
</div>
```

## 🛠 Implementation Plan

### Phase 1: Foundation (CSS Custom Properties & Base Structure)
1. **Define CSS custom properties** for colors, sizes, and spacing
   - Card dimensions: `--card-width: 100px`, `--card-height: 150px` (2:3 ratio like real UNO cards)
   - Color palette for each UNO color with dark/light variants
   - Typography scale for values and symbols
   
2. **Add card container to HTML**
   - Create `<div id="card-showcase">` in game area
   - Add semantic structure with `role` attributes for accessibility

### Phase 2: Card Base Styling
3. **Implement base `.card` styles**
   - Rounded corners (border-radius: 12px)
   - Card shadow for depth effect
   - White inner border/oval to match UNO card design
   - Proper padding and overflow handling
   - Transition properties for hover states

4. **Create color variant classes**
   - `.card--red`: Background #ED1C24, text white
   - `.card--yellow`: Background #FFDE00, text black (for contrast)
   - `.card--green`: Background #00A651, text white
   - `.card--blue`: Background #0072BC, text white

### Phase 3: Number Card Rendering
5. **Implement number card layout**
   - Large centered value using `.card__value`
   - Corner indicators with rotated bottom corner (180deg)
   - Font: Bold, sans-serif with text shadow for depth
   - Support for all numbers 0-9

### Phase 4: Special Action Cards
6. **Design action card symbols**
   - **Skip**: Circle with diagonal line (use CSS or Unicode ⊘)
   - **Reverse**: Two curved arrows (use CSS or Unicode ⟲)
   - **Draw Two**: Stacked "+2" with card icon representation
   
7. **Implement action card variations**
   - Add `.card--action` modifier class
   - Symbol centered with text label below
   - Maintain consistent sizing with number cards

### Phase 5: JavaScript Card Factory
8. **Create card data model and constants**
   ```javascript
   const CARD_COLORS = ['red', 'yellow', 'green', 'blue'];
   const CARD_TYPES = { NUMBER: 'number', SKIP: 'skip', REVERSE: 'reverse', DRAW_TWO: 'draw-two' };
   ```

9. **Implement `createCardElement(card)` function**
   - Accept card object, return DOM element
   - Handle all card types with appropriate structure
   - Apply correct CSS classes based on card properties

10. **Implement `renderCards(cards, container)` function**
    - Clear container and render array of cards
    - Support for horizontal card layout (flexbox)

### Phase 6: Demo & Validation
11. **Create demonstration on page load**
    - Render one card of each color for numbers
    - Render all three action card types in each color
    - Display in organized grid layout

12. **Add hover interactions**
    - Scale transform on hover (1.05)
    - Elevated shadow on hover
    - Smooth transition timing

## 🎨 Visual Design Specifications

### Card Dimensions
| Property | Value | Notes |
|----------|-------|-------|
| Width | 100px | Base size, scales with container |
| Height | 150px | 2:3 aspect ratio |
| Border Radius | 12px | Rounded corners |
| Inner Oval | 80% width | White oval like real UNO cards |

### Color Palette
| Color | Background | Text | Border |
|-------|------------|------|--------|
| Red | #ED1C24 | #FFFFFF | #B31218 |
| Yellow | #FFDE00 | #1A1A1A | #D4B800 |
| Green | #00A651 | #FFFFFF | #007A3D |
| Blue | #0072BC | #FFFFFF | #005A94 |

### Typography
- Value Font: 'Arial Black', 'Impact', sans-serif
- Value Size: 48px (center), 14px (corners)
- Action Label Size: 12px uppercase

## ⚠️ Risks / Edge Cases

| Risk | Mitigation |
|------|------------|
| Yellow cards have poor text contrast | Use dark text (#1A1A1A) on yellow backgrounds |
| Action symbols may not render on all browsers | Provide CSS-based fallbacks for Unicode symbols |
| Card overflow at small viewport sizes | Implement responsive sizing with min/max constraints |
| Inconsistent naming breaks rendering | Use constants for all type/color values |
| Future wild cards need different structure | Design card factory to be extensible |

## 🧪 Validation / Testing

### Manual Testing Checklist
- [ ] All four colors render with distinct, recognizable styling
- [ ] Number cards (0-9) display correctly with corner values
- [ ] Skip card shows prohibition symbol
- [ ] Reverse card shows arrow symbol
- [ ] Draw Two card shows +2 indicator
- [ ] Hover state provides visual feedback
- [ ] No console errors on page load
- [ ] Cards maintain aspect ratio at different sizes
- [ ] Text is readable on all color backgrounds

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## ✅ Decisions Made (Previously Open Questions)

1. **Card labels**: Use **symbol + text** treatment for action cards
   - Symbols provide quick visual recognition
   - Text labels ensure accessibility and clarity
   
2. **Container design**: Design for **extensibility from the start**
   - Create separate containers: `#card-showcase`, `#player-hand`, `#discard-pile`
   - Use consistent API so cards can be rendered in any container

## 📋 Acceptance Criteria

1. Cards render with proper 2:3 aspect ratio matching real UNO cards
2. Each color is visually distinct and uses accessible contrast ratios
3. Number cards display value in center and both corners
4. All three action cards (Skip, Reverse, Draw Two) have recognizable symbols
5. Cards have hover feedback with scale and shadow effects
6. Code is organized with clear separation of data, rendering, and styling
7. No JavaScript errors in console during normal operation
8. Cards are responsive and maintain proportions at different viewport sizes
