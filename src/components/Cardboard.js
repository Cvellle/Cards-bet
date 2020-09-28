import React, { Component } from "react";
import { connect } from "react-redux";
import RandomCard from "../components/RandomCard";
import "./css/home.css";
import { firstStartChange } from "../store/actions";

class Cardboard extends Component {
  componentDidMount() {
    this.props.firstStartChange(true);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.hiddenCard !== this.props.hiddenCard) {
      this.props.firstStartChange(false);
    }
  }

  render() {
    return (
      <div>
        <RandomCard firstRandom="firstRandom" />
        {this.props.hiddenCard ? (
          // <NewRandomCard shown={this.props.shown} newRandom="newRandom" />
          <RandomCard newRandom="newRandom" />
        ) : (
          "back card image"
        )}
        <div>
          Already guesed
          <ul>
            {this.props.shown.map((it) => (
              <li key={it.id} className="listItem">
                {it.number} {it.sign}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

// const PreviousCards = this.props.shown.map((it) => (
//   <li key={it.id} className="listItem">
//     ${it.id}
//   </li>
// ));

// function wrapRandomCard(Wrapped) {
//   return class extends React.Component {
//     componentDidMount() {
//       this.takeCurrentCard();
//     }
//     takeCurrentCard = () => {
//       // console.log(this.props.shown.pop());
//     };

//     render() {
//       return <Wrapped {...this.props.shown} {...this.props.newRandom} />;
//     }
//   };
// }

// const NewRandomCard = wrapRandomCard(RandomCard);

const mapStateToProps = ({ shown, hiddenCard, firstStart }) => ({
  shown,
  hiddenCard,
  firstStart,
});
const mapDispatchToProps = {
  firstStartChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cardboard);
