const allCards = [
  { number: 14, sign: "clubs", shown: false, id: 52 },
  { number: 14, sign: "diamonds", shown: false, id: 51 },
  { number: 14, sign: "hearts", shown: false, id: 50 },
  { number: 14, sign: "spades", shown: false, id: 49 },
  { number: 13, sign: "clubs", shown: false, id: 48 },
  { number: 13, sign: "diamonds", shown: false, id: 47 },
  { number: 13, sign: "hearts", shown: false, id: 46 },
  { number: 13, sign: "spades", shown: false, id: 45 },
  { number: 12, sign: "clubs", shown: false, id: 44 },
  { number: 12, sign: "diamonds", shown: false, id: 43 },
  { number: 12, sign: "hearts", shown: false, id: 42 },
  { number: 12, sign: "spades", shown: false, id: 41 },
  { number: 10, sign: "clubs", shown: false, id: 40 },
  { number: 10, sign: "diamonds", shown: false, id: 39 },
  { number: 10, sign: "hearts", shown: false, id: 38 },
  { number: 10, sign: "spades", shown: false, id: 37 },
  { number: 9, sign: "clubs", shown: false, id: 36 },
  { number: 9, sign: "diamonds", shown: false, id: 35 },
  { number: 9, sign: "hearts", shown: false, id: 34 },
  { number: 9, sign: "spades", shown: false, id: 33 },
  { number: 8, sign: "clubs", shown: false, id: 32 },
  { number: 8, sign: "diamonds", shown: false, id: 31 },
  { number: 8, sign: "hearts", shown: false, id: 30 },
  { number: 8, sign: "spades", shown: false, id: 29 },
  { number: 7, sign: "clubs", shown: false, id: 28 },
  { number: 7, sign: "diamonds", shown: false, id: 27 },
  { number: 7, sign: "hearts", shown: false, id: 26 },
  { number: 7, sign: "spades", shown: false, id: 25 },
  { number: 6, sign: "clubs", shown: false, id: 24 },
  { number: 6, sign: "diamonds", shown: false, id: 23 },
  { number: 6, sign: "hearts", shown: false, id: 22 },
  { number: 6, sign: "spades", shown: false, id: 21 },
  { number: 5, sign: "clubs", shown: false, id: 20 },
  { number: 5, sign: "diamonds", shown: false, id: 19 },
  { number: 5, sign: "hearts", shown: false, id: 18 },
  { number: 5, sign: "spades", shown: false, id: 17 },
  { number: 4, sign: "clubs", shown: false, id: 16 },
  { number: 4, sign: "diamonds", shown: false, id: 15 },
  { number: 4, sign: "hearts", shown: false, id: 14 },
  { number: 4, sign: "spades", shown: false, id: 13 },
  { number: 3, sign: "clubs", shown: false, id: 12 },
  { number: 3, sign: "diamonds", shown: false, id: 11 },
  { number: 3, sign: "hearts", shown: false, id: 10 },
  { number: 3, sign: "spades", shown: false, id: 9 },
  { number: 2, sign: "clubs", shown: false, id: 8 },
  { number: 2, sign: "diamonds", shown: false, id: 7 },
  { number: 2, sign: "hearts", shown: false, id: 6 },
  { number: 2, sign: "spades", shown: false, id: 5 },
  { number: 1, sign: "clubs", shown: false, id: 4 },
  { number: 1, sign: "diamonds", shown: false, id: 3 },
  { number: 1, sign: "hearts", shown: false, id: 2 },
  { number: 1, sign: "spades", shown: false, id: 1 },
];

const initialState = {
  cards: allCards,
  notShown: JSON.parse(localStorage.getItem("notShown-cardsBet")) || allCards,
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
