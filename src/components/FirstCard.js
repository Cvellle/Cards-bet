import React, { Component } from "react";
import { connect } from "react-redux";
import { Transition, animated } from "react-spring/dist/konva";
import { Group } from "react-konva";
import useImage from "use-image";

import {
  excludeCurrent,
  moveToShown,
  setStartBoolean,
  showHiddenCard,
  setSuccessBoolean,
  resetGame,
  hideFirstCard,
} from "../store/actions";
import xImage from "../images/x.png";
const ww = window.innerWidth;
const wh = window.innerHeight;

class FirstCard extends Component {
  render() {
    let { firstCardIsHidden, image } = this.props;
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
            keys={firstCardIsHidden}
          >
            {(props) =>
              firstCardIsHidden ? (
                <ImageToRender im={image} {...props} />
              ) : (
                !this.props.success &&
                !this.props.comparing && <FailureImage im={image} {...props} />
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
  hiddenCard,
  success,
  firstStart,
  reset,
  guessedCards,
  lastGuessed,
}) => ({
  notShown,
  shown,
  hiddenCard,
  success,
  firstStart,
  reset,
  guessedCards,
  lastGuessed,
});

const mapDispatchToProps = {
  excludeCurrent,
  moveToShown,
  setStartBoolean,
  setSuccessBoolean,
  resetGame,
  hideFirstCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(FirstCard);
