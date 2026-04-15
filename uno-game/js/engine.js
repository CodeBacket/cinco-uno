"use strict";

function notImplemented(name) {
  throw new Error(`${name} is not implemented in phase 01 scaffold.`);
}

const engineApi = {
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
  },
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = engineApi;
}

if (typeof window !== "undefined") {
  window.UnoEngine = engineApi;
}
