import { createDOM } from "./helpers/DOMhelper";
import { publish, subscribe } from "./helpers/pubsub";

const boardView = (function () {
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
      if (arrayBoard[index] === "O") {
        element = createDOM("button", { id: index, class: "sq ship" });
      }else{
        element = createDOM("button", { id: index, class: "sq" });
      }
      
      const pDiv = createDOM("p", {});
      element.append(pDiv);
      divBoard.append(element);
    }
    oldDivBoard.append(divBoard);
  });
})();

const boardController = (function () {})();

export { boardView, boardController };
