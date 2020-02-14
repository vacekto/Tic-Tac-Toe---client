import React, { useEffect, useState } from "react"
import "./VictoryPopup.css"

const VictoryPopup = ({ winner, socket, resetBoard, mode, board, history }) => {
  const [ready, setReady] = useState(false);
  const [opponentReady, setOpponentReady] = useState(false);
  const victoryStyle = (mode === "hotSeat") ?
    ({ width: "100%" }) : ({  width:"60%" });

  useEffect(() => {
    socket.once('opponent left', () => {
      board.setState({ displayOpponentLeftPopup: true })
    });

    socket.once("play again", () => {
      setOpponentReady(true);
    })
  }, [])

  useEffect(() => {
    if (ready && opponentReady) {
      resetBoard();
    }
  }, [ready, opponentReady]);

  const playAgain = () => {
    if (mode !== "hotSeat") {
      setReady(true)
      socket.emit("play again");
    } else {
      resetBoard();
    }
  }

  const leave = () => {
    socket.emit("opponent left");
    history.push("/");
  }

  return (
    <div style={{ width: "100%", display:"flex"}}>
      <div className="victory" style={victoryStyle}>
        <span className="text">{`${winner} wins this round`}</span>
        <div className="optionsContainer">
          <button className="options" onClick={playAgain}> Play again</button>
          <button className="options" onClick={leave}>Main menu </button>
        </div>
      </div>
      {(opponentReady) ? (
          <div className="opponentReady" style={{width:"40%"}}>
            Opponent wants <br /> to play again!
          </div>
        ) : (null)}
    </div>

  )
}

export default VictoryPopup;