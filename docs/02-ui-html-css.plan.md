# AI Implementation Plan — UI (HTML/CSS) (Cinco UNO)

## Summary

Define semantic HTML regions, stable IDs/classes for scripting, responsive layout for one human hand plus up to five AI panels, discard/draw piles, and basic accessibility so color is not the only signal for Wild cards.

## Objective

Deliver a simple, maintainable static layout that plan 03 (engine) and plan 04 (AI) can bind to without DOM rewrites.

## Scope

### In scope

- `uno-game/index.html` structure: setup screen (AI count), main table, human hand, status/readout area.
- `uno-game/styles.css`: flex/grid layout, card face styling (CSS-only or minimal inline SVG backgrounds), breakpoints for narrow vs wide viewports.
- Focus styles, logical heading order, `aria-live` region for announcements.
- Visual patterns/icons on cards so Wild color choice is not color-only.

### Out of scope

- Game logic and AI (plans 03–04).
- Build tools, preprocessors, or component frameworks.
- Internationalization beyond English strings in HTML placeholders.

## Affected areas

- [uno-game/index.html](uno-game/index.html)
- [uno-game/styles.css](uno-game/styles.css)
- Optional: small `uno-game/assets/` for card pattern SVGs if not pure CSS.

## Implementation plan

1. **Setup screen** (`#screen-setup`): heading, `label` + `select#ai-count` with options 1–5, `button#start-game`, short rules blurb.
2. **Game screen** (`#screen-game`, initially hidden): contains:
   - `#table-area`: `#draw-pile` (face-down stack or count), `#discard-pile` (top card visible).
   - `#players-row`: for each AI seat `div.player.ai[data-seat="k"]` with `.player-name`, `.hand-count`, optional `.player-label` (“Computer 1”).
   - `#human-area`: `#human-hand` as horizontal scroll flex row of `.card` elements.
   - `#status-bar`: current turn text, direction indicator.
   - `#wild-picker` (hidden until needed): four color buttons with text labels, not color swatches alone.
3. **Card markup**: each `.card` has `data-card-id` (engine id) or data attributes `data-color`, `data-value` for styling; add `.card--playable` class when controller marks legality.
4. **CSS tokens**: define CSS variables for colors (`--color-red`, etc.) and reuse for Wild picker and card corners.
5. **Responsive**: below 720px width, stack AI in two columns or accordion; human hand remains horizontally scrollable with visible padding.
6. **Accessibility**:
   - One `h1` on setup; game screen uses `h2` for “Table” or visually hidden heading if design requires.
   - `#announcer` with `role="status" aria-live="polite"` for “Computer 2 drew a card.”
   - Wild color buttons: `aria-pressed` when selected phase (if toggle); otherwise normal buttons with visible text “Red”, “Yellow”, “Green”, “Blue”.
   - Keyboard: tab order setup → start → (post plan 03) focusable cards for human only when it is human turn.
7. Document which elements plan 04 will update for “AI thinking” (e.g. `.player.ai.is-thinking` opacity or `aria-busy`).

## Risks / edge cases

- **Overflow**: seven cards per seat × six players clutters small screens; rely on counts for AI, not full fan.
- **Contrast**: ensure text on colored cards meets WCAG AA where possible.
- **Hidden screen flash**: toggling `#screen-setup` / `#screen-game` should avoid layout shift (min-height on main container).

## Validation / testing

| ID | Preconditions | Steps | Expected result |
|----|---------------|-------|-----------------|
| T2.1 | index.html loaded | Open file in browser (or static server) | No console errors from HTML/CSS alone |
| T2.2 | Viewport 1280px | Inspect layout | Table, discard, draw visible; human area usable |
| T2.3 | Viewport 360px width | Scroll and tap targets | Human hand scrolls; buttons min 44×44px touch targets |
| T2.4 | Keyboard only | Tab through setup | Focus order: AI count → Start → (game controls when wired) |
| T2.5 | Screen reader (optional) | Navigate setup | Headings and labels read sensibly |
| T2.6 | Wild picker markup | Inspect four color controls | Each has visible text label, not color-only |
| T2.7 | Card faces | Inspect Wild and Wild +4 | Distinct icons/patterns (not only yellow vs blue background) |
| T2.8 | `#announcer` | Inject test text via devtools | Live region announces without stealing focus |
| T2.9 | Five AI panels | Set N=5 in markup mock | All five `.player.ai` visible without overlapping discard |
| T2.10 | CSS load failure | Disable styles in devtools | Content still readable in DOM order |

**Cross-plan regression**:

- After engine integration (plan 03): re-run T2.2, T2.3 when `.card--playable` toggles frequently.
- After AI (plan 04): re-run T2.9 with dynamic seat count.

## Open questions

1. Card art: pure CSS shapes vs small SVG files?
2. Should human cards show tooltips with full card name for accessibility when symbols are abstract?
