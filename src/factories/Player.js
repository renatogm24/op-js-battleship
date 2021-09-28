const PlayerFactory = (board, currentTurn) => {
  let boardFactory = board;
  let turn = currentTurn;
  let enemy;
  function makeMove(position) {
    setTurn();
    enemy.setTurn();
    if (position != null) {
      enemy.getBoard().receiveAttack(position);
    }
  }

  function playMachine() {
    const enemyBoard = enemy.getBoard().getBoardArray();
    let positionsToMove = [];
    enemyBoard.forEach((element) => {
      if (element === " " || element === "O") {
        positionsToMove.push(enemyBoard.indexOf(element));
      }
    });
    const random = Math.floor(Math.random() * positionsToMove.length);
    makeMove(positionsToMove[random]);
  }

  function isTurn() {
    return turn;
  }

  function setTurn() {
    turn = !turn;
  }

  function setEnemy(newEnemy) {
    enemy = newEnemy;
  }

  function getBoard() {
    return boardFactory;
  }

  function setBoard(val) {
    boardFactory = val;
  }

  return {
    makeMove,
    isTurn,
    setEnemy,
    getBoard,
    setBoard,
    setTurn,
    playMachine,
  };
};
export { PlayerFactory };
