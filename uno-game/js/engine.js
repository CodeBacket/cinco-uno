"use strict";

let stateApi = typeof globalThis !== "undefined" && globalThis.CincoUno
  ? globalThis.CincoUno.state
  : null;

if (!stateApi && typeof require === "function") {
  stateApi = require("./state");
}

const fallbackEventTypes = Object.freeze({ ERROR: "ERROR" });
const eventTypes = stateApi && stateApi.EVENT_TYPES ? stateApi.EVENT_TYPES : fallbackEventTypes;

function applyIntent(state, intent) {
  return {
    ok: false,
    state,
    events: [
      {
        type: eventTypes.ERROR,
        payload: {
          reason: "ENGINE_NOT_IMPLEMENTED",
          intent: intent ? intent.type : "UNKNOWN",
        },
      },
    ],
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    applyIntent,
  };
}

if (typeof window !== "undefined") {
  window.CincoUno = window.CincoUno || {};
  window.CincoUno.engine = {
    applyIntent,
  };
}
