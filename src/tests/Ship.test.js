import { ShipFactory } from "../factories/Ship";

describe("Ship functions", () => {
  let testShip;
  beforeEach(() => {
    testShip = ShipFactory([0, 1, 2, 3]);
  });

  it("Hit Ship", () => {
    testShip.hit(0);
    testShip.hit(1);
    expect(testShip.hitArray).toStrictEqual([0, 1]);
  });

  it("Is Ship sunk?", () => {
    testShip.hit(0);
    testShip.hit(1);
    expect(testShip.isSunk()).toBe(false);
    testShip.hit(2);
    testShip.hit(3);
    expect(testShip.isSunk()).toBe(true);
  });
});
