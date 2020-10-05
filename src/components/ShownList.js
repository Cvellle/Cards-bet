import React, { Component } from "react";
import { connect } from "react-redux";
import { Layer, Image, Group, RegularPolygon } from "react-konva";
import useImage from "use-image";
import { moveToImported } from "../store/actions";
const ww = window.innerWidth;
const wh = window.innerHeight;

class ShownList extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.guessedCards.length !== this.props.guessedCards.length) {
      this.importImages();
    }

    if (prevProps.firstStart !== this.props.firstStart) {
      this.props.firstStart && this.importImages();
    }
  }

  // Diiferent actions depending on is it importing occured on load or after success
  importImages = () => {
    let guessed = this.props.guessedCards;
    if (!this.props.success) {
      this.props.guessedCards.map((el, i) => {
        import(`../images/cards/${el.number}_of_${el.sign}.svg`).then(
          (image) => {
            let arrowInfoObject = {
              path: image,
              lowerOrHigher: guessed[i].biggerOrSmaller,
            };
            this.props.moveToImported(arrowInfoObject);
          }
        );
      });
    } else {
      if (guessed.length !== 0) {
        let index = this.props.guessedCards.length - 1;
        import(
          `../images/cards/${guessed[index].number}_of_${guessed[index].sign}.svg`
        ).then((image) => {
          let arrowInfoObject = {
            path: image,
            lowerOrHigher: guessed[index].biggerOrSmaller,
          };
          this.props.moveToImported(arrowInfoObject);
        });
      }
    }
  };

  render() {
    //If cards in the Shown list come to 10, they move on from the other position
    // biggerThanComparedCard is Condition for the arrow mark
    let biggerThanComparedCard = "biggerThanComparedCard";
    return (
      <Layer width={window.innerWidth} height={window.innerHeight}>
        {this.props.importedImages.map((el, i) => (
          <Group
            key={i}
            y={
              i < 10
                ? (wh / 100) * i * 6 + (wh / 100) * 5
                : (wh / 100) * (i - 10) * 6 + (wh / 100) * 5
            }
            x={i < 10 ? (ww / 100) * 4 : (ww / 100) * 20}
          >
            <ImageInShownList source={el.path} />
            <RegularPolygon
              sides={3}
              radius={10}
              tension={0.5}
              x={ww > 1024 ? (ww / 100) * 12 : (wh / 100) * 13}
              y={(wh / 100) * 2}
              height={ww > 1024 ? (wh / 100) * 4 : (wh / 100) * 2}
              fill={
                el.lowerOrHigher === biggerThanComparedCard ? "green" : "red"
              }
              rotation={el.lowerOrHigher === biggerThanComparedCard ? 0 : 180}
              shadowBlur={5}
              opacity={0.6}
            />
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
      x={props.x}
      y={props.y}
      width={ww > 1024 ? ww / 10 : ww / 5}
      height={ww > 1024 ? ww / 7 : ww / 3.8}
      shadowColor="black"
      shadowBlur={10}
      shadowOpacity={0.6}
      shadowOffsetX={15}
      shadowOffsetY={15}
    />
  );
};

const mapStateToProps = ({
  guessedCards,
  importedImages,
  firstStart,
  success,
}) => ({
  guessedCards,
  importedImages,
  firstStart,
  success,
});

const mapDispatchToProps = {
  moveToImported,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShownList);
