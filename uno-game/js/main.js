"use strict";

const { GAME_PHASES } = require("./state.js");
const { createEngine } = require("./engine.js");
const { createUi } = require("./ui.js");
const { createAi } = require("./ai.js");

function bootstrap() {
  // Phase 01 scope is limited to wiring module boundaries.
  return {
    phase: GAME_PHASES.MENU,
    engine: createEngine(),
    ui: createUi(),
    ai: createAi()
  };
}

module.exports = {
  bootstrap
};
