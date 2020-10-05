import React, { Component } from "react";
import Cardboard from "../components/Cardboard";
import Interface from "../components/Interface";
import "./css/home.css";

class Home extends Component {
  render() {
    return (
      <div className="home">
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

export default Home;
