import _ from "lodash";
import { publish, subscribe } from "./helpers/pubsub";
import { boardView, boardController } from "./board";
import { buttonView, buttonController } from "./buttons";
import { gameController } from "./game";

subscribe("init", function () {
  publish("initGame");
  publish("gameChangeGrid", 5);
  document.querySelector("#player").style.display = "flex";
  document.querySelector(".level").style.display = "flex";
  document.querySelector(".result").style.display = "flex";
  document.querySelector("#random").style.display = "block";
  document.querySelector("#start").style.display = "block";
  document.querySelector("#start").textContent = "Start";
  document.querySelector("#vsPlayer").classList.remove("selected");
  document.querySelector("#vsMachine").classList.add("selected");
  document.querySelector(".attackResult").style.display = "none";
  document.querySelectorAll(".sizeSelector")[0].classList.add("selected");
  document.querySelectorAll(".sizeSelector")[1].classList.remove("selected");
  document.querySelectorAll(".sizeSelector")[2].classList.remove("selected");
});

publish("renderButtons");
publish("init");
