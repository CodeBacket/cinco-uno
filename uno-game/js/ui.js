"use strict";

function render() {
  throw new Error("render is not implemented yet. See docs/02-ui-html-css.plan.md.");
}

const uiApi = Object.freeze({
  render
});

if (typeof module !== "undefined" && module.exports) {
  module.exports = uiApi;
}

if (typeof window !== "undefined") {
  window.CincoUnoUI = uiApi;
}
