import React, { Component } from "react";
import { connect } from "react-redux";
import RandomCard from "../components/RandomCard";
import NewRandomCard from "../components/NewRandomCard";
import ShownList from "../components/ShownList";
import { Circle, Group, Text } from "react-konva";
import "./css/home.css";
import {
  firstStartChange,
  startComparing,
  setStartBoolean,
} from "../store/actions";
import cardBack from "../images/cardback.png";
import { Stage, Layer, Image, Rect } from "react-konva";
import useImage from "use-image";
import Konva from "konva";

const ww = window.innerWidth;
const wh = window.innerHeight;

class Cardboard extends Component {
  state = {
    rectRow1: this.makeRectRow(),
    rectRow2: this.makeRectRow(),
    lastRoundColor: "gray",
  };

  componentDidMount() {
    this.props.firstStartChange(true);
    console.log("fstar", this.props.firstStart);
  }

  makeRectRow() {
    const items = [];
    for (let i = 0; i < 15; i++) {
      items.push({
        x: i,
        rotation: 45,
        id: "node-" + i,
        color: Konva.Util.getRandomColor(),
        opacity: Math.random().toFixed(2) * (0.1 - 0.05) + 0.05,
      });
    }
    return items;
  }

  render() {
    return (
      <div>
        <Stage
          className="canvasStage"
          width={window.innerWidth}
          height={window.innerHeight}
          fill="green"
        >
          <Layer>
            {this.state.rectRow1.map((item) => (
              <Rect
                width={wh / 1.7}
                height={wh / 1.7}
                key={item.id}
                name={item.id}
                rotation={item.rotation}
                x={(wh / 100) * 27.8 * item.x - 100}
                y={(wh / 100) * -7}
                fill={item.color}
                radius={50}
                opacity={item.opacity}
              />
            ))}
          </Layer>
          <Layer>
            {this.state.rectRow1.map((item) => (
              <Rect
                width={wh / 1.7}
                height={wh / 1.7}
                key={item.id}
                name={item.id}
                rotation={item.rotation}
                x={(wh / 100) * 27.8 * item.x - 100}
                y={wh / 2.065}
                fill={item.color}
                radius={50}
                opacity={item.opacity}
              />
            ))}
          </Layer>
          <Layer width={ww} height={wh}>
            <RandomCard loadImage={this.loadImage} />
            <CardBack className="cardBack" />
            {this.props.hiddenCard ? (
              <NewRandomCard className="newRandomCard" />
            ) : null}
          </Layer>
          <Layer height={this.props.reset ? 0 : wh / 2}>
            {this.props.firstStart ? (
              <Group x={(ww / 100) * 90} y={(wh / 100) * 20}>
                <Circle
                  fill={this.props.lastRoundColor}
                  radius={(ww / 100) * 5}
                  opacity={0.5}
                />
                <Text
                  fontSize={15}
                  fill={"white"}
                  opacity={0.4}
                  y={(wh / 100) * 12}
                  x={(ww / 100) * -4}
                  text={"Last round mark"}
                />
              </Group>
            ) : (
              <Group x={(ww / 100) * 90} y={(wh / 100) * 20}>
                <Circle
                  fill={this.props.lastRoundColor}
                  radius={(ww / 100) * 5}
                  opacity={0.5}
                />
                <Text
                  fontSize={15}
                  fill={"white"}
                  opacity={0.4}
                  y={(wh / 100) * 12}
                  x={(ww / 100) * -4}
                  text="Last round mark"
                />
              </Group>
            )}
          </Layer>
          <ShownList />
        </Stage>
      </div>
    );
  }
}

const CardBack = () => {
  const [image] = useImage(cardBack);
  return (
    <Image
      image={image}
      x={(ww / 100) * 54}
      y={(wh / 100) * 10}
      width={ww / 10}
      height={ww / 7}
      shadowColor="black"
      shadowBlur={10}
      shadowOpacity={0.6}
      shadowOffsetX={15}
      shadowOffsetY={15}
    />
  );
};

const mapStateToProps = ({
  hiddenCard,
  shown,
  guessedCards,
  notShown,
  start,
  success,
  firstStart,
  lastRound,
  lastRoundColor,
  reset,
}) => {
  return {
    hiddenCard,
    shown,
    guessedCards,
    notShown,
    start,
    success,
    firstStart,
    lastRound,
    lastRoundColor,
    reset,
  };
};
const mapDispatchToProps = {
  firstStartChange,
  startComparing,
  setStartBoolean,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cardboard);
