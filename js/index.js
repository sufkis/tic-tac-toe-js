const board = document.querySelectorAll('.col');
let moveCount = 0;
let isXTurn = true;

const handleOnSquareClick = (id) => {
  const [row, col] = id.split('-')[1];
  const square = document.querySelector(`#${id}`);
  if (square.textContent) {
    swal('Square is already taken. Please pick an empty one!');
  } else {
    square.textContent = isXTurn ? 'X' : 'O';
    const didWin = checkForWin();
    if (didWin) {
      swal({
        title: isXTurn ? 'X' : 'O',
        text: "won this round!",
        button: "Play again!",
      });
      return resetGame();
    }
    isXTurn = !isXTurn;
    moveCount++;
  }
  if (moveCount === 9) {
    swal({
      title: "It's a DRAW!",
      button: "Play again!",
    });
    resetGame();
  }
};

const resetGame = () => {
  board.forEach((sqr) => (sqr.textContent = ''));
  isXTurn = true;
  moveCount = 0;
};

const checkForWin = () => {
  if (moveCount < 4) return false;
  for (let i = 1; i < 4; i++) {
    if (checkHorizontal(i)) return true;
    if (checkVertical(i)) return true;
    if (checkDiagonal(i > 2)) return true;
  }
  return false;
};

const checkHorizontal = (row) => {
  console.log("🚀 ~ checkHorizontal ~ row:", row)
  const compareValue = document.querySelector(`#square-${row}1`).textContent;
  if (!compareValue) return false;
  if (
    compareValue === document.querySelector(`#square-${row}2`).textContent &&
    compareValue === document.querySelector(`#square-${row}3`).textContent
  ) {
    return true;
  }
};

const checkVertical = (col) => {
  console.log("🚀 ~ checkVertical ~ col:", col)
  const compareValue = document.querySelector(`#square-1${col}`).textContent;
  if (!compareValue) return false;
  if (
    compareValue === document.querySelector(`#square-2${col}`).textContent &&
    compareValue === document.querySelector(`#square-3${col}`).textContent
  ) {
    return true;
  }
};

const checkDiagonal = (direction) => {
  console.log("🚀 ~ checkDiagonal ~ direction:", `#square-${direction ? '3' : '1'}1`)
  const compareValue = document.querySelector(`#square-${direction ? '3' : '1'}1`).textContent;
  const secondValue = document.querySelector(`#square-22`).textContent;
  if (!compareValue || !secondValue || compareValue !== secondValue) {
    return false;
  }
  if (direction) {
    if (compareValue === document.querySelector(`#square-13`).textContent) {
      return true;
    }
  } else {
    if (compareValue === document.querySelector(`#square-33`).textContent) {
      return true;
    }
  }
};
