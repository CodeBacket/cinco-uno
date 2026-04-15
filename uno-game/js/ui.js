"use strict";

function renderState() {
  return {
    ok: false,
    reason: "NOT_IMPLEMENTED",
  };
}

function bindUi() {
  return {
    ok: false,
    reason: "NOT_IMPLEMENTED",
  };
}

const ui = {
  renderState,
  bindUi,
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = ui;
}

if (typeof window !== "undefined") {
  window.CincoUnoUi = ui;
}
