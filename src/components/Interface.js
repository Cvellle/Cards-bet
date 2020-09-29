import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setStartBoolean,
  setSuccessBoolean,
  resetGame,
  resetNotShownCards,
  resetShownCards,
  showHiddenCard,
  startComparing,
  moveToGuessed,
} from "../store/actions";
import "./css/random.css";

class Interface extends Component {
  state = {
    firstCard: null,
    secondCard: null,
    comparation: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.comparing !== this.props.comparing) {
      let reversed = this.props.shown.reverse();
      if (this.state.comparation == "smaller" && this.props.comparing) {
        reversed[0].number < reversed[1].number
          ? this.onSuccess()
          : this.onFailure();
      }
      if (this.state.comparation == "bigger" && this.props.comparing) {
        reversed[0].number > reversed[1].number
          ? this.onSuccess()
          : this.onFailure();
      }
      this.setState({ comparation: null });
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
  };

  onSuccess = () => {
    setTimeout(() => {
      this.props.hiddenCard == true && this.props.showHiddenCard(false);
      this.props.startComparing(false);
      this.props.setSuccessBoolean(true);
    }, 2000);
    let reversed = this.props.shown.reverse();
    let oldCardObject = reversed[0];
    let isItSmallerProp = { biggerOrSmaller: this.state.comparation };
    let newGuessedObject = { ...oldCardObject, ...isItSmallerProp };
    this.props.moveToGuessed(newGuessedObject);
    console.log("true");
  };

  onFailure = () => {
    this.resetGame();
    console.log("False, Game has been reset");
  };

  newGame = () => {
    this.props.resetNotShownCards();
    this.props.resetShownCards();
    this.startBetting();
    this.props.showHiddenCard(false);
    this.props.startComparing(false);
    this.props.resetGame(true);
  };

  resetGame = () => {
    this.props.resetNotShownCards();
    this.props.resetShownCards();
    this.startBetting();
    this.props.showHiddenCard(false);
    this.props.startComparing(false);
    this.props.resetGame(true);
  };

  render() {
    return (
      <div>
        <button onClick={this.newGame}>New game</button>
        <button onClick={this.resetGame}>Reset game</button>
        <button onClick={this.isItSmaller}>Lower</button>
        <button onClick={this.isItBigger}>Higher</button>
        <div className="text-left randomDetails">
          All coins:{this.props.allCoins}
        </div>
        <input defaultValue="10" type="number" />
      </div>
    );
  }
}

const mapStateToProps = ({
  allCoins,
  start,
  success,
  success2,
  shown,
  comparing,
  hiddenCard,
}) => ({
  allCoins,
  start,
  success,
  success2,
  shown,
  comparing,
  hiddenCard,
});
const mapDispatchToProps = {
  setStartBoolean,
  setSuccessBoolean,
  resetGame,
  resetNotShownCards,
  resetShownCards,
  showHiddenCard,
  startComparing,
  moveToGuessed,
};

export default connect(mapStateToProps, mapDispatchToProps)(Interface);
