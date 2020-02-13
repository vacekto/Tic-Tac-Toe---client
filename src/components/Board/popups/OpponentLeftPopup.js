import React from "react"
import "./OpponentLeftPopup.css"

const OpponentLeftPopup = ({history}) => {

  return(
    <div className="opponentLeftPopup">
      <div className="ok">
        <span>Opponent left the game</span>
        <button id="leftBtn" onClick={() => {history.push("/");}}>Menu</button>
      </div>
    </div>
  )
}

export default OpponentLeftPopup;