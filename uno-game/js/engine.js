const COLORS = ["red", "yellow", "green", "blue"];
const HAND_SIZE = 7;
const MIN_AI_OPPONENTS = 1;
const MAX_AI_OPPONENTS = 5;
const MIN_PLAYERS = MIN_AI_OPPONENTS + 1;
const MAX_PLAYERS = MAX_AI_OPPONENTS + 1;

const URL_SEARCH = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
const DEBUG_SEED = URL_SEARCH ? Number(URL_SEARCH.get("seed")) : null;

function createRng(seed) {
  if (!Number.isFinite(seed)) {
    return Math.random;
  }

  let state = seed >>> 0;
  return function next() {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function cardLabel(card) {
  if (!card) {
    return "-";
  }
  return card.color === "wild" ? String(card.value).toUpperCase() : `${card.color.toUpperCase()} ${String(card.value).toUpperCase()}`;
}

function valueMatches(cardValue, topValue) {
  return String(cardValue) === String(topValue);
}

function nextSeatIndex(state, fromSeat, steps = 1) {
  const total = state.hands.length;
  const direction = state.direction;
  let seat = fromSeat;
  for (let i = 0; i < steps; i += 1) {
    seat = (seat + direction + total) % total;
  }
  return seat;
}

function cloneState(state) {
  return {
    ...state,
    hands: state.hands.map((hand) => [...hand]),
    drawPile: [...state.drawPile],
    discardPile: [...state.discardPile],
    pendingWildColor: state.pendingWildColor,
    pendingEffect: state.pendingEffect ? { ...state.pendingEffect } : null,
    mustPlayDrawnCardBySeat: { ...state.mustPlayDrawnCardBySeat },
    phase: state.phase,
    roundWinner: state.roundWinner,
    lastActorSeat: state.lastActorSeat,
    turn: state.turn
  };
}

function drawFromPile(state, amount) {
  for (let i = 0; i < amount; i += 1) {
    if (state.drawPile.length === 0) {
      const reshuffled = reshuffleDrawPile(state.discardPile, state.rng);
      state.drawPile = reshuffled.drawPile;
      state.discardPile = reshuffled.discardPile;
      if (state.drawPile.length === 0) {
        return false;
      }
    }
  }
  return true;
}

function reshuffleDrawPile(discardPile, rng) {
  if (discardPile.length <= 1) {
    return { drawPile: [], discardPile };
  }
  const top = discardPile[discardPile.length - 1];
  const pool = discardPile.slice(0, -1);
  shuffleInPlace(pool, rng);
  return { drawPile: pool, discardPile: [top] };
}

function shuffleInPlace(items, rng) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = items[i];
    items[i] = items[j];
    items[j] = tmp;
  }
}

function buildDeck() {
  const cards = [];
  let id = 1;

  for (const color of COLORS) {
    cards.push({ id: id++, color, value: 0 });
    for (let value = 1; value <= 9; value += 1) {
      cards.push({ id: id++, color, value });
      cards.push({ id: id++, color, value });
    }

    for (let i = 0; i < 2; i += 1) {
      cards.push({ id: id++, color, value: "skip" });
      cards.push({ id: id++, color, value: "reverse" });
      cards.push({ id: id++, color, value: "draw2" });
    }
  }

  for (let i = 0; i < 4; i += 1) {
    cards.push({ id: id++, color: "wild", value: "wild" });
    cards.push({ id: id++, color: "wild", value: "wild4" });
  }

  return cards;
}

function cardById(state, cardId) {
  return state.cardIndex.get(cardId) || null;
}

function topDiscard(state) {
  return state.discardPile[state.discardPile.length - 1] || null;
}

function effectiveColor(state) {
  if (state.pendingWildColor) {
    return state.pendingWildColor;
  }
  const top = topDiscard(state);
  if (!top) {
    return null;
  }
  return top.color === "wild" ? null : top.color;
}

function isWild(card) {
  return card.color === "wild";
}

function canPlayWild4(state, seatIndex) {
  const hand = state.hands[seatIndex];
  const color = effectiveColor(state);
  if (!color) {
    return true;
  }
  for (const cardId of hand) {
    const card = cardById(state, cardId);
    if (!card || isWild(card)) {
      continue;
    }
    if (card.color === color) {
      return false;
    }
  }
  return true;
}

function isCardPlayable(state, seatIndex, card) {
  const top = topDiscard(state);
  if (!top) {
    return true;
  }

  if (isWild(card)) {
    if (card.value === "wild4") {
      return canPlayWild4(state, seatIndex);
    }
    return true;
  }

  const color = effectiveColor(state);
  if (color && card.color === color) {
    return true;
  }

  if (top.color !== "wild" && valueMatches(card.value, top.value)) {
    return true;
  }

  return false;
}

function legalPlays(state, seatIndex) {
  if (state.phase !== "playing") {
    return [];
  }
  if (state.awaitingWildColor && state.awaitingWildColor.seat === seatIndex) {
    return [];
  }
  const hand = state.hands[seatIndex] || [];
  const legal = [];
  for (const cardId of hand) {
    const card = cardById(state, cardId);
    if (card && isCardPlayable(state, seatIndex, card)) {
      legal.push(cardId);
    }
  }
  return legal;
}

function initialDiscard(drawPile) {
  let guard = 0;
  while (drawPile.length > 0 && guard < 500) {
    guard += 1;
    const card = drawPile.pop();
    if (card.color === "wild") {
      drawPile.unshift(card);
      continue;
    }
    return card;
  }
  throw new Error("Could not initialize discard pile");
}

function createInitialState(playerCount, options = {}) {
  if (!Number.isInteger(playerCount) || playerCount < MIN_PLAYERS || playerCount > MAX_PLAYERS) {
    throw new Error(`Player count must be between ${MIN_PLAYERS} and ${MAX_PLAYERS}`);
  }

  const seed = Number.isFinite(options.seed) ? options.seed : DEBUG_SEED;
  const rng = createRng(seed);
  const deck = buildDeck();
  shuffleInPlace(deck, rng);

  const hands = Array.from({ length: playerCount }, () => []);
  for (let round = 0; round < HAND_SIZE; round += 1) {
    for (let seat = 0; seat < playerCount; seat += 1) {
      const card = deck.pop();
      if (!card) {
        throw new Error("Deck depleted while dealing");
      }
      hands[seat].push(card.id);
    }
  }

  const starter = initialDiscard(deck);
  const discardPile = [starter];

  const cardIndex = new Map();
  const allCards = [...deck, starter];
  for (const hand of hands) {
    for (const cardId of hand) {
      const card = buildDeckCardLookupOnce(cardId);
      cardIndex.set(card.id, card);
    }
  }
  for (const card of allCards) {
    cardIndex.set(card.id, card);
  }

  return {
    phase: "playing",
    hands,
    drawPile: deck,
    discardPile,
    cardIndex,
    currentSeat: 0,
    direction: 1,
    pendingWildColor: null,
    pendingEffect: null,
    awaitingWildColor: null,
    mustPlayDrawnCardBySeat: {},
    roundWinner: null,
    lastActorSeat: null,
    turn: 1,
    rng
  };
}

const DECK_CACHE = buildDeck();
const DECK_LOOKUP = new Map(DECK_CACHE.map((card) => [card.id, card]));

function buildDeckCardLookupOnce(cardId) {
  const card = DECK_LOOKUP.get(cardId);
  if (!card) {
    throw new Error(`Unknown card id ${cardId}`);
  }
  return card;
}

function removeCardFromHand(hand, cardId) {
  const index = hand.indexOf(cardId);
  if (index < 0) {
    return false;
  }
  hand.splice(index, 1);
  return true;
}

function resolvePostPlay(state, playedCard, seatIndex) {
  const events = [];
  let nextSeat = nextSeatIndex(state, seatIndex, 1);

  if (playedCard.value === "reverse") {
    if (state.hands.length === 2) {
      nextSeat = seatIndex;
      events.push({ type: "REVERSE_AS_SKIP", payload: { seat: seatIndex } });
    } else {
      state.direction *= -1;
      nextSeat = nextSeatIndex(state, seatIndex, 1);
      events.push({ type: "DIRECTION_CHANGED", payload: { direction: state.direction } });
    }
  } else if (playedCard.value === "skip") {
    nextSeat = nextSeatIndex(state, seatIndex, 2);
    events.push({ type: "SKIPPED", payload: { seat: nextSeatIndex(state, seatIndex, 1) } });
  } else if (playedCard.value === "draw2") {
    const penalizedSeat = nextSeatIndex(state, seatIndex, 1);
    let drew = 0;
    for (let i = 0; i < 2; i += 1) {
      if (!drawFromPile(state, 1)) {
        break;
      }
      const drawn = state.drawPile.pop();
      if (drawn) {
        state.hands[penalizedSeat].push(drawn.id);
        drew += 1;
      }
    }
    nextSeat = nextSeatIndex(state, seatIndex, 2);
    events.push({ type: "DRAW_PENALTY", payload: { seat: penalizedSeat, amount: drew } });
  }

  state.currentSeat = nextSeat;
  state.turn += 1;
  return events;
}

function applyPlay(state, seatIndex, cardId) {
  if (state.phase !== "playing") {
    return { ok: false, reason: "ROUND_OVER", state, events: [] };
  }
  if (state.currentSeat !== seatIndex) {
    return { ok: false, reason: "NOT_YOUR_TURN", state, events: [] };
  }
  if (state.awaitingWildColor) {
    return { ok: false, reason: "AWAITING_WILD_COLOR", state, events: [] };
  }

  const next = cloneState(state);
  const mustPlayCardId = next.mustPlayDrawnCardBySeat[seatIndex];
  if (mustPlayCardId && mustPlayCardId !== cardId) {
    return { ok: false, reason: "MUST_PLAY_DRAWN_CARD", state, events: [] };
  }
  const hand = next.hands[seatIndex];
  const exists = removeCardFromHand(hand, cardId);
  if (!exists) {
    return { ok: false, reason: "CARD_NOT_IN_HAND", state, events: [] };
  }

  const card = cardById(next, cardId);
  if (!card || !isCardPlayable(next, seatIndex, card)) {
    return { ok: false, reason: "ILLEGAL_PLAY", state, events: [] };
  }

  next.discardPile.push(card);
  next.pendingWildColor = null;
  next.lastActorSeat = seatIndex;
  delete next.mustPlayDrawnCardBySeat[seatIndex];

  const events = [{ type: "CARD_PLAYED", payload: { seat: seatIndex, cardId, card: cardLabel(card) } }];

  if (hand.length === 0) {
    next.phase = "roundOver";
    next.roundWinner = seatIndex;
    events.push({ type: "ROUND_WON", payload: { seat: seatIndex } });
    return { ok: true, state: next, events };
  }

  if (card.value === "wild" || card.value === "wild4") {
    next.awaitingWildColor = { seat: seatIndex, cardValue: card.value };
    next.phase = "awaitWildColor";
    events.push({ type: "WILD_COLOR_REQUIRED", payload: { seat: seatIndex, cardValue: card.value } });
    return { ok: true, state: next, events };
  }

  events.push(...resolvePostPlay(next, card, seatIndex));
  return { ok: true, state: next, events };
}

function applyWildColorChoice(state, seatIndex, color) {
  if (!COLORS.includes(color)) {
    return { ok: false, reason: "INVALID_COLOR", state, events: [] };
  }
  if (!state.awaitingWildColor) {
    return { ok: false, reason: "NO_WILD_PENDING", state, events: [] };
  }
  if (state.awaitingWildColor.seat !== seatIndex) {
    return { ok: false, reason: "NOT_PENDING_SEAT", state, events: [] };
  }

  const next = cloneState(state);
  const cardValue = next.awaitingWildColor.cardValue;
  const events = [{ type: "WILD_COLOR_CHOSEN", payload: { seat: seatIndex, color } }];
  next.pendingWildColor = color;
  next.awaitingWildColor = null;
  next.phase = "playing";

  if (cardValue === "wild4") {
    const penalizedSeat = nextSeatIndex(next, seatIndex, 1);
    let drew = 0;
    for (let i = 0; i < 4; i += 1) {
      if (!drawFromPile(next, 1)) {
        break;
      }
      const drawn = next.drawPile.pop();
      if (drawn) {
        next.hands[penalizedSeat].push(drawn.id);
        drew += 1;
      }
    }
    next.currentSeat = nextSeatIndex(next, seatIndex, 2);
    next.turn += 1;
    events.push({ type: "DRAW_PENALTY", payload: { seat: penalizedSeat, amount: drew } });
  } else {
    next.currentSeat = nextSeatIndex(next, seatIndex, 1);
    next.turn += 1;
  }

  return { ok: true, state: next, events };
}

function applyDraw(state, seatIndex) {
  if (state.phase !== "playing") {
    return { ok: false, reason: "NOT_PLAYING_PHASE", state, events: [] };
  }
  if (state.currentSeat !== seatIndex) {
    return { ok: false, reason: "NOT_YOUR_TURN", state, events: [] };
  }
  if (state.awaitingWildColor) {
    return { ok: false, reason: "AWAITING_WILD_COLOR", state, events: [] };
  }
  if (legalPlays(state, seatIndex).length > 0) {
    return { ok: false, reason: "DRAW_NOT_ALLOWED", state, events: [] };
  }
  if (state.mustPlayDrawnCardBySeat[seatIndex]) {
    return { ok: false, reason: "MUST_RESOLVE_DRAWN_CARD", state, events: [] };
  }

  const next = cloneState(state);
  if (!drawFromPile(next, 1)) {
    return { ok: false, reason: "DEADLOCK", state, events: [] };
  }

  const card = next.drawPile.pop();
  if (!card) {
    return { ok: false, reason: "DRAW_FAILED", state, events: [] };
  }

  next.hands[seatIndex].push(card.id);
  next.lastActorSeat = seatIndex;
  const events = [{ type: "DRAWN", payload: { seat: seatIndex, cardId: card.id } }];

  const canPlay = isCardPlayable(next, seatIndex, card);
  if (canPlay) {
    next.mustPlayDrawnCardBySeat[seatIndex] = card.id;
    events.push({ type: "DRAWN_CARD_PLAYABLE", payload: { seat: seatIndex, cardId: card.id } });
  } else {
    next.currentSeat = nextSeatIndex(next, seatIndex, 1);
    next.turn += 1;
    events.push({ type: "TURN_PASSED", payload: { from: seatIndex, to: next.currentSeat } });
  }

  return { ok: true, state: next, events };
}

function applyPass(state, seatIndex) {
  if (state.phase !== "playing") {
    return { ok: false, reason: "NOT_PLAYING_PHASE", state, events: [] };
  }
  if (state.currentSeat !== seatIndex) {
    return { ok: false, reason: "NOT_YOUR_TURN", state, events: [] };
  }

  const mustPlay = state.mustPlayDrawnCardBySeat[seatIndex];
  if (!mustPlay) {
    return { ok: false, reason: "PASS_NOT_ALLOWED", state, events: [] };
  }

  const next = cloneState(state);
  delete next.mustPlayDrawnCardBySeat[seatIndex];
  next.currentSeat = nextSeatIndex(next, seatIndex, 1);
  next.turn += 1;
  return {
    ok: true,
    state: next,
    events: [{ type: "TURN_PASSED", payload: { from: seatIndex, to: next.currentSeat } }]
  };
}

function toPublicState(state) {
  const top = topDiscard(state);
  return {
    phase: state.phase,
    currentSeat: state.currentSeat,
    direction: state.direction,
    pendingWildColor: state.pendingWildColor,
    awaitingWildColor: state.awaitingWildColor,
    roundWinner: state.roundWinner,
    turn: state.turn,
    topCardLabel: cardLabel(top),
    handCounts: state.hands.map((hand) => hand.length),
    drawCount: state.drawPile.length,
    mustPlayDrawnCardBySeat: { ...state.mustPlayDrawnCardBySeat }
  };
}

export {
  COLORS,
  HAND_SIZE,
  MIN_AI_OPPONENTS,
  MAX_AI_OPPONENTS,
  cardById,
  cardLabel,
  createInitialState,
  effectiveColor,
  legalPlays,
  applyPlay,
  applyDraw,
  applyPass,
  applyWildColorChoice,
  toPublicState
};
