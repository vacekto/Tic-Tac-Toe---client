import React, { memo } from "react";
import "./Square.css"

const Square = ({ value, columnIndex, rowIndex, handleClick }) => {
  return (
    <div
      className={`square ${value}`}
      onClick={() => {
        handleClick(rowIndex, columnIndex);
      }} >

    </div>
  )
}

export default memo(Square);