const PlayerFactory = (board, currentTurn) => {
  let boardFactory = board;
  let turn = currentTurn;
  let enemy;
  function makeMove(position) {
    if (position != null) {
      let hitShip = enemy.getBoard().receiveAttack(position);
      if (!hitShip) {
        setTurn();
        enemy.setTurn();
      }
      return hitShip;
    }
  }

  function playMachine() {
    const enemyBoard = enemy.getBoard().getBoardArray();
    let positionsToMove = [];
    for (let index = 0; index < enemyBoard.length; index++) {
      const element = enemyBoard[index];
      if (element !== "X" && element !== "N") {
        positionsToMove.push(index);
      }
    }

    /*enemyBoard.forEach((element) => {
      if (element !== "X" && element !== "N") {
        positionsToMove.push(enemyBoard.indexOf(element));
      }
    });*/

    if (
      makeMove(
        positionsToMove[Math.floor(Math.random() * positionsToMove.length)]
      )
    ) {
      playMachine();
    }

    /*
    let random;
    let bool = true;
    while (bool) {
      random = Math.floor(Math.random() * positionsToMove.length);
      console.log(random);
      console.log(positionsToMove);
      let move = positionsToMove[random];
      console.log(move);
      if (!makeMove(move)) {
        bool = false;
      }
    }*/
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

  function getEnemy() {
    return enemy;
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
    getEnemy,
    getBoard,
    setBoard,
    setTurn,
    playMachine,
  };
};
export { PlayerFactory };
