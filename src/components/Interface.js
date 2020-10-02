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
} from "../store/actions";
import "./css/random.css";

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

    if (prevState.shown !== this.props.shown) {
      console.log("shown", this.props.shown.length);
      this.props.shown.length % 2 == 0 &&
        this.props.hiddenCard &&
        this.props.startComparing(true);
    }

    if (prevProps.comparing !== this.props.comparing) {
      let swownCards = this.props.shown;
      if (this.state.comparation == "smaller" && this.props.comparing) {
        +swownCards[swownCards.length - 1].number <
        +swownCards[swownCards.length - 2].number
          ? this.onSuccess()
          : this.onFailure();
      }
      if (this.state.comparation == "bigger" && this.props.comparing) {
        +swownCards[swownCards.length - 1].number >
        +swownCards[swownCards.length - 2].number
          ? this.onSuccess()
          : this.onFailure();
      }
      this.setState({ comparation: null });
      // this.props.changeComparation(null);
    }
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
    // if (this.props.notShown.length > 0) {
    setTimeout(() => {
      this.props.hiddenCard == true && this.props.showHiddenCard(false);
      this.props.startComparing(false);
      this.props.setSuccessBoolean(true);
    }, 2000);
    let oldCardObject = this.props.shown[this.props.shown.length - 1];
    let isItSmallerProp = { biggerOrSmaller: this.state.comparation };
    let newGuessedObject = { ...oldCardObject, ...isItSmallerProp };
    this.props.moveToGuessed(newGuessedObject);
    this.props.changeEarnedCoins(this.props.earnedCoins + this.props.betCoins);
    // } else {
    this.onEnd();
    // }
  };

  onFailure = () => {
    setTimeout(() => {
      this.props.setSuccessBoolean(false);
      this.props.changeAllCoins(this.props.allCoins - this.props.betCoins);
      this.startBetting();
      this.props.showHiddenCard(false);
      this.resetCards();
      this.props.startComparing(false);
      this.props.resetGame(true);
      this.props.changeEarnedCoins(Number(0));
      this.emptyLocalStorage();
    }, 2000);
  };

  onEnd = () => {
    this.props.notShown.length == 0 && alert("s");
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
  };

  resetGame = () => {
    this.resetCards();
    this.startBetting();
    this.props.showHiddenCard(false);
    this.props.startComparing(false);
    this.props.resetGame(true);
    this.props.changeAllCoins(100);
    this.props.changeBetCoins(10);
    this.myRef.current.value = 10;
    this.emptyLocalStorage();
  };

  resetCards = () => {
    this.props.resetNotShownCards();
    this.props.resetShownCards();
    this.props.resetGuessedCards();
    this.props.resetImported();
  };

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
      <div>
        <button onClick={this.newGame}>New round</button>
        <button onClick={this.resetGame}>Reset game</button>
        <button onClick={this.isItSmaller}>Lower</button>
        <button onClick={this.isItBigger}>Higher</button>
        <div className="text-left randomDetails">
          All coins:{this.props.allCoins}
        </div>
        <div>
          <span>Earned coins</span>
          <span>{this.props.earnedCoins}</span>
        </div>
        <span>Coins to bet</span>
        <div>
          <input
            ref={this.myRef}
            defaultValue={this.props.betCoins}
            type="number"
            onBlur={this.setBetAmount}
            onKeyPress={(event) => {
              return (
                event.keyCode === 8 ||
                (event.charCode >= 48 && event.charCode <= 57)
              );
            }}
          />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Interface);
