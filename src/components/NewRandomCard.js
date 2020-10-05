import React, { Component } from "react";
import { connect } from "react-redux";
import {
  excludeCurrent,
  moveToShown,
  setStartBoolean,
  showHiddenCard,
  setSuccessBoolean,
  moveToLastGuessed,
} from "../store/actions";
import "./css/cardboard.css";
import { Image, Group } from "react-konva";
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.start !== this.props.start) {
      this.props.start && this.loadImage();
      this.props.setStartBoolean(false);
    }
    if (this.props.firstRandom) {
      if (prevProps.success !== this.props.success && this.props.success) {
        this.props.setSuccessBoolean(false);
        console.log("1st");
      }
    }
  }

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

const NewImageToRender = (props) => {
  const [image] = useImage(props.im);
  return (
    <animated.Image
      image={image}
      x={(ww / 100) * 54}
      y={(wh / 100) * 10}
      width={ww / 10}
      height={ww / 7}
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
  cards,
  notShown,
  shown,
  start,
  hiddenCard,
  success,
  firstStart,
  firstCardIsHidden,
}) => ({
  cards,
  notShown,
  shown,
  start,
  hiddenCard,
  success,
  firstStart,
  firstCardIsHidden,
});
const mapDispatchToProps = {
  excludeCurrent,
  moveToShown,
  setStartBoolean,
  showHiddenCard,
  setSuccessBoolean,
  moveToLastGuessed,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewRandomCard);
