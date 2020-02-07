import React from "react"
import Square from "../Square/Square.js"
import "./Row.css"

class Row extends React.Component {

  shouldComponentUpdate(nextProps){
    return (JSON.stringify(this.props.row) === JSON.stringify(nextProps.row)) ?
      false : true
  }

  render() {
    const { row, rowIndex, handleClick, squareKeys } = this.props;
    const squares = row.map((square, index) => {
      return <Square
        value={square}
        columnIndex={index}
        rowIndex={rowIndex}
        handleClick={handleClick}
        key={squareKeys[index]}
      />
    })
    return (
      <div className="row">
        {squares}
      </div>
    )
  }
}

export default Row;