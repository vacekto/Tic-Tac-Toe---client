import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./VictoryPopup.css"

const VictoryPopup = ({ winner, socket, resetBoard, mode }) => {
  const [ready, setReady] = useState(false);
  const [opponentReady, setOpponentReady] = useState(false);

  if (mode !== "hotSeat") {
    socket.on("play again", () => {
      setOpponentReady(true);
    })
  }


  useEffect(() => {
    if (ready && opponentReady) {
      resetBoard();
    }
  }, [resetBoard, ready, opponentReady]);

  const playAgain = () => {
    if (mode !== "hotSeat") {
      setReady(true)
      socket.emit("play again");
    } else {
      resetBoard();
    }
  }

  return (
    <div className="victory">
      <span className="text">{`${winner} wins this round`}</span>
      <div className="optionsContainer">
        <button className="options" onClick={playAgain}> Play again</button>
        <Link className="options" to="/">Main menu</Link>
      </div>
      {(opponentReady) ? (
        <div className="oponentReady">
          Opponent wants to play again
        </div>
      ) : (null)}
    </div>
  )
}

export default VictoryPopup;