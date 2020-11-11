import React, { Component } from "react";
import { Group } from "react-konva";
import useImage from "use-image";
import { Transition, animated } from "react-spring/dist/konva";

import xImage from "../images/x.png";

const ww = window.innerWidth;
const wh = window.innerHeight;

class Card extends Component {
  render() {
    let { isCardHidden, image, success } = this.props;
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
          keys={isCardHidden}
        >
          {this.props.card === "firstCard"
            ? (props) =>
                isCardHidden ? (
                  <ImageToRender im={image} {...props} />
                ) : (
                  !success && <FailureImage im={image} {...props} />
                )
            : this.props.card === "newRandomCard" &&
              ((props) =>
                isCardHidden && <NewImageToRender im={image} {...props} />)}
        </Transition>
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

export default Card;
