// CARDS ARRAYS
export const excludeCurrent = (toRemove) => ({
  type: "FILTER_UNSHOWN",
  toRemove,
});

export const moveToShown = (toShown) => ({
  type: "SET_SHOWN",
  toShown,
});

export const resetNotShownCards = () => ({
  type: "RESET_UNSHOWN",
});

export const resetShownCards = () => ({
  type: "RESET_SHOWN",
});

export const moveToGuessed = (toGuessed) => ({
  type: "SET_GUESSED",
  toGuessed,
});

export const resetGuessedCards = () => ({
  type: "RESET_GUESSED",
});

// IMAGE ACTIONS
export const moveToImported = (toImported) => ({
  type: "SET_IMPORTED",
  toImported,
});

export const resetImported = () => ({
  type: "RESET_IMPORTED",
});

export const moveToLastGuessed = (toLastGuessed) => ({
  type: "SET_LASTGUESSED",
  toLastGuessed,
});

// COINS ACTIONS
export const changeAllCoins = (toAllCoins) => ({
  type: "SET_ALL_COINS",
  toAllCoins,
});

export const changeBetCoins = (toBetCoins) => ({
  type: "SET_BET_COINS",
  toBetCoins,
});

export const changeEarnedCoins = (toEarnedCoins) => ({
  type: "SET_EARNED_COINS",
  toEarnedCoins,
});

// START BOOLEANS
export const setStartBoolean = (startChange) => ({
  type: "SET_START",
  startChange,
});

export const firstStartChange = (fstart) => ({
  type: "FIRST_START",
  fstart,
});

export const setSuccessBoolean = (successChange) => ({
  type: "SET_SUCCESS",
  successChange,
});

export const resetGame = (reseted) => ({
  type: "SET_RESET",
  reseted,
});

export const showHiddenCard = (changeHidden) => ({
  type: "SHOW_CARD",
  changeHidden,
});

export const startComparing = (compare) => ({
  type: "START_COMPARING",
  compare,
});

export const changeComparation = (coparationType) => ({
  type: "SET_COMPARATION",
  coparationType,
});

export const hideFirstCard = (firsCardHide) => ({
  type: "SET_FIRSTCARD_HIDDEN",
  firsCardHide,
});

// ROUNDS
export const setLastRoundColor = (toColor) => ({
  type: "SET_ROUND_COLOR",
  toColor,
});
