import React, { Component } from "react";
import { connect } from "react-redux";
import { Transition, animated } from "react-spring/dist/konva";

import {
  excludeCurrent,
  moveToShown,
  setStartBoolean,
  showHiddenCard,
  setSuccessBoolean,
  firstStartChange,
  resetGame,
} from "../store/actions";
import "./css/cardboard.css";
import { Image, Group, Text } from "react-konva";
import useImage from "use-image";
// import { Spring, animated } from "react-spring/renderprops-konva";

const ww = window.innerWidth;
const wh = window.innerHeight;

class RandomCard extends Component {
  state = {
    image: null,
    number: null,
    sign: null,
    isButtonVisible: true,
  };

  componentDidMount() {
    // console.log("start");
  }

  componentDidUpdate(prevProps) {
    let index = Math.floor((this.props.notShown.length - 1) * Math.random());
    let storedCard = JSON.parse(localStorage.getItem("card-cardsBet"));

    if (prevProps.firstStart !== this.props.firstStart) {
      this.props.firstStart == true &&
        storedCard &&
        this.loadImage(storedCard, "dontAddToShown");
      !storedCard && this.loadImage(this.props.notShown[index], "addToShown");
      this.props.firstStartChange(false);
    }

    if (prevProps.reset !== this.props.reset) {
      this.props.reset == true &&
        this.loadImage(this.props.notShown[index], "addToShown");
      this.props.resetGame(false);
    }

    if (prevProps.lastGuessed !== this.props.lastGuessed) {
      if (this.props.game == "Smooth Bet") {
        console.log("suces", this.props.success);
        this.props.success == true
          ? this.putPreviousGuessedImage()
          : this.loadImage(this.props.notShown[index], "addToShown");
      } else {
        this.props.success &&
          this.loadImage(this.props.notShown[index], "addToShown");
        this.props.setSuccessBoolean(false);
      }
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
    //Take addOrNotToShown argument
    addOrNotToShown == "addToShown" && this.props.moveToShown(source);
    addOrNotToShown == "addToShown" && this.props.excludeCurrent(card.id);
    localStorage.setItem("card-cardsBet", JSON.stringify(card));
    let num = card.number;
    let cardSign = card.sign;

    // let isItSmallerProp = { smaller: "smaller", bigger: "bigger" };
    this.props.setStartBoolean(false);

    import(`../images/cards/${card.number}_of_${card.sign}.svg`).then(
      (image) => {
        this.setState({
          image: image,
          number: num,
          sign: cardSign,
        });
      }
    );
    console.log("made");
  };

  render() {
    let isButtonVisible = !this.props.reset;
    // ? !this.props.hiddenCard
    // : !this.props.reset
    // const options = [!this.props.reset, !this.props.hiddenCard]
    // if (this.props.success) {

    // }

    return (
      <Group>
        <Text
          text={`${this.state.number} of ${this.state.sign}`}
          fontSize={15}
        />
        {
          <Transition
            native
            from={{
              opacity: 0,
              transition: 6,
            }}
            enter={{
              opacity: 1,
              transition: 6,
            }}
            leave={{
              opacity: 0,
            }}
            keys={isButtonVisible}
          >
            {(props) =>
              isButtonVisible && (
                <ImageToRender im={this.state.image} {...props} />
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
      x={(ww / 100) * 30}
      y={wh / 20}
      width={ww / 10}
      height={ww / 7}
      opacity={props.opacity}
    />
  );
};

const mapStateToProps = ({
  game,
  cards,
  notShown,
  shown,
  start,
  hiddenCard,
  success,
  firstStart,
  reset,
  guessedCards,
  lastGuessed,
}) => ({
  game,
  cards,
  notShown,
  shown,
  start,
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
  showHiddenCard,
  setSuccessBoolean,
  firstStartChange,
  resetGame,
};

export default connect(mapStateToProps, mapDispatchToProps)(RandomCard);

// render() {
//   return (
//     <Group
//       ref={(node) => {
//         this.rect = node;
//         this.duration = "4";
//       }}
//     >
//       <Text
//         text={`${this.props.number} of ${this.props.sign}`}
//         fontSize={15}
//       />
//       <ImageToRender im={this.props.image} />
//     </Group>
//   );
// }
// }

// const ImageToRender = (props) => {
// const [image] = useImage(props.im);
// return (
//   <Image
//     image={image}
//     x={(ww / 100) * 30}
//     y={wh / 20}
//     width={ww / 10}
//     height={ww / 7}
//   />
// );
// };

///2

// var amplitude = 1;
// var period = 600;
// var anim = new Konva.Animation((frame) => {
//   this.rect.opacity((Math.sin(frame.time / period) + 1) / 2);
// }, this.rect.getLayer());
// anim.start();
// const ca = () => setTimeout((period = 0), 6000);
// ca();
// ref={(node) => {
//   this.rect = node;
//   this.duration = "4";
// }}

// var tween = new Konva.Tween({
//   node: "rect",
//   opacity: 0,
//   easing: Konva.Easings["linear"],
//   duration: 2,
// });
// tween.play();

// var angularSpeed = 90;
// this.anim = new Konva.Animation((frame) => {
//   var angleDiff = (frame.timeDiff * angularSpeed) / 1000;
//   this.rect.rotate(angleDiff);
// }, this.rect.getLayer());
// this.anim.start();
