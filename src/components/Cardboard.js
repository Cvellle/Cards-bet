import React, { Component } from "react";
import { connect } from "react-redux";
import { Circle, Group, Text } from "react-konva";
import useImage from "use-image";
import Konva from "konva";

import Card from "./Card";
import ShownList from "../components/ShownList";
import {
  firstStartChange,
  excludeCurrent,
  moveToShown,
  setStartBoolean,
  setSuccessBoolean,
  moveToLastGuessed,
  showHiddenCard,
  hideFirstCard,
  resetGame,
} from "../store/actions";
import "./css/basic.css";
import cardBack from "../images/cardback.png";
import { Stage, Layer, Image, Rect } from "react-konva";

const ww = window.innerWidth;
const wh = window.innerHeight;

class Cardboard extends Component {
  state = {
    rectRow1: this.makeRectRow(),
    rectRow2: this.makeRectRow(),
    firstImage: null,
    rightImage: null,
  };

  componentDidMount() {
    this.props.firstStartChange(true);
  }

  componentDidUpdate(prevProps) {
    let index = Math.floor((this.props.notShown.length - 1) * Math.random());
    let storedCard = JSON.parse(localStorage.getItem("card-cardsBet"));
    let shownIndex = this.props.notShown[index];
    let add = "addToShown";
    let dontAdd = "dontAddToShown";

    if (prevProps.firstStart !== this.props.firstStart) {
      this.props.firstStart &&
        storedCard &&
        this.loadFirstImage(storedCard, dontAdd);
      !storedCard && this.loadFirstImage(shownIndex, add);
    }

    if (prevProps.reset !== this.props.reset) {
      this.props.reset && this.loadFirstImage(shownIndex, add);
      this.props.resetGame(false);
    }

    if (prevProps.hiddenCard !== this.props.hiddenCard) {
      this.props.hiddenCard && this.loadNewImage(shownIndex);
    }

    if (prevProps.lastGuessed !== this.props.lastGuessed) {
      this.props.success ? this.putPreviousGuessedImage() : null;
    }
  }

  makeRectRow() {
    const items = [];
    for (let i = 0; i < 15; i++) {
      items.push({
        x: i,
        rotation: 45,
        color: Konva.Util.getRandomColor(),
        opacity: Math.random().toFixed(2) * (0.1 - 0.05) + 0.05,
      });
    }
    return items;
  }

  putPreviousGuessedImage = () => {
    this.setState({
      firstImage: this.props.lastGuessed,
    });
  };

  loadFirstImage = (source, addOrNotToShown) => {
    //Takes source card argument
    let card = null;
    card = source;
    localStorage.setItem("card-cardsBet", JSON.stringify(card));

    //Takes addOrNotToShown argument
    let addOrNot = addOrNotToShown;
    addOrNot === "addToShown" && this.props.excludeCurrent(card.id);
    addOrNot === "addToShown" && this.props.moveToShown(card);

    import(`../images/cards/${card.number}_of_${card.sign}.svg`).then(
      (image) => {
        this.setState({
          firstImage: image,
        });
      }
    );
  };

  loadNewImage = (source) => {
    const card = source;
    this.props.moveToShown(card);
    localStorage.setItem("card-cardsBet", JSON.stringify(card));
    this.props.excludeCurrent(card.id);
    this.props.setStartBoolean(false);
    import(`../images/cards/${card.number}_of_${card.sign}.svg`).then(
      (image) => {
        this.setState(
          {
            rightImage: image,
          },
          () => {
            this.props.hideFirstCard(true);
            this.props.moveToLastGuessed(image);
            setTimeout(() => {
              this.props.hideFirstCard(false);
            }, 1500);
          }
        );
      }
    );
  };

  render() {
    let { rectRow1, firstImage, rightImage } = this.state;
    let { firstCardIsHidden } = this.props;

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
            <Card
              card="firstCard"
              isCardHidden={!firstCardIsHidden && !this.props.reset}
              image={firstImage}
              success={this.props}
            />
            <CardBack className="cardBack" />
            {this.props.firstCardIsHidden ? (
              <Card
                card="newRandomCard"
                isCardHidden={firstCardIsHidden}
                image={rightImage}
              />
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

const mapStateToProps = ({
  hiddenCard,
  firstStart,
  lastRoundColor,
  shown,
  notShown,
  firstCardIsHidden,
  lastGuessed,
  success,
  reset,
  start,
  comparing,
}) => {
  return {
    hiddenCard,
    firstStart,
    lastRoundColor,
    shown,
    notShown,
    firstCardIsHidden,
    lastGuessed,
    success,
    reset,
    start,
    comparing,
  };
};
const mapDispatchToProps = {
  firstStartChange,
  excludeCurrent,
  moveToShown,
  setStartBoolean,
  setSuccessBoolean,
  moveToLastGuessed,
  showHiddenCard,
  hideFirstCard,
  resetGame,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cardboard);
