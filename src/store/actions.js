// CARDS ARRAYS
export const excludeCurrent = (toRemove) => {
  return {
    type: "FILTER_UNSHOWN",
    toRemove,
  };
};

export const moveToShown = (toShown) => {
  return {
    type: "SET_SHOWN",
    toShown,
  };
};

export const resetNotShownCards = () => {
  return {
    type: "RESET_UNSHOWN",
  };
};

export const resetShownCards = () => {
  return {
    type: "RESET_SHOWN",
  };
};

export const moveToGuessed = (toGuessed) => {
  return {
    type: "SET_GUESSED",
    toGuessed,
  };
};

export const resetGuessedCards = () => {
  return {
    type: "RESET_GUESSED",
  };
};

// IMAGE ACTIONS
export const moveToImported = (toImported) => {
  return {
    type: "SET_IMPORTED",
    toImported,
  };
};

export const resetImported = () => {
  return {
    type: "RESET_IMPORTED",
  };
};

export const moveToLastGuessed = (toLastGuessed) => {
  return {
    type: "SET_LASTGUESSED",
    toLastGuessed,
  };
};

// COINS ACTIONS
export const changeAllCoins = (toAllCoins) => {
  return {
    type: "SET_ALL_COINS",
    toAllCoins,
  };
};

export const changeBetCoins = (toBetCoins) => {
  return {
    type: "SET_BET_COINS",
    toBetCoins,
  };
};

export const changeEarnedCoins = (toEarnedCoins) => {
  return {
    type: "SET_EARNED_COINS",
    toEarnedCoins,
  };
};

// START BOOLEANS
export const setStartBoolean = (startChange) => {
  return {
    type: "SET_START",
    startChange,
  };
};

export const firstStartChange = (fstart) => {
  return {
    type: "FIRST_START",
    fstart,
  };
};

export const setSuccessBoolean = (successChange) => {
  return {
    type: "SET_SUCCESS",
    successChange,
  };
};

export const resetGame = (reseted) => {
  return {
    type: "SET_RESET",
    reseted,
  };
};

export const showHiddenCard = (changeHidden) => {
  return {
    type: "SHOW_CARD",
    changeHidden,
  };
};

export const startComparing = (compare) => {
  return {
    type: "START_COMPARING",
    compare,
  };
};

export const changeComparation = (coparationType) => {
  return {
    type: "SET_COMPARATION",
    coparationType,
  };
};
