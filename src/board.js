import { createDOM } from "./helpers/DOMhelper";
import { publish, subscribe } from "./helpers/pubsub";

const boardView = (function () {
  const colorsArray = [];
  for (let index = 0; index < 20; index++) {
    colorsArray.push(getRandomColor());
  }
  subscribe("renderBoard", function (player) {
    const arrayBoard = player.getBoard().getBoardArray();
    const dimension = Math.sqrt(arrayBoard.length);
    const oldDivBoard = document.querySelector(".board0");
    oldDivBoard.textContent = "";
    const divBoard = createDOM("div", { class: "board" });
    divBoard.style["grid-template-columns"] = `repeat(${dimension},1fr)`;
    divBoard.style["grid-template-rows"] = `repeat(${dimension},1fr)`;

    for (let index = 0; index < arrayBoard.length; index++) {
      let element;
      if (arrayBoard[index] !== " " && arrayBoard[index] !== "X" && arrayBoard[index] !== "N") {
        element = createDOM("button", { id: index, class: "sq" });
        element.style["background-color"] = colorsArray[arrayBoard[index]];
      } else if(arrayBoard[index] === "X"){
        element = createDOM("button", { id: index, class: "sq hit" });
        element.style["background-color"] = colorsArray[arrayBoard[index]];
        element.textContent = "X";
      }else if(arrayBoard[index] === "N"){
        element = createDOM("button", { id: index, class: "sq miss" });
        element.style["background-color"] = colorsArray[arrayBoard[index]];
        element.textContent = "X";
      }else
      {
        element = createDOM("button", { id: index, class: "sq" });
      }

      const pDiv = createDOM("p", {});
      element.append(pDiv);
      divBoard.append(element);
    }
    oldDivBoard.append(divBoard);
  });

  function onMakeMove(index) {
    publish("onMakeMove", index);
  }

  subscribe("renderBoardEnemy", function (player) {
    const arrayBoard = player.getBoard().getBoardArray();
    const dimension = Math.sqrt(arrayBoard.length);
    const oldDivBoard = document.querySelector(".board0");
    oldDivBoard.textContent = "";
    const divBoard = createDOM("div", { class: "board" });
    divBoard.style["grid-template-columns"] = `repeat(${dimension},1fr)`;
    divBoard.style["grid-template-rows"] = `repeat(${dimension},1fr)`;

    for (let index = 0; index < arrayBoard.length; index++) {
      let element;
      if (arrayBoard[index] !== " " && arrayBoard[index] !== "X" && arrayBoard[index] !== "N") {
        element = createDOM("button", { id: index, class: "sq" });
        element.addEventListener("click", (e) => {
          onMakeMove(index);
        });
      } else if(arrayBoard[index] === "X"){
        element = createDOM("button", { id: index, class: "sq hit" });
        element.style["background-color"] = colorsArray[arrayBoard[index]];
        element.textContent = "X";
      }else if(arrayBoard[index] === "N"){
        element = createDOM("button", { id: index, class: "sq miss" });
        element.style["background-color"] = colorsArray[arrayBoard[index]];
        element.textContent = "X";
      }else
      {
        element = createDOM("button", { id: index, class: "sq" });
        element.addEventListener("click", (e) => {
          onMakeMove(index);
        });
      }

      const pDiv = createDOM("p", {});
      element.append(pDiv);
      divBoard.append(element);
    }
    oldDivBoard.append(divBoard);
  });

  subscribe("renderBoardEnemy2", function (player) {
    const arrayBoard = player.getBoard().getBoardArray();
    const dimension = Math.sqrt(arrayBoard.length);
    const oldDivBoard = document.querySelector(".board0");
    oldDivBoard.textContent = "";
    const divBoard = createDOM("div", { class: "board" });
    divBoard.style["grid-template-columns"] = `repeat(${dimension},1fr)`;
    divBoard.style["grid-template-rows"] = `repeat(${dimension},1fr)`;
  
    for (let index = 0; index < arrayBoard.length; index++) {
      let element;
      if (arrayBoard[index] !== " " && arrayBoard[index] !== "X" && arrayBoard[index] !== "N") {
        element = createDOM("button", { id: index, class: "sq" });
      } else if(arrayBoard[index] === "X"){
        element = createDOM("button", { id: index, class: "sq hit" });
        element.style["background-color"] = colorsArray[arrayBoard[index]];
        element.textContent = "X";
      }else if(arrayBoard[index] === "N"){
        element = createDOM("button", { id: index, class: "sq miss" });
        element.style["background-color"] = colorsArray[arrayBoard[index]];
        element.textContent = "X";
      }else
      {
        element = createDOM("button", { id: index, class: "sq" });
      }
  
      const pDiv = createDOM("p", {});
      element.append(pDiv);
      divBoard.append(element);
    }
    oldDivBoard.append(divBoard);
  });

})();




function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const boardController = (function () {})();

export { boardView, boardController };
