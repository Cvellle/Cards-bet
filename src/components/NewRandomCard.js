import React, { Component } from "react";
import { connect } from "react-redux";
import {
  excludeCurrent,
  moveToShown,
  setStartBoolean,
  setSuccessBoolean,
  moveToLastGuessed,
} from "../store/actions";
import "./css/cardboard.css";
import { Group } from "react-konva";
import useImage from "use-image";
import { Transition, animated } from "react-spring/dist/konva";
const ww = window.innerWidth;
const wh = window.innerHeight;

class NewRandomCard extends Component {
  state = {
    image: null,
    number: null,
    sign: null,
  };

  componentDidMount() {
    this.loadImage();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.start !== this.props.start) {
      this.props.start && this.loadImage();
      this.props.setStartBoolean(false);
    }
    if (this.props.firstRandom) {
      if (prevProps.success !== this.props.success && this.props.success) {
        this.props.setSuccessBoolean(false);
      }
    }
  }
  // Randoly taking a card from left unshown cards from the deck
  loadImage = () => {
    const index = Math.floor((this.props.notShown.length - 1) * Math.random());
    const card = this.props.notShown[index];
    this.props.moveToShown(card);
    localStorage.setItem("card-cardsBet", JSON.stringify(card));
    this.props.excludeCurrent(card.id);
    this.props.setStartBoolean(false);
    console.log(this.props.shown);
    import(`../images/cards/${card.number}_of_${card.sign}.svg`).then(
      (image) => {
        this.setState(
          {
            image: image,
            number: card.number,
            sign: card.sign,
          },
          () => {
            setTimeout(() => {
              this.props.moveToLastGuessed(image);
            }, 2000);
          }
        );
      }
    );
  };

  render() {
    let isCardFirsCardVisible = !this.props.firstCardIsHidden;
    return (
      <Group>
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
            isCardFirsCardVisible && (
              <NewImageToRender im={this.state.image} {...props} />
            )
          }
        </Transition>
      </Group>
    );
  }
}

// Left card on the display
const NewImageToRender = (props) => {
  const [image] = useImage(props.im);
  return (
    <animated.Image
      image={image}
      x={ww > 1024 ? (ww / 100) * 55 : ww / 2.9}
      y={ww > 1024 ? (wh / 100) * 20 : (wh / 100) * 35}
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

const mapStateToProps = ({
  notShown,
  shown,
  start,
  hiddenCard,
  success,
  firstCardIsHidden,
}) => ({
  notShown,
  shown,
  start,
  hiddenCard,
  success,
  firstCardIsHidden,
});

const mapDispatchToProps = {
  excludeCurrent,
  moveToShown,
  setStartBoolean,
  setSuccessBoolean,
  moveToLastGuessed,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewRandomCard);
