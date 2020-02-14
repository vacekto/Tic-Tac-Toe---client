import React from 'react';
import './App.css';
import Board from "./components/Board/Board.js"
import Menu from "./components/Menu/Menu.js"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import io from "socket.io-client"
import { CSSTransition, TransitionGroup } from "react-transition-group";


class App extends React.Component {
  state = {
    mode: "hotSeat",
    socket: io("http://localhost:5000/")
  }

  setMode = (mode, callback) => {
    this.setState({ mode: mode }, callback)
  }

  render() {
    return (
      <BrowserRouter>
        <Route render={({ location }) => (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={1000}
              classNames="fade"
            >
              <div className="App">
                <Switch location={location}>
                  <Route
                    exact path="/"
                    render={props =>
                      <Menu
                        {...props}
                        mode={this.mode}
                        setMode={this.setMode}
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
                </Switch>
              </div>
            </CSSTransition>
          </TransitionGroup>
        )} />
      </BrowserRouter>
    )
  }
}

export default App;
