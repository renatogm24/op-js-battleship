import { publish, subscribe } from "./helpers/pubsub";
import { GameboardFactory, getShipPositions } from "./factories/Gameboard";
import { PlayerFactory } from "./factories/Player";

const gameController = (function () {
  let sizeSelected;
  let testUser;
  let testEnemy;
  let typeGame;
  let choseCont;
  let turnCont;

  subscribe("initGame", function () {
    sizeSelected = document.querySelector(".sizeSelector selected");
    testUser = PlayerFactory(GameboardFactory(sizeSelected), true);
    testEnemy = PlayerFactory(GameboardFactory(sizeSelected), false);
    testUser.setEnemy(testEnemy);
    testEnemy.setEnemy(testUser);
    typeGame = document.querySelectorAll(".typeGame")[1].id;
    choseCont = 1;
    turnCont = 1;
    document.querySelector("#title2").textContent = "Player 1 board";
    document.querySelector(".board0").style.display = "block";
  });

  subscribe("gameChangeGrid", function (dimension) {
    sizeSelected = dimension;
    testUser.setBoard(randomShips(GameboardFactory(dimension)));
    testEnemy.setBoard(randomShips(GameboardFactory(dimension)));
    let userToPlay = testUser.isTurn() ? testUser : testEnemy;
    publish("renderBoard", userToPlay);
  });

  subscribe("gameRandomGrid", function () {
    let userToPlay = testUser.isTurn() ? testUser : testEnemy;
    userToPlay.setBoard(randomShips(GameboardFactory(sizeSelected)));
    publish("renderBoard", userToPlay);
  });

  subscribe("startGame", function () {
    if (typeGame === "vsMachine") {
      let userToPlay = testUser.isTurn() ? testUser : testEnemy;
      document.querySelector("#player").style.display = "none";
      document.querySelector(".level").style.display = "none";
      document.querySelector(".result").style.display = "none";
      document.querySelector(".attackResult").style.display = "block";
      publish("renderBoard", userToPlay);
    } else {
      if (choseCont === 1) {
        testEnemy.setTurn();
        testUser.setTurn();
        document.querySelector("#player").style.display = "none";
        document.querySelector(".level").style.display = "none";
        document.querySelector("#title2").textContent = "Player 2 board";
        //document.querySelector(".result").style.display = "none";
        //document.querySelector(".attackResult").style.display = "block";
        publish("renderBoard", testEnemy);
        choseCont += 1;
      } else if (choseCont === 2) {
        document.querySelector("#player").style.display = "none";
        document.querySelector(".level").style.display = "none";
        //document.querySelector(".result").style.display = "none";
        document.querySelector(".board0").style.display = "none";
        document.querySelector(".attackResult").style.display = "none";
        document.querySelector("#random").style.display = "none";
        document.querySelector("#start").textContent = "Pass phone";
        document.querySelector("#title2").textContent = "";
        publish("renderBoard", testUser);
        choseCont += 1;
      } else if (choseCont === 3) {
        testEnemy.setTurn();
        testUser.setTurn();
        document.querySelector("#title2").textContent = "Player 1 board";
        document.querySelector(".board0").style.display = "block";
        document.querySelector("#player").style.display = "none";
        document.querySelector(".level").style.display = "none";
        document.querySelector(".result").style.display = "none";
        document.querySelector(".attackResult").style.display = "block";
        publish("renderBoard", testUser);
      }
    }
  });

  subscribe("startAttack", function () {
    let userToPlay = testUser.isTurn() ? testUser : testEnemy;
    let nameBoard = testUser.isTurn() ? "Player 2 board" : "Player 1 board";
    publish("renderBoardEnemy", userToPlay.getEnemy());
    document.querySelector(".attackResult").style.display = "none";
    if (typeGame === "vsMachine") {
      document.querySelector("#title2").textContent = "Machine board";
    } else {
      document.querySelector("#title2").textContent = nameBoard;
    }
  });

  subscribe("onMakeMove", function (index) {
    let userToPlay = testUser.isTurn() ? testUser : testEnemy;
    let nameBoard = testUser.isTurn() ? "Player 1" : "Player 2";
    let hitShip = userToPlay.makeMove(index);
    if (hitShip) {
      if(userToPlay.getEnemy().getBoard().gameOver()){
        document.querySelector("#player").style.display = "none";
        document.querySelector(".level").style.display = "none";
        document.querySelector(".result").style.display = "none";
        document.querySelector(".board0").style.display = "none";
        document.querySelector("#random").style.display = "none";
        document.querySelector(".attackResult").style.display = "block";
        document.querySelector("#start").style.display = "none";
        document.querySelector("#attack").style.display = "none";
        document.querySelector("#restart").style.display = "block";
        document.querySelector("#opponent").style.display = "none";
        document.querySelector("#title2").textContent = `${nameBoard} win!`;
      }
      publish("renderBoardEnemy", userToPlay.getEnemy());
    } else {
      publish("renderBoardEnemy2", userToPlay.getEnemy());
      document.querySelector("#attack").style.display = "none";
      document.querySelector("#opponent").style.display = "block";
      document.querySelector(".attackResult").style.display = "block";
    }
  });

  subscribe("opponentTurn", function () {
    if (typeGame === "vsMachine") {
      testEnemy.playMachine();
      publish("renderBoard", testUser);
      document.querySelector("#attack").style.display = "block";
      document.querySelector("#opponent").style.display = "none";
      document.querySelector("#title2").textContent = "Player 1 board";
    } else {
      if (turnCont % 2 !== 0) {
        document.querySelector("#player").style.display = "none";
        document.querySelector(".level").style.display = "none";
        document.querySelector(".result").style.display = "none";
        document.querySelector(".board0").style.display = "none";
        document.querySelector("#random").style.display = "none";
        document.querySelector("#start").style.display = "none";
        document.querySelector("#attack").style.display = "none";
        document.querySelector("#restart").style.display = "none";
        document.querySelector("#opponent").textContent = "Pass phone";
        document.querySelector("#title2").textContent = "";
        turnCont += 1;
      } else if (turnCont % 2 === 0) {
        let userToPlay = testUser.isTurn() ? testUser : testEnemy;
        let nameBoard = testUser.isTurn() ? "Player 1 board" : "Player 2 board";
        document.querySelector(".board0").style.display = "block";
        document.querySelector("#player").style.display = "none";
        document.querySelector(".level").style.display = "none";
        document.querySelector(".result").style.display = "none";
        document.querySelector(".attackResult").style.display = "block";
        document.querySelector("#attack").style.display = "block";
        document.querySelector("#restart").style.display = "block";
        document.querySelector("#opponent").textContent = "Opponent";
        document.querySelector("#opponent").style.display = "none";
        document.querySelector("#title2").textContent = nameBoard;
        publish("renderBoard", userToPlay);
        turnCont += 1;
      }
    }
  });

  subscribe("typeSelected", function (type) {
    typeGame = type;
  });

  subscribe("restartGame", function () {
    publish("init");
  });
})();

function randomShips(gameBoard) {
  //Short verison
  /*
  gameBoard.placeShip({
    position: 0,
    type: "large",
    orientation: "vertical",
  });
  gameBoard.placeShip({
    position: 7,
    type: "large",
    orientation: "vertical",
  });
  gameBoard.placeShip({
    position: 3,
    type: "medium",
    orientation: "horizontal",
  });
  gameBoard.placeShip({
    position: 23,
    type: "medium",
    orientation: "horizontal",
  });
  gameBoard.placeShip({
    position: 20,
    type: "small",
    orientation: "horizontal",
  });
  return gameBoard;
  */

  //Intermediate Version
  let possiblePositions = [...gameBoard.getBoardArray()];
  const possibleOrientations = ["vertical", "horizontal"];
  const dimension = Math.sqrt(possiblePositions.length);
  const shipArray = ["large", "large", "medium", "medium", "small"];
  shipArray.forEach((ship) => {
    let addBool = true;
    while (addBool) {
      let randomPosition = Math.floor(Math.random() * possiblePositions.length);
      let randomOrientation = Math.floor(
        Math.random() * possibleOrientations.length
      );
      let possibleShipArray = getShipPositions(
        randomPosition,
        ship,
        possibleOrientations[randomOrientation],
        dimension
      );
      if (possibleShipArray === null) {
        continue;
      }
      if (
        possibleShipArray.every((element) => possiblePositions[element] === " ")
      ) {
        possibleShipArray.forEach(
          (element) => (possiblePositions[element] = "O")
        );
        gameBoard.placeShipWhithArray(possibleShipArray);
        addBool = false;
      }
    }
  });
  return gameBoard;
  //Long version

  /*
      const possibleOrientations = ["vertical", "horizontal"];
  let cont = 0;
  let possiblePositions;
  let boardArray;
  while (cont < 5) {
    boardArray = gameBoard.getBoardArray();
    possiblePositions = [];
    boardArray.forEach((element) => {
      if (element === " ") possiblePositions.push(boardArray.indexOf(element));
    });
    let currentSize;
    let randomPosition = Math.floor(Math.random() * possiblePositions.length);
    if (cont >= 0 && cont < 2) {
      currentSize = gameBoard.ships.length;
      while (gameBoard.ships.length <= currentSize) {
        gameBoard.placeShip({
          position: randomPosition,
          type: "large",
          orientation:
            possibleOrientations[
              Math.floor(Math.random() * possibleOrientations.length)
            ],
        });
      }
      cont += 1;
    } else if (cont >= 2 && cont < 4) {
      currentSize = gameBoard.ships.length;
      while (gameBoard.ships.length <= currentSize) {
        gameBoard.placeShip({
          position: Math.floor(Math.random() * possiblePositions.length),
          type: "medium",
          orientation:
            possibleOrientations[
              Math.floor(Math.random() * possibleOrientations.length)
            ],
        });
      }
      cont += 1;
    } else if (cont >= 4 && cont < 5) {
      currentSize = gameBoard.ships.length;
      while (gameBoard.ships.length <= currentSize) {
        gameBoard.placeShip({
          position: Math.floor(Math.random() * possiblePositions.length),
          type: "small",
          orientation:
            possibleOrientations[
              Math.floor(Math.random() * possibleOrientations.length)
            ],
        });
      }
      cont += 1;
    }
  }
  gameBoard.setBoardArray(boardArray);
  return gameBoard;
  //5 ships: 2 bigs, 2 medium, 1 small
  */
}

export { gameController };
