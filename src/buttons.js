import { publish, subscribe } from "./helpers/pubsub";

const buttonView = (function () {
  function onButtonSelected(dimension) {
    publish("askRenderBoard", dimension);
  }

  subscribe("renderSizeButtons", function () {
    const buttonSizes = document.querySelectorAll(".sizeSelector");
    buttonSizes.forEach((element) => {
      element.addEventListener("click", (e) => {
        onButtonSelected(e.target.closest(".sizeSelector").id);
        element.classList.add("selected");
        buttonSizes.forEach((elementAux) => {
          if (elementAux !== element) elementAux.classList.remove("selected");
        });
      });
    });
  });
})();

const buttonController = (function () {
  subscribe("askRenderBoard", function (dimension) {
    publish("gameChangeGrid", dimension);
  });
})();

export { buttonView, buttonController };
