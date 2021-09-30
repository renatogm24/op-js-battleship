import { publish, subscribe } from "./helpers/pubsub";

const buttonView = (function () {
  function onButtonSelected(dimension) {
    publish("askRenderBoard", dimension);
  }

  function onTypeSelected(type) {
    publish("onTypeSelected", type);
  }

  function onRandomSelected() {
    publish("randomSelected");
  }

  function onStartGame() {
    publish("onStartGame");
  }

  function onAttackButton() {
    publish("onAttackButton");
  }

  function onOpponentkButton() {
    publish("onOpponentkButton");
  }

  function onRestartButton() {
    publish("onRestartButton");
  }

  subscribe("renderButtons", function () {
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

    const buttonType = document.querySelectorAll(".typeGame");
    buttonType.forEach((element) => {
      element.addEventListener("click", (e) => {
        onTypeSelected(e.target.closest(".typeGame").id);
        element.classList.add("selected");
        buttonType.forEach((elementAux) => {
          if (elementAux !== element) elementAux.classList.remove("selected");
        });
      });
    });

    const buttonRandom = document.querySelector("#random");
    buttonRandom.addEventListener("click", (e) => {
      onRandomSelected();
    });

    const buttonStart = document.querySelector("#start");
    buttonStart.addEventListener("click", (e) => {
      onStartGame();
    });

    const buttonAttack = document.querySelector("#attack");
    buttonAttack.addEventListener("click", (e) => {
      onAttackButton();
    });

    const buttonOpponent = document.querySelector("#opponent");
    buttonOpponent.addEventListener("click", (e) => {
      onOpponentkButton();
    });
    buttonOpponent.style.display = "none";

    const buttonRestart = document.querySelector("#restart");
    buttonRestart.addEventListener("click", (e) => {
      onRestartButton();
    });
  });
})();

const buttonController = (function () {
  subscribe("askRenderBoard", function (dimension) {
    publish("gameChangeGrid", dimension);
  });
  subscribe("onTypeSelected", function (type) {
    publish("typeSelected", type);
  });
  subscribe("randomSelected", function () {
    publish("gameRandomGrid");
  });
  subscribe("onStartGame", function () {
    publish("startGame");
  });
  subscribe("onAttackButton", function () {
    publish("startAttack");
  });
  subscribe("onOpponentkButton", function () {
    publish("opponentTurn");
  });
  subscribe("onRestartButton", function () {
    publish("restartGame");
  });
})();

export { buttonView, buttonController };
