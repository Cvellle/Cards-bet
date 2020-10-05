import React, { Component } from "react";
import { connect } from "react-redux";
import { Transition, animated } from "react-spring/dist/konva";
import {
  excludeCurrent,
  moveToShown,
  setStartBoolean,
  resetGame,
} from "../store/actions";
import "./css/cardboard.css";
import { Group, Text } from "react-konva";
import useImage from "use-image";
import xImage from "../images/x.png";
const ww = window.innerWidth;
const wh = window.innerHeight;

class FirstCard extends Component {
  state = {
    image: null,
    isButtonVisible: true,
  };

  componentDidUpdate(prevProps) {
    let index = Math.floor((this.props.notShown.length - 1) * Math.random());
    let storedCard = JSON.parse(localStorage.getItem("card-cardsBet"));
    let shownIndex = this.props.notShown[index];
    let add = "addToShown";
    let dontAdd = "dontAddToShown";

    if (prevProps.firstStart !== this.props.firstStart) {
      this.props.firstStart === true &&
        storedCard &&
        this.loadImage(storedCard, dontAdd);
      !storedCard && this.loadImage(shownIndex, add);
    }

    if (prevProps.reset !== this.props.reset) {
      this.props.reset === true && this.loadImage(shownIndex, add);
      this.props.resetGame(false);
    }

    if (prevProps.lastGuessed !== this.props.lastGuessed) {
      this.props.success === true
        ? this.putPreviousGuessedImage()
        : this.loadImage(shownIndex, add);
    }
  }

  putPreviousGuessedImage = () => {
    this.setState({
      image: this.props.lastGuessed,
    });
  };

  loadImage = (source, addOrNotToShown) => {
    //Take source card argument
    let card = null;
    card = source;
    localStorage.setItem("card-cardsBet", JSON.stringify(card));
    let num = card.number;
    let cardSign = card.sign;

    //Take addOrNotToShown argument
    let addOrNot = addOrNotToShown;
    addOrNot === "addToShown" && this.props.excludeCurrent(card.id);
    addOrNot === "addToShown" && this.props.moveToShown(card);
    this.props.setStartBoolean(false);

    import(`../images/cards/${card.number}_of_${card.sign}.svg`).then(
      (image) => {
        this.setState({
          image: image,
        });
      }
    );
    console.log("made");
  };

  render() {
    let isCardFirsCardVisible = !this.props.firstCardIsHidden;
    return (
      <Group>
        {
          <Transition
            native
            from={{
              opacity: 0,
            }}
            enter={{
              opacity: 1,
            }}
            leave={{
              opacity: 0,
            }}
            keys={isCardFirsCardVisible}
          >
            {(props) =>
              isCardFirsCardVisible ? (
                <ImageToRender im={this.state.image} {...props} />
              ) : (
                !this.props.success && (
                  <FailureImage im={this.state.image} {...props} />
                )
              )
            }
          </Transition>
        }
      </Group>
    );
  }
}

const ImageToRender = (props) => {
  const [image] = useImage(props.im);
  return (
    <animated.Image
      image={image}
      x={ww > 1024 ? (ww / 100) * 35 : ww / 2.9}
      y={ww > 1024 ? (wh / 100) * 20 : (wh / 100) * 5}
      width={ww > 1024 ? ww / 10 : ww / 3.5}
      height={ww > 1024 ? ww / 7 : ww / 2.7}
      opacity={props.opacity}
      shadowColor="black"
      shadowBlur={10}
      shadowOpacity={0.6}
      shadowOffsetX={15}
      shadowOffsetY={15}
    />
  );
};

const FailureImage = (props) => {
  const [image] = useImage(xImage);
  return (
    <animated.Image
      image={image}
      x={ww > 1024 ? (ww / 100) * 35 : ww / 2.7}
      y={ww > 1024 ? (wh / 100) * 23 : (wh / 100) * 10}
      width={ww > 1024 ? ww / 10 : ww / 4}
      height={ww > 1024 ? ww / 9 : ww / 5}
      opacity={props.opacity}
      shadowColor="black"
      shadowBlur={10}
      shadowOpacity={0.6}
      shadowOffsetX={15}
      shadowOffsetY={15}
    />
  );
};

const mapStateToProps = ({
  notShown,
  shown,
  start,
  hiddenCard,
  success,
  firstStart,
  reset,
  lastGuessed,
  firstCardIsHidden,
}) => ({
  notShown,
  shown,
  start,
  hiddenCard,
  success,
  firstStart,
  reset,
  lastGuessed,
  firstCardIsHidden,
});
const mapDispatchToProps = {
  excludeCurrent,
  moveToShown,
  setStartBoolean,
  resetGame,
};

export default connect(mapStateToProps, mapDispatchToProps)(FirstCard);
