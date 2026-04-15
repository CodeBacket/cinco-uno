"use strict";

let stateApi = typeof globalThis !== "undefined" && globalThis.CincoUno
  ? globalThis.CincoUno.state
  : null;
let engineApi = typeof globalThis !== "undefined" && globalThis.CincoUno
  ? globalThis.CincoUno.engine
  : null;

if ((!stateApi || !engineApi) && typeof require === "function") {
  stateApi = stateApi || require("./state");
  engineApi = engineApi || require("./engine");
}

function bootstrapGame(aiOpponentCount = stateApi.MIN_AI_OPPONENTS) {
  const state = stateApi.createInitialState(aiOpponentCount);
  return engineApi.applyIntent(state, { type: "BOOTSTRAP" });
}

if (typeof window !== "undefined") {
  window.CincoUno = window.CincoUno || {};
  window.CincoUno.bootstrapGame = bootstrapGame;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    bootstrapGame,
  };
}
