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

// export const clickItem = (selected) => (dispatch) => {
//   dispatch(selectItem(selected));
// };
