import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setStartBoolean,
  setSuccessBoolean,
  resetNotShownCards,
  resetShownCards,
  showHiddenCard,
  startComparing,
} from "../store/actions";
import "./css/random.css";

class Interface extends Component {
  state = {
    firstCard: null,
    secondCard: null,
    comparation: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.shown !== this.props.shown) {
      this.props.shown.length > 1 && this.takeLastTwoShown();
    }
    if (prevState.comparation !== this.state.comparation) {
      this.biggerOrSmaller(this.state.comparation);
    }
    // if (prevProps.hiddenCard !== this.props.hiddenCard) {
    //   this.props.showHiddenCard(false);
    // }
  }

  takeLastTwoShown = () => {
    this.setState({
      firstCard: this.props.shown[0].number,
      secondCard: this.props.shown[1].number,
    });
  };

  setComparisonInState = (comparisonFromButton) => {
    this.props.showHiddenCard(true);
    this.props.startComparing(true);
    if (comparisonFromButton == "bigger") {
      this.setState({ comparation: "bigger" });
    }
    if (comparisonFromButton == "smaller") {
      this.setState({ comparation: "smaller" });
    }
  };

  biggerOrSmaller = (comparisonFromState) => {
    if (comparisonFromState == "bigger") {
      this.state.firstCard < this.state.secondCard
        ? console.log("true")
        : console.log("false");
      this.setState({ comparation: null });
    }
    if (comparisonFromState == "smaller") {
      this.state.firstCard > this.state.secondCard
        ? console.log("true")
        : console.log("false");
      this.setState({ comparation: null });
    }
    this.onSuccess();
  };

  onSuccess = () => {
    setTimeout(() => {
      this.props.hiddenCard == true && this.props.showHiddenCard(false);
      this.props.setSuccessBoolean(true);
    }, 2000);
  };

  onFailure = () => {
    alert("Wrong");
  };

  newGame = () => {
    this.props.resetNotShownCards();
    this.props.resetShownCards();
    this.loadImage();
    this.props.showHiddenCard(false);
  };

  resetGame = () => {
    this.props.resetNotShownCards();
    this.props.resetShownCards();
    this.loadImage();
    this.props.showHiddenCard(false);
  };

  loadImage = () => {
    this.props.setStartBoolean(true);
  };

  render() {
    return (
      <div>
        <button onClick={this.newGame}>New game</button>
        <button onClick={this.resetGame}>Reset game</button>
        <button onClick={() => this.setComparisonInState("smaller")}>
          Lower
        </button>
        <button onClick={() => this.setComparisonInState("bigger")}>
          Higher
        </button>
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
  shown,
  comparing,
  hiddenCard,
}) => ({
  allCoins,
  start,
  shown,
  comparing,
  hiddenCard,
});
const mapDispatchToProps = {
  setStartBoolean,
  setSuccessBoolean,
  resetNotShownCards,
  resetShownCards,
  showHiddenCard,
  startComparing,
};

export default connect(mapStateToProps, mapDispatchToProps)(Interface);
