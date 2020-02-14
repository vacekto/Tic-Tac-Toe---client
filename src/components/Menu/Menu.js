import React, { useState, useEffect } from "react"
import "./Menu.css"
import { Link } from "react-router-dom"

const Menu = ({ setMode, history, socket }) => {
  const [input, setInput] = useState("");
  const [gameId, setGameId] = useState(null);
  const [slide, setSlide] = useState("");

  const clickCreate = () => {
    setGameId("game id: " + socket.id);
    setSlide("slide");
    socket.emit("createGame");
  };

  const clickJoin = () => {
    socket.emit("joinGame", input)
  };

  useEffect(() => {
    setMode("hotSeat");
    socket.on("joinedGame", () => {
      setMode("guest", () => {
        history.push("/newGame")
      });
    })
    socket.on("createdGame", () => {
      setMode("host", () => {
        history.push("/newGame")
      });
    })
    return () => {
      socket.removeAllListeners("createGame");
      socket.removeAllListeners("joineGame");
      socket.removeAllListeners("createdGame");
      socket.removeAllListeners("joinedGame");
    }
  }, []);

  return (
    <div className="menu">
      <div className="headline">
        <h1>Tic Tac Toe</h1>
      </div>
      <div className="menuContainer">
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
        <button onClick={() => {
          clickJoin();
        }}
          className="join clickable">
          Join game
        </button>
        <input
          className="idInput"
          spellCheck="false"
          placeholder="Game id.."
          type="text"
          onChange={(e) => setInput(e.target.value)} />
      </div>
    </div>
  )
}

export default Menu