import { publish, subscribe } from "./helpers/pubsub";
import { GameboardFactory } from "./factories/Gameboard";
import { PlayerFactory } from "./factories/Player";

const gameController = (function () {
  let testUser;
  let testEnemy;
  let testGameboardUser;
  let testGameboardEnemy;
  const sizeSelected = document.querySelector(".sizeSelector selected");
  testGameboardUser = GameboardFactory(sizeSelected);
  testGameboardEnemy = GameboardFactory(sizeSelected);
  testUser = PlayerFactory(testGameboardUser, true);
  testEnemy = PlayerFactory(testGameboardEnemy, false);
  testUser.setEnemy(testEnemy);
  testEnemy.setEnemy(testUser);
  subscribe("gameChangeGrid", function (dimension) {
    //let userToPlay = testUser.isTurn() ? testUser : testEnemy;
    let newGameboard1 = GameboardFactory(dimension);
    //console.log(newGameboard1.getBoardArray());
    newGameboard1.placeShip({
      position: 0,
      type: "large",
      orientation: "vertical",
    });
    //console.log(newGameboard1.getBoardArray());
    testUser.setBoard(newGameboard1);
    testEnemy.setBoard(GameboardFactory(dimension));
    publish("renderBoard", testUser);
  });
})();

export { gameController };
