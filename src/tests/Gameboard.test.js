import { GameboardFactory } from "../factories/Gameboard";

describe("Gameboard functions", () => {
  let testGameboard;
  beforeEach(() => {
    testGameboard = GameboardFactory(4);
  });

  it("Place new ship 1", () => {
    testGameboard.placeShip({
      position: 0,
      type: "medium",
      orientation: "horizontal",
    });
    expect(testGameboard.ships[0].positions).toStrictEqual([0, 1]);
  });

  it("Place new ship 2", () => {
    const arrayTest = [];
    testGameboard.placeShip({
      position: 3,
      type: "large",
      orientation: "vertical",
    });
    testGameboard.placeShip({
      position: 0,
      type: "large",
      orientation: "vertical",
    });
    testGameboard.placeShip({
      position: 0,
      type: "medium",
      orientation: "horizontal",
    });
    testGameboard.ships.forEach((element) => {
      arrayTest.push(element.positions);
    });
    expect(arrayTest).toStrictEqual([
      [3, 7, 11],
      [0, 4, 8],
    ]);
  });

  it("Receive attack", () => {
    testGameboard.placeShip({
      position: 0,
      type: "medium",
      orientation: "horizontal",
    });
    testGameboard.receiveAttack(0);
    testGameboard.receiveAttack(1);
    expect(testGameboard.ships[0].isSunk()).toStrictEqual(true);
  });

  it("All ship are sunk", () => {
    testGameboard.placeShip({
      position: 0,
      type: "medium",
      orientation: "horizontal",
    });
    testGameboard.placeShip({
      position: 3,
      type: "medium",
      orientation: "vertical",
    });
    testGameboard.receiveAttack(0);
    testGameboard.receiveAttack(1);
    testGameboard.receiveAttack(3);
    expect(testGameboard.gameOver()).toStrictEqual(false);
    testGameboard.receiveAttack(7);
    expect(testGameboard.gameOver()).toStrictEqual(true);
  });
});
