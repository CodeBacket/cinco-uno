"use strict";

function renderState() {
  // UI rendering is introduced in plan 02+.
}

function announce() {
  // Event announcements are introduced when controller wiring lands.
}

const uiApi = {
  renderState,
  announce,
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = uiApi;
} else if (typeof window !== "undefined") {
  window.UnoUi = uiApi;
}
