import React from 'react';
import './App.css';
import Board from "./components/Board/Board.js"
import Menu from "./components/Menu/Menu.js"
import { BrowserRouter, Route } from "react-router-dom"
import io from "socket.io-client"

class App extends React.Component {
  state = {
    mode: "hotSeat",
    socket: io("https://react-tic-tac-toe-magicturtle.herokuapp.com/")
  }
  
  render(){
    console.log(this.state.socket)
    return (
      <BrowserRouter>
        <div className="App">
          <Route
            exact path="/"
            render={props =>
              <Menu
                {...props}
                menu={this}
                socket={this.state.socket}
              />}
          />
          <Route
            path="/newGame"
            render={props =>
              <Board
                {...props}
                menu={this}
                mode={this.state.mode}
                socket={this.state.socket}
              />}
          />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
