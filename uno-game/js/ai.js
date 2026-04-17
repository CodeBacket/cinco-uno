import { COLORS, cardById, effectiveColor, legalPlays } from "./engine.js";

const COLOR_TIE_BREAK = ["red", "yellow", "green", "blue"];

function nuisanceRank(card) {
  if (card.value === "draw2") {
    return 0;
  }
  if (card.value === "skip") {
    return 1;
  }
  if (card.value === "reverse") {
    return 2;
  }
  if (typeof card.value === "number") {
    return 3;
  }
  return 4;
}

function sortedById(state, cardIds) {
  return [...cardIds].sort((leftId, rightId) => leftId - rightId);
}

function chooseWildColorFromHand(state, seatIndex) {
  const hand = state.hands[seatIndex] || [];
  const counts = { red: 0, yellow: 0, green: 0, blue: 0 };
  for (const cardId of hand) {
    const card = cardById(state, cardId);
    if (card && COLORS.includes(card.color)) {
      counts[card.color] += 1;
    }
  }

  let bestColor = COLOR_TIE_BREAK[0];
  let bestCount = counts[bestColor];
  for (const color of COLOR_TIE_BREAK.slice(1)) {
    if (counts[color] > bestCount) {
      bestColor = color;
      bestCount = counts[color];
    }
  }
  return bestColor;
}

function choosePlayableCard(state, seatIndex, legalIds) {
  const sortedLegal = sortedById(state, legalIds);
  const legalCards = sortedLegal.map((cardId) => ({ cardId, card: cardById(state, cardId) })).filter((entry) => Boolean(entry.card));
  const effective = effectiveColor(state);

  const nonWild = legalCards.filter((entry) => entry.card.color !== "wild");
  const sameColor = nonWild.filter((entry) => effective && entry.card.color === effective);

  if (sameColor.length > 0) {
    sameColor.sort((left, right) => nuisanceRank(left.card) - nuisanceRank(right.card));
    return sameColor[0].cardId;
  }

  if (nonWild.length > 0) {
    nonWild.sort((left, right) => nuisanceRank(left.card) - nuisanceRank(right.card));
    return nonWild[0].cardId;
  }

  const wild4 = legalCards.find((entry) => entry.card.value === "wild4");
  if (wild4) {
    return wild4.cardId;
  }

  return legalCards[0]?.cardId ?? null;
}

function chooseAiMove(state, seatIndex) {
  if (state.awaitingWildColor && state.awaitingWildColor.seat === seatIndex) {
    return {
      type: "chooseColor",
      color: chooseWildColorFromHand(state, seatIndex)
    };
  }

  const mustPlayDrawnCard = state.mustPlayDrawnCardBySeat[seatIndex];
  if (mustPlayDrawnCard) {
    return { type: "play", cardId: mustPlayDrawnCard };
  }

  const legal = legalPlays(state, seatIndex);
  if (legal.length === 0) {
    return { type: "draw" };
  }

  const cardId = choosePlayableCard(state, seatIndex, legal);
  if (!cardId) {
    return { type: "draw" };
  }

  return { type: "play", cardId };
}

export { chooseAiMove, chooseWildColorFromHand };
