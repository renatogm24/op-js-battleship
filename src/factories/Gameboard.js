import { ShipFactory } from "../factories/Ship";

const GameboardFactory = (dimension) => {
  let boardArray = [];
  const ships = [];
  let cont = 1;

  for (let index = 0; index < dimension ** 2; index++) {
    boardArray.push(" ");
  }

  function placeShip(shipDetail) {
    //const long = longByType(shipDetail.type);
    const positionsArray = getShipPositions(
      shipDetail.position,
      shipDetail.type,
      shipDetail.orientation,
      parseInt(dimension, 10)
    );
    if (positionsArray !== null) {
      let arraytoAdd = [];
      let addBool = true;
      for (let index = 0; index < positionsArray.length; index++) {
        const element = positionsArray[index];
        if (boardArray[element] === " ") {
          arraytoAdd.push(element);
        } else {
          addBool = false;
          break;
        }
      }

      if (addBool) {
        arraytoAdd.forEach((element) => (boardArray[element] = `${cont}`));
        ships.push(ShipFactory(positionsArray));
        cont += 1;
      }
    }
  }

  function placeShipWhithArray(positionsArray) {
    if (positionsArray !== null) {
      let arraytoAdd = [];
      let addBool = true;
      for (let index = 0; index < positionsArray.length; index++) {
        const element = positionsArray[index];
        if (boardArray[element] === " ") {
          arraytoAdd.push(element);
        } else {
          addBool = false;
          break;
        }
      }

      if (addBool) {
        arraytoAdd.forEach((element) => (boardArray[element] = `${cont}`));
        ships.push(ShipFactory(positionsArray));
        cont += 1;
      }
    }
  }

  function receiveAttack(position) {
    if (boardArray[position] !== " ") {
      ships.forEach((element) => {
        if (element.positions.includes(position)) {
          boardArray[position] = "X";
          element.hit(position);
        }
      });
      return true;
    } else {
      boardArray[position] = "N";
      return false;
    }
  }

  function getBoardArray() {
    return boardArray;
  }

  function setBoardArray(val) {
    boardArray = val;
  }

  const gameOver = () => ships.every((ship) => ship.isSunk());

  return {
    placeShip,
    placeShipWhithArray,
    ships,
    receiveAttack,
    gameOver,
    getBoardArray,
    setBoardArray,
  };
};

function getShipPositions(start, type, orientation, dimension) {
  let long = longByType(type);
  const positionsArray = [];
  let cont = 0;
  let current = parseInt(start, 10);
  let increment = orientation === "horizontal" ? 1 : dimension;
  let lineStart =
    orientation === "horizontal" ? Math.floor(start / dimension) : start;
  let lineEnd =
    orientation === "horizontal"
      ? Math.floor((start + increment * (long - 1)) / dimension)
      : start + increment * (long - 1);
  if (lineEnd == lineStart + 1 || lineEnd > dimension ** 2 - 1) {
    return null;
  }

  while (cont < long) {
    positionsArray.push(current);
    current += increment;
    cont += 1;
  }
  return positionsArray;
}

function longByType(type) {
  switch (type) {
    case "small":
      return 1;
      break;
    case "medium":
      return 2;
      break;
    case "large":
      return 3;
      break;
    default:
      break;
  }
}

export { GameboardFactory, getShipPositions };
