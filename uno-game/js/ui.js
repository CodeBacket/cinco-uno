'use strict';

/**
 * Placeholder UI binding module.
 * Plan 02 and plan 04 will wire rendering and event handlers.
 */
function renderState(state) {
  return state;
}

function announce(message) {
  if (typeof message !== 'string') {
    return;
  }

  if (typeof document === 'undefined') {
    return;
  }

  var announcer = document.getElementById('announcer');
  if (announcer) {
    announcer.textContent = message;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    renderState,
    announce,
  };
}
