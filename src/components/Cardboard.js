import React, { Component } from "react";
import { connect } from "react-redux";
import RandomCard from "../components/RandomCard";
import NewRandomCard from "../components/NewRandomCard";
import ShownList from "../components/ShownList";
import "./css/home.css";
import {
  firstStartChange,
  startComparing,
  setStartBoolean,
} from "../store/actions";
import cardBack from "../images/cardback.png";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
const ww = window.innerWidth;
const wh = window.innerHeight;

class Cardboard extends Component {
  componentDidMount() {
    this.props.firstStartChange(true);
  }

  render() {
    return (
      <div>
        <Stage
          className="s"
          width={window.innerWidth}
          height={window.innerHeight / 2}
          fill="green"
        >
          <Layer x={20} y={20}>
            <RandomCard loadImage={this.loadImage} />
          </Layer>
          <Layer
            x={120}
            y={20}
            width={window.innerWidth}
            height={window.innerHeight / 2}
          >
            <CardBack className="cardBack" />
            {this.props.hiddenCard ? (
              <NewRandomCard className="newRandomCard" />
            ) : null}
          </Layer>
          <ShownList />
        </Stage>
        <div>
          Already shown cards list:
          <ul>
            {this.props.shown.map((it) => (
              <li key={it.id} className="listItem">
                {it.number} {it.sign}
              </li>
            ))}
          </ul>
          Guesed cards list:
          <ul>
            {this.props.guessedCards &&
              this.props.guessedCards.map((it) => (
                <li key={it.id} className="listItem">
                  {it.number} {it.sign} {it.biggerOrSmaller}
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

const CardBack = (prop) => {
  const [image] = useImage(cardBack);
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

const mapStateToProps = ({
  hiddenCard,
  shown,
  guessedCards,
  notShown,
  start,
  success,
  firstStart,
}) => {
  return {
    hiddenCard,
    shown,
    guessedCards,
    notShown,
    start,
    success,
    firstStart,
  };
};
const mapDispatchToProps = {
  firstStartChange,
  startComparing,
  setStartBoolean,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cardboard);

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import RandomCard from "../components/RandomCard";
// import NewRandomCard from "../components/NewRandomCard";
// import ShownList from "../components/ShownList";
// import "./css/home.css";
// import {
//   excludeCurrent,
//   moveToShown,
//   setStartBoolean,
//   showHiddenCard,
//   setSuccessBoolean,
//   firstStartChange,
//   resetGame,
//   startComparing,
// } from "../store/actions";
// import cardBack from "../images/cardback.png";
// import { Stage, Layer, Image } from "react-konva";
// import useImage from "use-image";
// const ww = window.innerWidth;
// const wh = window.innerHeight;

// class Cardboard extends Component {
//   state = {
//     image: null,
//     number: null,
//     sign: null,
//   };

//   componentDidMount() {
//     this.props.firstStartChange(true);
//   }

//   componentDidUpdate(prevProps) {
//     let index = Math.floor((this.props.notShown.length - 1) * Math.random());
//     let storedCard = JSON.parse(localStorage.getItem("card-cardsBet"));

//     if (prevProps.firstStart !== this.props.firstStart) {
//       this.props.firstStart == true &&
//         storedCard &&
//         this.loadImage(storedCard, "dontAddToShown");
//       !storedCard && this.loadImage(this.props.notShown[index], "addToShown");
//       this.props.firstStartChange(false);
//     }

//     if (prevProps.reset !== this.props.reset) {
//       this.props.reset == true &&
//         this.loadImage(this.props.notShown[index], "addToShown");
//       this.props.resetGame(false);
//     }

//     if (prevProps.lastGuessed !== this.props.lastGuessed) {
//       if (this.props.game == "Smooth Bet") {
//         console.log("suces", this.props.success);
//         this.props.success == true
//           ? this.putPreviousGuessedImage()
//           : this.loadImage(this.props.notShown[index], "addToShown");
//       } else {
//         this.props.success &&
//           this.loadImage(this.props.notShown[index], "addToShown");
//         this.props.setSuccessBoolean(false);
//       }
//     }
//   }

//   putPreviousGuessedImage = () => {
//     this.setState({
//       image: this.props.lastGuessed,
//     });
//   };

//   loadImage = (source, addOrNotToShown) => {
//     //Take source card argument
//     let card = null;
//     card = source;
//     localStorage.setItem("card-cardsBet", JSON.stringify(card));
//     let num = card.number;
//     let cardSign = card.sign;

//     //Take addOrNotToShown argument
//     let addOrNot = addOrNotToShown;
//     addOrNot == "addToShown" && this.props.excludeCurrent(card.id);
//     let isItSmallerProp = { smaller: "smaller", bigger: "bigger" };
//     addOrNot == "addToShown" &&
//       this.props.moveToShown({ ...card, isItSmallerProp });
//     this.props.setStartBoolean(false);

//     import(`../images/cards/${card.number}_of_${card.sign}.svg`).then(
//       (image) => {
//         this.setState({
//           image: image,
//           number: num,
//           sign: cardSign,
//         });
//       }
//     );
//     console.log("made");
//   };

//   render() {
//     return (
//       <div>
//         <Stage
//           className="s"
//           width={window.innerWidth}
//           height={window.innerHeight / 2}
//           fill="green"
//         >
//           <Layer x={20} y={20}>
//             <RandomCard loadImage={this.loadImage} />
//           </Layer>
//           <Layer
//             x={120}
//             y={20}
//             width={window.innerWidth}
//             height={window.innerHeight / 2}
//           >
//             <CardBack className="cardBack" />
//             {this.props.hiddenCard ? (
//               <NewRandomCard
//                 className="newRandomCard"
//                 loadImage={this.loadImage()}
//                 image={this.state.image}
//                 number={this.state.number}
//                 number={this.state.number}
//               />
//             ) : null}
//           </Layer>
//           <ShownList />
//         </Stage>
//         <div>
//           Already shown cards list:
//           <ul>
//             {this.props.shown.map((it) => (
//               <li key={it.id} className="listItem">
//                 {it.number} {it.sign}
//               </li>
//             ))}
//           </ul>
//           Guesed cards list:
//           <ul>
//             {this.props.guessedCards &&
//               this.props.guessedCards.map((it) => (
//                 <li key={it.id} className="listItem">
//                   {it.number} {it.sign} {it.biggerOrSmaller}
//                 </li>
//               ))}
//           </ul>
//         </div>
//       </div>
//     );
//   }
// }

// const CardBack = (prop) => {
//   const [image] = useImage(cardBack);
//   return (
//     <Image
//       image={image}
//       x={ww / 2}
//       y={wh / 20}
//       width={ww / 10}
//       height={ww / 7}
//     />
//   );
// };

// const mapStateToProps = ({
//   game,
//   cards,
//   notShown,
//   shown,
//   start,
//   hiddenCard,
//   success,
//   firstStart,
//   reset,
//   guessedCards,
//   lastGuessed,
// }) => ({
//   game,
//   cards,
//   notShown,
//   shown,
//   start,
//   hiddenCard,
//   success,
//   firstStart,
//   reset,
//   guessedCards,
//   lastGuessed,
// });
// const mapDispatchToProps = {
//   excludeCurrent,
//   moveToShown,
//   setStartBoolean,
//   showHiddenCard,
//   setSuccessBoolean,
//   firstStartChange,
//   resetGame,
//   startComparing,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Cardboard);
