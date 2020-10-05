import React, { Component } from "react";
import Game from "./components/Game";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <div className="min">
            <Game />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
