import { AllCards } from "./AllCards";

const initialState = {
  cards: AllCards,
  notShown: JSON.parse(localStorage.getItem("notShown-cardsBet")) || AllCards,
  shown: JSON.parse(localStorage.getItem("shown-cardsBet")) || [],
  allCoins: Number(localStorage.getItem("allCoins-cardsBet")) || 100,
  betCoins: Number(localStorage.getItem("betCoins-cardsBet")) || 10,
  earnedCoins: Number(localStorage.getItem("earnedCoins-cardsBet")) || 0,
  start: true,
  firstStart: false,
  success: false,
  hiddenCard: false,
  comparing: false,
  reset: false,
  guessedCards: JSON.parse(localStorage.getItem("guessed-cardsBet")) || [],
  importedImages: [],
  lastGuessed: null,
  firstCardIsHidden: false,
  lastRoundColor: localStorage.getItem("lasRoundColor-cardsBet") || "gray",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    // CARDS ARRAYS
    case "FILTER_UNSHOWN":
      const notShown = state.notShown.filter((ob) => ob.id !== action.toRemove);
      return { ...state, notShown };
    case "SET_SHOWN":
      return { ...state, shown: [...state.shown, action.toShown] };
    case "RESET_UNSHOWN":
      return { ...state, notShown: state.cards };
    case "RESET_SHOWN":
      return { ...state, shown: [] };
    case "SET_GUESSED":
      return {
        ...state,
        guessedCards: [...state.guessedCards, action.toGuessed],
      };
    case "RESET_GUESSED":
      return { ...state, guessedCards: [] };

    // IMAGES
    case "SET_IMPORTED":
      return {
        ...state,
        importedImages: [...state.importedImages, action.toImported],
      };
    case "RESET_IMPORTED":
      return { ...state, importedImages: [] };
    case "SET_LASTGUESSED":
      return { ...state, lastGuessed: action.toLastGuessed };

    //COINS AMOUNTS
    case "SET_ALL_COINS":
      return { ...state, allCoins: action.toAllCoins };
    case "SET_BET_COINS":
      return { ...state, betCoins: action.toBetCoins };
    case "SET_EARNED_COINS":
      return { ...state, earnedCoins: action.toEarnedCoins };

    //START BOOLEANS
    case "SET_START":
      return { ...state, start: action.startChange };
    case "FIRST_START":
      return { ...state, firstStart: action.fstart };
    case "SET_SUCCESS":
      return { ...state, success: action.successChange };
    case "SET_RESET":
      return { ...state, reset: action.reseted };
    case "SHOW_CARD":
      return { ...state, hiddenCard: action.changeHidden };
    case "START_COMPARING":
      return { ...state, comparing: action.compare };
    case "SET_COMPARATION":
      return { ...state, comparation: action.comparationType };
    case "SET_FIRSTCARD_HIDDEN":
      return {
        ...state,
        firstCardIsHidden: action.firsCardHide,
      };

    // ROUNDS NUMBER
    case "SET_ROUND_COLOR":
      return { ...state, lastRoundColor: action.toColor };
    default:
      return state;
  }
};
