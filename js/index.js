const board = document.querySelectorAll('.col');
const robotButton = document.querySelector('.icon-button');

let moveCount = 0;
let isXTurn = true;
let isAgainstComputer = false;

const handleOnRobotClick = () => {
  if (!isAgainstComputer) {
    robotButton.classList.add('icon-button-active');
  } else {
    robotButton.classList.remove('icon-button-active');
  }
  isAgainstComputer = !isAgainstComputer;
  resetGame();
};

const handleOnSquareClick = (id) => {
  const square = document.querySelector(`#${id}`);

  if (square.textContent) {
    return swal('Square is already taken. Please pick an empty one!');
  }

  square.textContent = isXTurn ? 'X' : 'O';
  afterMoveProcess();

  if (isAgainstComputer && moveCount > 0) {
    setTimeout(() => {
      computerMove();
      afterMoveProcess();
    }, 300);
  }
};

const afterMoveProcess = () => {
  const didWin = checkForWin();
  if (didWin) {
    moveCount = -1;
    let title;
    if (isAgainstComputer) {
      title = isXTurn ? 'You' : 'Computer';
    } else {
      title = isXTurn ? 'X' : 'O';
    }
    setTimeout(() => {
      swal({
        title,
        text: 'won this round!',
        button: 'Play again!',
      }).then(() => {
        resetGame();
      });
    }, 100);
  }

  isXTurn = !isXTurn;
  moveCount++;

  if (moveCount === 9) {
    moveCount = -1;
    setTimeout(() => {
      swal({
        title: "It's a DRAW!",
        button: 'Play again!',
      }).then(() => {
        resetGame();
      });
    }, 100);
  }
};

const computerMove = () => {
  let hasComputerMoved = false;
  while (!hasComputerMoved) {
    const randomId = getRandomSquareId();
    const square = document.querySelector(`#${randomId}`);
    if (!square.textContent) {
      square.textContent = isXTurn ? 'X' : 'O';
      hasComputerMoved = true;
    }
  }
};

const getRandomSquareId = () => {
  const randomRow = Math.floor(Math.random() * 3 + 1);
  const randomColumn = Math.floor(Math.random() * 3 + 1);
  return `square-${randomRow}${randomColumn}`;
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
  const compareValue = document.querySelector(
    `#square-${direction ? '3' : '1'}1`
  ).textContent;
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
