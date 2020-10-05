import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setStartBoolean,
  setSuccessBoolean,
  resetGame,
  resetNotShownCards,
  resetShownCards,
  resetGuessedCards,
  showHiddenCard,
  startComparing,
  changeComparation,
  moveToGuessed,
  changeAllCoins,
  changeBetCoins,
  changeEarnedCoins,
  resetImported,
  firstStartChange,
  hideFirstCard,
  setLastRound,
  setLastRoundColor,
} from "../store/actions";
import "./css/home.css";
import "./css/interface.css";

class Interface extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  state = {
    firstCard: null,
    secondCard: null,
    comparation: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.saveInLocalStorage();
    }

    if (prevProps.shown.length !== this.props.shown.length) {
      this.props.hiddenCard && this.props.startComparing(true);
    }

    if (prevProps.comparing !== this.props.comparing) {
      this.props.comparing && this.comparingFunction();
    }
  }

  comparingFunction() {
    let swownCards = this.props.shown;
    let number1 = swownCards[swownCards.length - 1].number;
    let number2 = swownCards[swownCards.length - 2].number;
    let comparationState = this.state.comparation;
    if (comparationState === "smaller" && this.props.comparing) {
      +number1 < +number2 ? this.onSuccess() : this.onFailure();
    }
    if (comparationState === "bigger" && this.props.comparing) {
      +number1 > +number2 ? this.onSuccess() : this.onFailure();
    }
    this.setState({ comparation: null });
  }

  startBetting = () => {
    this.props.setStartBoolean(true);
  };

  isItSmaller = () => {
    this.setState(
      {
        comparation: "smaller",
      },
      () => {
        this.props.showHiddenCard(true);
      }
    );
  };

  isItBigger = () => {
    this.setState(
      {
        comparation: "bigger",
      },
      () => {
        this.props.showHiddenCard(true);
      }
    );
    this.props.changeComparation("bigger");
  };

  onSuccess = () => {
    setTimeout(() => {
      this.props.hiddenCard === true && this.props.showHiddenCard(false);
      this.props.startComparing(false);
      this.props.moveToGuessed(newGuessedObject);

      this.props.hideFirstCard(false);
    }, 2000);
    setTimeout(() => {
      this.props.hideFirstCard(true);
    }, 1500);
    setTimeout(() => {
      this.props.hideFirstCard(false);
    }, 2500);
    let relationToPrevious = null;
    this.state.comparation === "bigger"
      ? (relationToPrevious = "smallerThanComparedCard")
      : (relationToPrevious = "biggerThanComparedCard");
    let oldCardObject = this.props.shown[this.props.shown.length - 2];
    let isItSmallerProp = { biggerOrSmaller: relationToPrevious };
    let newGuessedObject = { ...oldCardObject, ...isItSmallerProp };
    this.props.changeEarnedCoins(this.props.earnedCoins + this.props.betCoins);
    this.props.notShown.length === 0 && this.onEnd();
    this.props.setSuccessBoolean(true);
  };

  onFailure = () => {
    setTimeout(() => {
      this.startBetting();
      this.props.resetGame(true);
    }, 2000);
    setTimeout(() => {
      this.props.setSuccessBoolean(false);

      this.props.changeAllCoins(this.props.allCoins - this.props.betCoins);
      this.props.showHiddenCard(false);
      this.resetCards();
      this.props.startComparing(false);
      this.emptyLocalStorage();
      this.props.changeEarnedCoins(Number(0));
      this.props.betCoins > this.props.allCoins &&
        this.props.changeBetCoins(this.props.allCoins);
      this.props.allCoins >= 0 && this.lostAllCoins();
      this.props.setLastRound(false);
      localStorage.setItem("lasRoundColor-cardsBet", "red");
      localStorage.setItem("lasRoundText1-cardsBet", "Last round was");
      localStorage.setItem("lasRoundText2-cardsBet", "a failure");
      this.props.setLastRoundColor("red");
      this.props.hideFirstCard(true);
    }, 1500);
    setTimeout(() => {
      this.props.hideFirstCard(false);
    }, 3000);
  };

  onEnd = () => {
    alert("You opened all cards");
  };

  newGame = () => {
    this.startBetting();
    this.props.showHiddenCard(false);
    this.resetCards();
    this.props.startComparing(false);
    this.props.resetGame(true);
    this.props.changeAllCoins(this.props.allCoins + this.props.earnedCoins);
    this.props.changeEarnedCoins(Number(0));
    this.emptyLocalStorage();
    this.props.setLastRound(true);
    localStorage.setItem("lasRoundColor-cardsBet", "green");
    localStorage.setItem("lasRoundText1-cardsBet", "Last round was");
    localStorage.setItem("lasRoundText2-cardsBet", "successful");
    this.props.setLastRoundColor("green");
  };

  resetGame = () => {
    this.resetCards();
    this.startBetting();
    this.emptyLocalStorage();
    this.props.showHiddenCard(false);
    this.props.startComparing(false);
    this.props.resetGame(true);
    this.props.changeAllCoins(100);
    this.props.changeBetCoins(10);
    this.props.changeEarnedCoins(0);
    this.myRef.current.value = 10;
    this.props.setLastRoundColor("gray");
  };

  resetCards = () => {
    this.props.resetNotShownCards();
    this.props.resetShownCards();
    this.props.resetGuessedCards();
    this.props.resetImported();
  };

  lostAllCoins = () => {};

  setBetAmount = (e) => {
    this.props.changeBetCoins(+e.target.value);
  };

  saveInLocalStorage = () => {
    localStorage.setItem("allCoins-cardsBet", this.props.allCoins);
    localStorage.setItem("betCoins-cardsBet", this.props.betCoins);
    localStorage.setItem("earnedCoins-cardsBet", this.props.earnedCoins);
    localStorage.setItem("shown-cardsBet", JSON.stringify(this.props.shown));
    localStorage.setItem(
      "guessed-cardsBet",
      JSON.stringify(this.props.guessedCards)
    );
    localStorage.setItem(
      "notShown-cardsBet",
      JSON.stringify(this.props.notShown)
    );
  };

  emptyLocalStorage() {
    localStorage.removeItem("lasRoundColor-cardsBet");
    localStorage.removeItem("lasRoundText1-cardsBet");
    localStorage.removeItem("lasRoundText2-cardsBet");
    localStorage.removeItem("allCoins-cardsBet");
    localStorage.removeItem("betCoins-cardsBet");
    localStorage.removeItem("earnedCoins-cardsBet");
    localStorage.removeItem("shown-cardsBet");
    localStorage.removeItem("notShown-cardsBet");
    localStorage.removeItem("guessed-cardsBet");
    localStorage.removeItem("card-cardsBet");
  }

  render() {
    return (
      <div className="interfaceDiv">
        <div className="gameControls"></div>
        <div className="interfaceButtons">
          <div className="startButtons">
            <i className="fa fa-angle-down" onClick={this.isItSmaller}></i>
            <i className="fa fa-angle-up" onClick={this.isItBigger}></i>
          </div>
          <div className="newPlays">
            <button
              onClick={this.newGame}
              disabled={this.props.earnedCoins == 0 && true}
            >
              New round
            </button>
            <button onClick={this.resetGame}>Reset game</button>
          </div>
        </div>
        <div className="coinsDdisplays">
          <div>
            All coins:<span className="allCoins">{this.props.allCoins}</span>
          </div>
          <div>
            <span>Earned coins</span>
            <span className="earned">{this.props.earnedCoins}</span>
          </div>
          <span>Coins to bet</span>
          <div>
            <input
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                this.props.changeBetCoins(value);
                e.target.value > this.props.allCoins &&
                  this.props.changeBetCoins(this.props.allCoins);
              }}
              ref={this.myRef}
              value={this.props.betCoins}
              type="number"
              onBlur={this.setBetAmount}
              min={1}
              max={this.props.allCoins}
              onKeyPress={(event) => {
                return (
                  event.keyCode === 8 ||
                  (event.charCode >= 48 && event.charCode <= 57)
                );
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  allCoins,
  start,
  success,
  notShown,
  shown,
  comparing,
  hiddenCard,
  betCoins,
  earnedCoins,
  guessedCards,
  firstStart,
  lastRound,
}) => ({
  allCoins,
  start,
  success,
  notShown,
  shown,
  comparing,
  hiddenCard,
  betCoins,
  earnedCoins,
  guessedCards,
  firstStart,
  lastRound,
});
const mapDispatchToProps = {
  setStartBoolean,
  setSuccessBoolean,
  resetGame,
  resetNotShownCards,
  resetShownCards,
  resetGuessedCards,
  showHiddenCard,
  startComparing,
  changeComparation,
  moveToGuessed,
  changeAllCoins,
  changeBetCoins,
  changeEarnedCoins,
  resetImported,
  firstStartChange,
  hideFirstCard,
  setLastRound,
  setLastRoundColor,
};

export default connect(mapStateToProps, mapDispatchToProps)(Interface);
