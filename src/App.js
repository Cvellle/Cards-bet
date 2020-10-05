import React, { Component } from "react";
import Home from "./components/Home";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <div className="min">
            <Home />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
