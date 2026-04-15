"use strict";

function renderState(state) {
  return state;
}

function announce(message) {
  if (typeof document === "undefined") {
    return;
  }

  const announcer = document.getElementById("announcer");
  if (announcer) {
    announcer.textContent = message;
  }
}

const uiApi = {
  renderState,
  announce,
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = uiApi;
}

if (typeof window !== "undefined") {
  window.UnoUi = uiApi;
}
