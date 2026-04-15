"use strict";

function notImplementedResult(name) {
  return {
    ok: false,
    reason: "NOT_IMPLEMENTED",
    operation: name,
  };
}

function createInitialState() {
  return notImplementedResult("createInitialState");
}

function shuffleDeck() {
  return notImplementedResult("shuffleDeck");
}

function legalPlays() {
  return notImplementedResult("legalPlays");
}

function applyPlay() {
  return notImplementedResult("applyPlay");
}

function applyDraw() {
  return notImplementedResult("applyDraw");
}

function applyWildColorChoice() {
  return notImplementedResult("applyWildColorChoice");
}

const engine = {
  createInitialState,
  shuffleDeck,
  legalPlays,
  applyPlay,
  applyDraw,
  applyWildColorChoice,
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = engine;
}

if (typeof window !== "undefined") {
  window.CincoUnoEngine = engine;
}
