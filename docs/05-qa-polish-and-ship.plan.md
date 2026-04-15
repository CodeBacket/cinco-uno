# AI Implementation Plan — QA, polish, and ship (Cinco UNO)

## Summary

Consolidate a master regression matrix, browser smoke checklist, performance sanity, developer ergonomics (`DEBUG_AI`, seeded games), player-facing copy, and static hosting instructions so the UNO mini-app can ship as a folder of files.

## Objective

Define “done” for v1 and prevent regressions when fixing bugs.

## Scope

### In scope

- Master test table mapping T1.*–T5.* to release gates.
- End-to-end scenarios spanning setup → multi-AI play → round end → menu.
- Known edge-case bank (reshuffle, wild4 legality, 2p reverse).
- Optional `engine.selfTest()` or `?selftest=1` one-shot in browser console output.
- README for players in `uno-game/README.md` (how to open locally).
- Ship checklist: no console errors in happy path, LICENSE note if needed.

### Out of scope

- Automated CI in parent repo unless maintainers want to add a headless step later.
- Localization.

## Affected areas

- [uno-game/](uno-game/) (all files integration)
- [docs/cinco-uno/](docs/cinco-uno/) (this QA plan only; do not duplicate code)

## Implementation plan

1. **Seed hook**: `?seed=123` sets shuffle seed (plan 03); document in player README for reproducible bug reports.
2. **Debug flags**: `?debugAi=1` logs AI decisions; guard all logs behind flag.
3. **Self-test**: If implemented, run on load when `?selftest=1`; print PASS/FAIL counts; failures use `console.error`.
4. **Manual E2E scripts** (execute in Chrome, Firefox, Edge):
   - **E2E-A**: N=2, play until human wins (use seed that speeds up or manipulate via debug if available).
   - **E2E-B**: N=5, verify UI and turn rotation for 15 turns without error.
   - **E2E-C**: Force reshuffle by playing many rounds or dev-only shrink draw pile—validate no crash.
5. **Polish**: loading title, focus return to Start on menu, disable Start while “initializing” for one frame if needed.
6. **Ship**: zip `uno-game/` or serve via any static host; note CORS not required for file:// if relative assets only.

## Risks / edge cases

- **file://** vs **http://**: some browsers restrict modules; if using `type="module"`, document need for simple static server (`npx serve uno-game`).
- **Memory**: leaked `setInterval` from AI delays if not cleared on menu return.
- **Keyboard traps** in wild picker modal.

## Validation / testing

### Master regression matrix (gate before merge)

| Area | Test IDs | Gate |
|------|----------|------|
| Product/architecture | T1.1–T1.8 | All PASS on doc review sign-off |
| UI / a11y layout | T2.1–T2.10 | All PASS on target browsers |
| Engine | T3.1–T3.12 | All PASS (automated or manual) |
| AI / multi-seat | T4.1b–T4.10 | All PASS |
| Ship / hygiene | T5.1–T5.8 below | All PASS |

### Detailed ship tests

| ID | Preconditions | Steps | Expected result |
|----|---------------|-------|-----------------|
| T5.1 | Fresh load | Complete E2E-A | No uncaught errors; round completes |
| T5.2 | Fresh load | Complete E2E-B | UI usable; announcer not spammy |
| T5.3 | `?seed=42` | Start two games | Identical first hands and starter discard |
| T5.4 | `?debugAi=1` | N=5, 30 turns | Log lines show seat id, action, card id |
| T5.5 | Round over | Tab to “Back to menu”, Enter | Focus lands on AI count or Start |
| T5.6 | 10 round trips menu ↔ game | Memory snapshot (devtools) | No steady heap climb from timers |
| T5.7 | Wild picker open | ESC | Documented safe behavior; engine consistent |
| T5.8 | Player README | Follow open instructions | Game runs per documented method |

### Stress / soak (optional v1.1)

| ID | Preconditions | Steps | Expected result |
|----|---------------|-------|-----------------|
| T5.9 | Automated or manual loop | 200 AI-only turns with harness | State remains consistent; average step < 50ms excluding artificial delay |

**Cross-plan regression**:

- On any change: run Gate table row for affected area plus one full E2E.

## Open questions

1. Add minimal Playwright smoke in parent CI, or stay manual until v2?
2. Zip naming and version string visible in UI footer?
