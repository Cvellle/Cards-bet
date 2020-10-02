import React, { Component } from "react";
import { connect } from "react-redux";
import { Stage, Layer, Image, Text, Star, Group } from "react-konva";
import useImage from "use-image";
import { moveToImported } from "../store/actions";
const ww = window.innerWidth;
const wh = window.innerHeight;

class ShownList extends Component {
  state = {
    shownCardsState: [],
    cardsAreImported: false,
  };

  componentDidMount() {
    // this.importImages();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.guessedCards !== this.props.guessedCards) {
      this.importImages();
    }
    if (prevProps.firstStart !== this.props.firstStart) {
      this.props.firstStart && this.importImages();
    }
  }

  importImages = () => {
    if (this.props.firstStart) {
      this.props.guessedCards.map((el, i) => {
        import(`../images/cards/${el.number}_of_${el.sign}.svg`).then(
          (image) => {
            // this.setState({
            //   shownCardsState: this.state.shownCardsState.push(image),
            // }),
            this.props.moveToImported(image);
          }
        );
      });
      // ,
      //   //   this.afterImortedImages();
      //   console.log(this.props.importedImages);
    } else {
      let guessed = this.props.guessedCards;
      let index = this.props.guessedCards.length - 1;
      // this.props.guessedCards.map((el, i) => {
      if (guessed.length !== 0) {
        import(
          `../images/cards/${guessed[index].number}_of_${guessed[index].sign}.svg`
        ).then((image) => {
          this.props.moveToImported(image);
        });
      }
    }

    // });
    // ,
    //   //   this.afterImortedImages();
    //   console.log(this.props.importedImages);
  };

  show = () => {
    this.setState({
      cardsAreImported: true,
    });
  };

  render() {
    // const [image] = useImage(`static/favicon.ico`);
    return (
      <Layer width={window.innerWidth} height={window.innerHeight}>
        {this.props.importedImages.map((el, i) => (
          <Group key={i}>
            <ImageInShownList
              y={20 + i * 45}
              source={
                el
                // `../images/cards/${el.number}_of_${el.sign}.svg`
              }
              //   opacity={0.8}
              //   shadowColor="black"
              //   shadowBlur={10}
              //   shadowOpacity={0.6}
              //   shadowOffsetX={star.isDragging ? 10 : 5}
              //   shadowOffsetY={star.isDragging ? 10 : 5}
            />
            <Text text={"shown"} x={(ww / 100) * 70} y={20 + i * 45} />
          </Group>
        ))}
      </Layer>
    );
  }
}

const ImageInShownList = (props) => {
  const [image] = useImage(props.source);
  return (
    <Image
      image={image}
      x={(ww / 100) * 10}
      y={props.y}
      width={ww / 10}
      height={ww / 7}
    />
  );
};

const mapStateToProps = ({
  shown,
  guessedCards,
  importedImages,
  firstStart,
}) => ({
  shown,
  guessedCards,
  importedImages,
  firstStart,
});

const mapDispatchToProps = {
  moveToImported,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShownList);
