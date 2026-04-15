"use strict";

function notImplemented(methodName) {
  throw new Error(methodName + " is not implemented in phase 01 scaffold.");
}

function createInitialState() {
  return notImplemented("createInitialState");
}

function legalPlays() {
  return notImplemented("legalPlays");
}

function applyPlay() {
  return notImplemented("applyPlay");
}

function applyDraw() {
  return notImplemented("applyDraw");
}

function applyWildColorChoice() {
  return notImplemented("applyWildColorChoice");
}

const engineApi = {
  createInitialState,
  legalPlays,
  applyPlay,
  applyDraw,
  applyWildColorChoice,
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = engineApi;
} else if (typeof window !== "undefined") {
  window.UnoEngine = engineApi;
}
