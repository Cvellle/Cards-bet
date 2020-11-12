import React, { Component } from "react";
import { Group } from "react-konva";
import useImage from "use-image";
import { Transition, animated } from "react-spring/dist/konva";

import xImage from "../images/x.png";

class Card extends Component {
  render() {
    let { isCardHidden, image, success, ww, wh, card } = this.props;
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
          {card === "firstCard"
            ? (props) =>
                isCardHidden ? (
                  <ImageToRender im={image} {...props} ww={ww} wh={wh} />
                ) : (
                  !success && (
                    <FailureImage im={image} ww={ww} wh={wh} {...props} />
                  )
                )
            : card === "newRandomCard" &&
              ((props) =>
                isCardHidden && (
                  <NewImageToRender im={image} ww={ww} wh={wh} {...props} />
                ))}
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
      x={props.ww > 1024 ? (props.ww / 100) * 35 : props.ww / 2.9}
      y={props.ww > 1024 ? (props.wh / 100) * 20 : (props.wh / 100) * 5}
      width={props.ww > 1024 ? props.ww / 10 : props.ww / 3.5}
      height={props.ww > 1024 ? props.ww / 7 : props.ww / 2.7}
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
      x={props.ww > 1024 ? (props.ww / 100) * 35 : props.ww / 2.7}
      y={props.ww > 1024 ? (props.wh / 100) * 23 : (props.wh / 100) * 10}
      width={props.ww > 1024 ? props.ww / 10 : props.ww / 4}
      height={props.ww > 1024 ? props.ww / 9 : props.ww / 5}
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
      x={props.ww > 1024 ? (props.ww / 100) * 55 : props.ww / 2.9}
      y={props.ww > 1024 ? (props.wh / 100) * 20 : (props.wh / 100) * 35}
      width={props.ww > 1024 ? props.ww / 10 : props.ww / 3.5}
      height={props.ww > 1024 ? props.ww / 7 : props.ww / 2.7}
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
