import React from 'react';
import './Board.css';
import Row from "../Row/Row.js";
import VictoryPopup from "./popups/VictoryPopup.js";
import OpponentLeftPopup from "./popups/OpponentLeftPopup.js"
import { update } from "./handleClick.js";

const uuidv4 = require('uuid/v4');

class Board extends React.Component {
  state = {
    squareKeys: new Array(10).fill(null, 0).map((key) => uuidv4()),
    rowKeys: new Array(10).fill(null, 0).map((key) => uuidv4()),
    status: new Array(10).fill(new Array(10).fill(null, 0), 0),
    isPlaying: "X",
    mode: this.props.mode,
    socket: this.props.socket,
    displayVictoryPopup: false,
    displayOpponentLeftPopup: false,
  }

  handleClick = (row, column) => {
    if (!this.state.displayVictoryPopup &&
      !this.state.displayOpponentLeftPopup) {
      const { mode, isPlaying } = this.state;
      switch (mode) {
        case ("host"):
          if (isPlaying === "X") {
            update.call(this, row, column);
          }
          break;
        case ("guest"):
          if (isPlaying === "O") {
            update.call(this, row, column);
          }
          break;
        default:
          update.call(this, row, column);
      }
    }
  }

  resetBoard = () => {
    this.setState({
      status: new Array(10).fill(new Array(10).fill(null, 0), 0),
      isPlaying: "X",
      displayVictoryPopup: false
    })
  }

  goToMenu = () => {
    if (this.state.mode !== "hotSeat") {
      this.state.socket.emit("opponent left");
      this.props.menu.setState({mode:"hotSeat"})
    }
    this.props.history.push("./");

  }


  componentDidMount() {
    const { socket, mode } = this.state;
    if (mode !== "hotSeat") {
      if (socket.listeners("update")) {
        socket.on("update", (data) => {
          const update = JSON.parse(JSON.stringify(this.state.status));
          update[data[0]][data[1]] = this.state.isPlaying;
          this.setState((prevState) => {
            return {
              status: update,
              isPlaying: (prevState.isPlaying === "X") ? "O" : "X",
            }
          });
        })
      }

      if (socket.listeners("opponent won")) {
        socket.on("opponent won", (data) => {
          const update = JSON.parse(JSON.stringify(this.state.status));
          update[data[0]][data[1]] = this.state.isPlaying;
          this.setState({
            status: update,
            displayVictoryPopup: true
          })
        })
      }

      if (socket.listeners("opponent left")) {
        socket.on('opponent left', () => {
          this.setState({
            displayOpponentLeftPopup: true,
          })
        });
      }
    }
  }

  render() {
    return (
      <div className="boardContainer">
        <div className="board">
          {(this.state.displayVictoryPopup) ? (
            <VictoryPopup
              winner={this.state.isPlaying}
              resetBoard={this.resetBoard}
              socket={this.state.socket}
              mode={this.state.mode}
              history={this.props.history}
            />
          ) : (null)}
          <div className="rows">
            {this.state.status.map((row, index) => {
              return <Row
                row={row}
                rowIndex={index}
                handleClick={this.handleClick}
                squareKeys={this.state.squareKeys}
                key={this.state.rowKeys[index]}
              />
            })}
          </div>
          <div className="panel">
            <button onClick={this.goToMenu}>Quit</button>
            <div>{`Player ${this.state.isPlaying} moves`}</div>
            <button onClick={this.resetBoard}>Reset</button>
          </div>
        </div>
        {(this.state.displayOpponentLeftPopup) ? (
          <OpponentLeftPopup className="OpponentLeft"
            history={this.props.history}
            goToMenu={this.goToMenu} />
        ) : (null)}
      </div>
    );
  }
}

export default Board;