"use strict";

function notImplemented(name) {
  throw new Error(`${name} is not implemented yet. See docs/03-core-engine-and-turn-loop.plan.md.`);
}

const engineApi = Object.freeze({
  createInitialState() {
    return notImplemented("createInitialState");
  },
  legalPlays() {
    return notImplemented("legalPlays");
  },
  applyPlay() {
    return notImplemented("applyPlay");
  },
  applyDraw() {
    return notImplemented("applyDraw");
  },
  applyWildColorChoice() {
    return notImplemented("applyWildColorChoice");
  }
});

if (typeof module !== "undefined" && module.exports) {
  module.exports = engineApi;
}

if (typeof window !== "undefined") {
  window.CincoUnoEngine = engineApi;
}
