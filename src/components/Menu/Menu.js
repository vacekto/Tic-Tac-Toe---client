import React, { useState } from "react"
import "./Menu.css"
import { Link } from "react-router-dom"


const Menu = ({menu, history, socket}) => {
  const [input, setInput] = useState("");
  const [gameId, setGameId] = useState(null);
  const [slide, setSlide] = useState("")


  const clickCreate = () => {
    setGameId("game id: " + socket.id);
    setSlide("slide");
    socket.on("startGame", () => {
      history.push("/newGame");
    })
    menu.setState({
      mode: "host",
      socket: socket
    }, () => {
      socket.emit("createGame");
    });
  }

  const clickJoin = (id) => {
    socket.on("startGame", () => {
      history.push("/newGame");
    })
    menu.setState({
      mode: "guest",
      socket: socket
    }, () => {
      socket.emit("joinGame", id);
    });
  }


  return (
    <div className="menu">
      <div className="headline">
        <h1>Tic Tac Toe</h1>  
      </div>
      <div className="menuContainer">
        <div className="solid">

        </div>
        <div className="label">
          <div>Hot seat</div>
          <div>O</div>
        </div>
        <Link className="hotSeat clickable" to="/newGame" >Hot Seat</Link>
        <div className="label">
          <div>Online</div>
          <div>X</div>
        </div>
        <button className="create clickable" onClick={clickCreate}> 
          Create game
        </button>
        <div className={`gameId ${slide}`}>{gameId}</div>
        <button onClick={(e) => {
          e.preventDefault(); clickJoin(input);}}
          className="join clickable">
          Join game
        </button>        
        <input 
          spellCheck="false"
          placeholder="Game id.."
          type="text" 
          onChange={(e) => setInput(e.target.value)} />
      </div>
    </div>
  )
}

export default Menu