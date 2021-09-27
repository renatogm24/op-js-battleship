const ShipFactory = (positions) => {
  const hitArray = [];
  const hit = (number) => hitArray.push(number);
  const isSunk = () => positions.every((current) => hitArray.includes(current));
  return { hit, isSunk, hitArray, positions };
};

export { ShipFactory };
