import React, { Component } from "react";
import { connect } from "react-redux";
import {
  excludeCurrent,
  moveToShown,
  setStartBoolean,
  showHiddenCard,
  setSuccessBoolean,
  firstStartChange,
} from "../store/actions";
import "./css/cardboard.css";

class NewRandomCard extends Component {
  state = {
    image: null,
    number: null,
    sign: null,
  };

  componentDidMount() {
    this.loadImage();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.start !== this.props.start) {
      this.props.start == true && this.loadImage();
      this.props.setStartBoolean(false);
    }
    if (this.props.firstRandom) {
      if (
        prevProps.success !== this.props.success &&
        this.props.success == true
      ) {
        this.loadImage();
        this.props.setSuccessBoolean();
      }
    }
  }

  // componentWillUnmount() {
  //   // ??????
  // }

  log = () => {
    console.log(this.props.notShown);
  };

  logShown = () => {
    console.log(this.props.shown);
  };

  compareNewCard = () => {
    console.log(this.props.shown);
  };

  loadImage = () => {
    const index = Math.floor((this.props.notShown.length - 1) * Math.random());
    const card = this.props.notShown[index];
    const num = card.number;
    const cardSign = card.sign;
    this.props.excludeCurrent(card.id);
    this.props.moveToShown(card);
    this.props.setStartBoolean(false);

    import(`../images/cards/${card.number}_of_${card.sign}.svg`).then(
      (image) => {
        this.setState({
          image: image,
          number: num,
          sign: cardSign,
        });
      }
    );
    console.log("made");
  };
  render() {
    const { image } = this.state;
    return (
      <div>
        <button onClick={this.log}>see rest</button>
        <button onClick={this.logShown}>see shown</button>
        {image && <img src={image} alt="" className="randomCard" />}
        <p className="text-left">{this.state.number}</p>
        <p className="text-left">{this.state.sign}</p>
      </div>
    );
  }
}

const mapStateToProps = ({
  cards,
  notShown,
  shown,
  start,
  hiddenCard,
  success,
  firstStart,
}) => ({
  cards,
  notShown,
  shown,
  start,
  hiddenCard,
  success,
  firstStart,
});
const mapDispatchToProps = {
  excludeCurrent,
  moveToShown,
  setStartBoolean,
  showHiddenCard,
  setSuccessBoolean,
  firstStartChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewRandomCard);
