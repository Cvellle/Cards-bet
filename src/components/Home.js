import React, { Component } from "react";
import Cardboard from "../components/Cardboard";
import Interface from "../components/Interface";
import "./css/home.css";

class Home extends Component {
  render() {
    return (
      <div>
        <Cardboard />
        <Interface />
      </div>
    );
  }
}

export default Home;
