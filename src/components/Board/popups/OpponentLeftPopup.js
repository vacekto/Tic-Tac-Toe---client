import React from "react"
import "./OpponentLeftPopup.css"

const OpponentLeftPopup = (props) => {

  return(
    <div className="opponentLeftPopup">
      <div className="ok">
        <span>Opponent left the game</span>
        <button id="leftBtn" onClick={props.goToMenu}>Menu</button>
      </div>
    </div>
  )
}

export default OpponentLeftPopup;