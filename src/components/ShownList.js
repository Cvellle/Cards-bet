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

  // Different actions depending on is it importing occured on load or after success
  importImages = () => {
    let { guessedCards } = this.props;
    if (!this.props.success) {
      guessedCards.map((el, i) => {
        import(`../images/cards/${el.number}_of_${el.sign}.svg`).then(
          (image) => {
            let arrowInfoObject = {
              path: image,
              lowerOrHigher: guessedCards[i].biggerOrSmaller,
            };
            this.props.moveToImported(arrowInfoObject);
          }
        );
      });
    } else {
      if (guessedCards.length !== 0) {
        let index = guessedCards.length - 1;
        import(
          `../images/cards/${guessedCards[index].number}_of_${guessedCards[index].sign}.svg`
        ).then((image) => {
          let arrowInfoObject = {
            path: image,
            lowerOrHigher: guessedCards[index].biggerOrSmaller,
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
    let { importedImages } = this.props;
    return (
      <Layer>
        {importedImages.map((el, i) => (
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
