import { ShipFactory } from "../factories/Ship";

const GameboardFactory = (dimension) => {
  const boardArray = [];
  const ships = [];

  for (let index = 0; index < dimension ** 2; index++) {
    boardArray.push(" ");
  }

  function placeShip(shipDetail) {
    const long = longByType(shipDetail.type);
    const positionsArray = getShipPositions(
      shipDetail.position,
      long,
      shipDetail.orientation,
      parseInt(dimension,10)
    );
    if (positionsArray !== null) {
      let addBool = true;
      positionsArray.forEach((element) => {
        if (boardArray[element] === " ") {
          boardArray[element] = "O";
        } else {
          addBool = false;
          return;
        }
      });
      addBool ? ships.push(ShipFactory(positionsArray)) : null;
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
    } else {
      boardArray[position] = "N";
    }
  }

  function getBoardArray() {
    return boardArray;
  }

  const gameOver = () => ships.every((ship) => ship.isSunk());

  return { placeShip, ships, receiveAttack, gameOver, getBoardArray };
};

function getShipPositions(start, long, orientation, dimension) {
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

export { GameboardFactory };
