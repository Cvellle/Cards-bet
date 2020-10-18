import React, { Component } from "react";

import Cardboard from "./Cardboard";
import Interface from "./Interface";
import "./css/basic.css";

class Game extends Component {
  render() {
    return (
      <div>
        <div className="cardboard">
          <Cardboard />
        </div>
        <div className="interface">
          <Interface />
        </div>
      </div>
    );
  }
}

export default Game;
