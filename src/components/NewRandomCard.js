import React, { Component } from "react";
import { connect } from "react-redux";
import {
  excludeCurrent,
  moveToShown,
  setStartBoolean,
  showHiddenCard,
  setSuccessBoolean,
  firstStartChange,
  moveToLastGuessed,
} from "../store/actions";
import "./css/cardboard.css";
import { Image, Group, Text } from "react-konva";
import useImage from "use-image";
const ww = window.innerWidth;
const wh = window.innerHeight;

// the first very simple and recommended way:
const NewImageToRender = (prop) => {
  const [image] = useImage(prop.im);
  return (
    <Image
      image={image}
      x={ww / 2}
      y={wh / 20}
      width={ww / 10}
      height={ww / 7}
    />
  );
};

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
        this.props.setSuccessBoolean();
      }
    }
  }

  // componentWillUnmount() {
  //   // ??????
  // }

  loadImage = () => {
    const index = Math.floor((this.props.notShown.length - 1) * Math.random());
    const card = this.props.notShown[index];
    const num = card.number;
    const cardSign = card.sign;
    this.props.excludeCurrent(card.id);
    this.props.moveToShown(card);
    this.props.setStartBoolean(false);

    import(`../images/cards/${card.number}_of_${card.sign}.svg`).then(
      (image) => {
        this.setState(
          {
            image: image,
            number: num,
            sign: cardSign,
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
    const { image } = this.state;
    return (
      <Group>
        <Text
          text={`${this.state.number} of ${this.state.sign}`}
          fontSize={15}
        />
        <NewImageToRender im={this.state.image} />
      </Group>
    );
  }
}

const mapStateToProps = ({
  cards,
  notShown,
  shown,
  start,
  hiddenCard,
  success,
  firstStart,
}) => ({
  cards,
  notShown,
  shown,
  start,
  hiddenCard,
  success,
  firstStart,
});
const mapDispatchToProps = {
  excludeCurrent,
  moveToShown,
  setStartBoolean,
  showHiddenCard,
  setSuccessBoolean,
  firstStartChange,
  moveToLastGuessed,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewRandomCard);
