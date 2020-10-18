import React, { Component } from "react";
import { connect } from "react-redux";

import { Group } from "react-konva";
import useImage from "use-image";
import { Transition, animated } from "react-spring/dist/konva";
import {
  excludeCurrent,
  moveToShown,
  setStartBoolean,
  setSuccessBoolean,
  moveToLastGuessed,
} from "../store/actions";
import "./css/cardboard.css";
const ww = window.innerWidth;
const wh = window.innerHeight;

class NewRandomCard extends Component {
  state = {
    image: null,
  };

  componentDidMount() {
    this.loadImage();
  }

  // Randomly taking a card from left unshown cards from the deck
  loadImage = () => {
    const index = Math.floor((this.props.notShown.length - 1) * Math.random());
    const card = this.props.notShown[index];
    this.props.moveToShown(card);
    localStorage.setItem("card-cardsBet", JSON.stringify(card));
    this.props.excludeCurrent(card.id);
    this.props.setStartBoolean(false);
    import(`../images/cards/${card.number}_of_${card.sign}.svg`).then(
      (image) => {
        this.setState(
          {
            image: image,
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
    let { image } = this.state;
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
            isCardFirsCardVisible && <NewImageToRender im={image} {...props} />
          }
        </Transition>
      </Group>
    );
  }
}

// Right card on the display
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
