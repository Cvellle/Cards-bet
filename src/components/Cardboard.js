import React, { Component } from "react";
import { connect } from "react-redux";
import RandomCard from "../components/RandomCard";
import NewRandomCard from "../components/NewRandomCard";
import "./css/home.css";
import { firstStartChange, startComparing } from "../store/actions";
import { cardBack } from "../images/cardback.png";

class Cardboard extends Component {
  componentDidMount() {
    this.props.firstStartChange(true);
  }

  componentDidUpdate(prevState) {
    if (prevState.shown !== this.props.shown) {
      this.props.hiddenCard && this.props.startComparing(true);
    }
  }

  render() {
    return (
      <div>
        <RandomCard firstRandom="firstRandom" />
        {this.props.hiddenCard ? (
          <NewRandomCard newRandom="newRandom" />
        ) : (
          <img src={cardBack} />
        )}
        <div>
          Already shown cards list:
          <ul>
            {this.props.shown.map((it) => (
              <li key={it.id} className="listItem">
                {it.number} {it.sign}
              </li>
            ))}
          </ul>
          Guesed cards list:
          <ul>
            {this.props.guessedCards &&
              this.props.guessedCards.map((it) => (
                <li key={it.id} className="listItem">
                  {it.number} {it.sign} {it.biggerOrSmaller}
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ hiddenCard, shown, guessedCards }) => {
  return { hiddenCard, shown, guessedCards };
};
const mapDispatchToProps = { firstStartChange, startComparing };

export default connect(mapStateToProps, mapDispatchToProps)(Cardboard);
