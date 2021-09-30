import { PlayerFactory } from "../factories/Player";
import { GameboardFactory } from "../factories/Gameboard";

describe("Player functions", () => {
  let testUser;
  let testEnemy;
  let testGameboardUser;
  let testGameboardEnemy;
  beforeEach(() => {
    testGameboardUser = GameboardFactory(4);
    testGameboardEnemy = GameboardFactory(4);
    testGameboardUser.placeShip({
      position: 0,
      type: "medium",
      orientation: "vertical",
    });
    testGameboardUser.placeShip({
      position: 3,
      type: "small",
      orientation: "horizontal",
    });
    testGameboardUser.placeShip({
      position: 13,
      type: "large",
      orientation: "horizontal",
    });
    testGameboardEnemy.placeShip({
      position: 4,
      type: "medium",
      orientation: "horizontal",
    });
    testGameboardEnemy.placeShip({
      position: 7,
      type: "large",
      orientation: "vertical",
    });
    testGameboardEnemy.placeShip({
      position: 12,
      type: "small",
      orientation: "horizontal",
    });
    testUser = PlayerFactory(testGameboardUser, false);
    testEnemy = PlayerFactory(testGameboardEnemy, true);
    testUser.setEnemy(testEnemy);
    testEnemy.setEnemy(testUser);
  });

  it("Take turn and fail", () => {
    testUser.makeMove(1);
    expect(testUser.isTurn()).toBe(true);
    expect(testEnemy.isTurn()).toBe(false);
    testUser.makeMove(8);
    expect(testUser.isTurn()).toBe(false);
    expect(testEnemy.isTurn()).toBe(true);
  });

  it("Take turn and attack", () => {
    testUser.makeMove(4);
    testUser.makeMove(5);
    testUser.makeMove(12);
    testUser.makeMove(7);
    testUser.makeMove(11);
    testUser.makeMove(15);
    expect(testEnemy.getBoard().gameOver()).toBe(true);
  });

  it("Play Machine", () => {
    testEnemy.playMachine();
    testEnemy.playMachine();
    testEnemy.playMachine();
    testEnemy.playMachine();
    testEnemy.playMachine();
    testEnemy.playMachine();
    testEnemy.playMachine();
    testEnemy.playMachine();
    testEnemy.playMachine();
    testEnemy.playMachine();
    testEnemy.playMachine();
    testEnemy.playMachine();
    testEnemy.playMachine();
    testEnemy.playMachine();
    testEnemy.playMachine();
    testEnemy.playMachine();
    expect(testUser.getBoard().gameOver()).toBe(true);
  });
});
