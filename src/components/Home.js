import React, { Component } from "react";
import { connect } from "react-redux";
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
const mapStateToProps = ({ cards }) => {
  return { cards };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
