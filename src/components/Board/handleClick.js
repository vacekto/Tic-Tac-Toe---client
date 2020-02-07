const update = function (row, column) {
  if (this.state.status[row][column] === null) {
    const update = JSON.parse(JSON.stringify(this.state.status));
    update[row][column] = this.state.isPlaying;
    this.setState({
      status: update
    }, () => {
      checkWinner.call(this, row, column);
    })
  }
}

const checkWinner = function (row, column) {
  let isWinner = false;
  let _row = row;
  let _column = column;
  const { status, isPlaying, socket } = this.state;

  const directions = [
    [() => { _row++; },           () => { _row-- }           ],
    [() => { _row++; _column++ }, () => { _row--; _column-- }],
    [() => { _column++ },         () => { _column-- }        ],
    [() => { _row--; _column++ }, () => { _row++; _column-- }]
  ];

  directions.forEach((line) => {
    let counter = 1
    _row = row;
    _column = column;
    while (true) {
      line[0]();
      if (status[_row] && status[_row][_column] === isPlaying) {
        counter++;
      } else {
        break;
      }
    }

    _row = row;
    _column = column;
    while (true) {
      line[1]();
      if (status[_row] && status[_row][_column] === isPlaying) {
        counter++;
      } else {
        break;
      }
    }
    if (counter >= 5) {
      isWinner = true;
    }
  })

  if (isWinner) {
    this.setState({
      displayVictoryPopup: true
    }, () => {
      if (this.state.mode !== "hotSeat") {
        socket.emit("I won", [row,column]);
      }
    })
  } else {
    this.setState((prevState) => {
      return {
        isPlaying: (prevState.isPlaying === "X") ? "O" : "X",
      }
    }, () => {
      if (this.state.mode !== "hotSeat") {
        socket.emit("update", [row, column]);
      }
    })
  }
}

export { update };