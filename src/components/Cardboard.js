import React, { Component } from "react";
import { connect } from "react-redux";

import FirstCard from "../components/FirstCard";
import NewRandomCard from "../components/NewRandomCard";
import ShownList from "../components/ShownList";
import { Circle, Group, Text } from "react-konva";
import "./css/basic.css";
import { firstStartChange } from "../store/actions";
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
  };

  componentDidMount() {
    this.props.firstStartChange(true);
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
    let { rectRow1 } = this.state;
    return (
      <div>
        <Stage
          className="canvasStage"
          width={window.innerWidth}
          height={window.innerHeight}
          fill="green"
        >
          <Layer>
            {rectRow1.map((item) => (
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
            {rectRow1.map((item) => (
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
            <FirstCard loadImage={this.loadImage} />
            <CardBack className="cardBack" />
            {this.props.hiddenCard ? (
              <NewRandomCard className="newRandomCard" />
            ) : null}
          </Layer>
          <Layer>
            <Group
              x={ww > 1024 ? (ww / 100) * 90 : (ww / 100) * 85}
              y={ww > 1024 ? (wh / 100) * 15 : (wh / 100) * 8}
            >
              <Circle
                fill={this.props.lastRoundColor}
                radius={(ww / 100) * 5}
                opacity={0.5}
              />
              <Text
                fontSize={ww > 1024 ? (ww / 100) * 1.15 : (ww / 100) * 3.5}
                fill={"white"}
                opacity={0.4}
                y={ww > 1024 ? (wh / 100) * 12 : (ww / 100) * 10}
                x={ww > 1024 ? (ww / 100) * -4 : (ww / 100) * -14}
                text={"Last round mark"}
              />
              {this.props.allCoins <= 0 ? (
                <Text
                  fontSize={ww > 1024 ? (ww / 100) * 1.15 : (ww / 100) * 3.5}
                  fill={"white"}
                  opacity={0.4}
                  y={ww > 1024 ? (wh / 100) * 12 : (ww / 100) * 10}
                  x={ww > 1024 ? (ww / 100) * 30 : (wh / 100) * 4}
                  text={"Last round mark"}
                />
              ) : null}
            </Group>
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
      x={ww > 1024 ? (ww / 100) * 55 : ww / 2.9}
      y={ww > 1024 ? (wh / 100) * 20 : (wh / 100) * 35}
      width={ww > 1024 ? ww / 10 : ww / 3.5}
      height={ww > 1024 ? ww / 7 : ww / 2.7}
      shadowColor="black"
      shadowBlur={10}
      shadowOpacity={0.6}
      shadowOffsetX={15}
      shadowOffsetY={15}
    />
  );
};

const mapStateToProps = ({ hiddenCard, firstStart, lastRoundColor }) => {
  return {
    hiddenCard,
    firstStart,
    lastRoundColor,
  };
};
const mapDispatchToProps = {
  firstStartChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cardboard);
