'use strict';

/**
 * Placeholder module for pure UNO rule transitions.
 * Core engine behavior is implemented in plan 03.
 */
function notImplemented(functionName) {
  return {
    ok: false,
    reason: functionName + ' is not implemented yet.',
  };
}

function createInitialState() {
  return notImplemented('createInitialState');
}

function legalPlays() {
  return [];
}

function applyPlay() {
  return notImplemented('applyPlay');
}

function applyDraw() {
  return notImplemented('applyDraw');
}

function applyWildColorChoice() {
  return notImplemented('applyWildColorChoice');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createInitialState,
    legalPlays,
    applyPlay,
    applyDraw,
    applyWildColorChoice,
  };
}
