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
  setLastRoundColor,
} from "../store/actions";
import "./css/basic.css";
import "./css/interface.css";

class Interface extends Component {
  state = {
    firstCard: null,
    secondCard: null,
    comparison: null,
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.saveInLocalStorage();
    }

    if (
      prevProps.shown.length !== this.props.shown.length &&
      !this.props.reset &&
      this.props.hiddenCard
    ) {
      this.props.startComparing(true);
    }

    if (
      prevProps.allCoins !== this.props.allCoins &&
      this.props.allCoins === 0
    ) {
      this.resetGame();
    }

    if (prevProps.comparing !== this.props.comparing && this.props.comparing) {
      this.comparingFunction();
    }
  }

  comparingFunction() {
    let shownCards = this.props.shown;
    let number1 = shownCards[shownCards.length - 1].number;
    let number2 = shownCards[shownCards.length - 2].number;
    let { comparison } = this.state;
    if (comparison === "smaller" && this.props.comparing) {
      +number1 < +number2 ? this.onSuccess() : this.onFailure();
    }
    if (comparison === "bigger" && this.props.comparing) {
      +number1 > +number2 ? this.onSuccess() : this.onFailure();
    }
    this.setState({ comparison: null });
  }

  isItSmaller = () => {
    this.setState(
      {
        comparison: "smaller",
      },
      () => {
        this.props.showHiddenCard(true);
      }
    );
  };

  isItBigger = () => {
    this.setState(
      {
        comparison: "bigger",
      },
      () => {
        this.props.showHiddenCard(true);
      }
    );
  };

  onSuccess = () => {
    let relationToPrevious = null;
    this.state.comparison === "bigger"
      ? (relationToPrevious = "smallerThanComparedCard")
      : (relationToPrevious = "biggerThanComparedCard");
    let oldCardObject = this.props.shown[this.props.shown.length - 2];
    let isItSmallerProp = { biggerOrSmaller: relationToPrevious };
    let newGuessedObject = { ...oldCardObject, ...isItSmallerProp };
    this.props.changeEarnedCoins(this.props.earnedCoins + this.props.betCoins);
    this.props.setSuccessBoolean(true);
    setTimeout(() => {
      this.props.moveToGuessed(newGuessedObject);
    }, 1500);
    setTimeout(() => {
      this.props.hiddenCard === true && this.props.showHiddenCard(false);
      this.props.startComparing(false);
    }, 2500);
  };

  onFailure = () => {
    setTimeout(() => {
      this.resetCards();
      this.props.setSuccessBoolean(false);
      this.props.changeAllCoins(this.props.allCoins - this.props.betCoins);
      this.props.changeEarnedCoins(Number(0));
      this.props.showHiddenCard(false);
      this.emptyLocalStorage();
      this.props.betCoins > this.props.allCoins &&
        this.props.changeBetCoins(this.props.allCoins);
      localStorage.setItem("lasRoundColor-cardsBet", "red");
      this.props.setLastRoundColor("red");
      this.props.resetGame(true);
    }, 300);
    setTimeout(() => {
      this.props.startComparing(false);
    }, 1000);
  };

  newGame = () => {
    this.props.showHiddenCard(false);
    this.props.startComparing(false);
    this.props.changeAllCoins(this.props.allCoins + this.props.earnedCoins);
    this.props.changeEarnedCoins(Number(0));
    this.emptyLocalStorage();
    localStorage.setItem("lasRoundColor-cardsBet", "green");
    this.props.setLastRoundColor("green");
    this.props.resetGame(true);
    this.resetCards();
  };

  resetGame = () => {
    this.resetCards();
    this.props.startComparing(false);
    this.props.resetGame(true);
    this.emptyLocalStorage();
    this.props.showHiddenCard(false);
    this.props.changeAllCoins(100);
    this.props.changeBetCoins(10);
    this.props.changeEarnedCoins(0);
    this.props.changeBetCoins(10);
    this.props.setLastRoundColor("gray");
  };

  resetCards = () => {
    this.props.resetNotShownCards();
    this.props.resetShownCards();
    this.props.resetGuessedCards();
    this.props.resetImported();
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
            <i
              className="fa fa-angle-down"
              onClick={
                !this.props.reset && this.props.comparing
                  ? null
                  : this.isItSmaller
              }
            ></i>
            <i
              className="fa fa-angle-up"
              onClick={
                !this.props.reset && this.props.comparing
                  ? null
                  : this.isItBigger
              }
            ></i>
          </div>
          <div className="newPlays">
            <button
              onClick={this.newGame}
              disabled={this.props.earnedCoins === 0 && true}
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
            <span>Earned coins:</span>
            <span className="earned">{this.props.earnedCoins}</span>
          </div>
          <span>Coins to bet</span>
          <div>
            <input
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                this.props.changeBetCoins(+value);
                e.target.value > this.props.allCoins &&
                  this.props.changeBetCoins(this.props.allCoins);
              }}
              value={this.props.betCoins}
              type="number"
              min={1}
              max={this.props.allCoins}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  allCoins,
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
  reset,
}) => ({
  allCoins,
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
  reset,
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
  setLastRoundColor,
};

export default connect(mapStateToProps, mapDispatchToProps)(Interface);
