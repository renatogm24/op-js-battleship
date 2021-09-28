import _ from "lodash";
import { publish, subscribe } from "./helpers/pubsub";
import { boardView, boardController } from "./board";
import { buttonView, buttonController } from "./buttons";
import { gameController } from "./game";


publish("renderSizeButtons");
publish("gameChangeGrid", 5);
const buttonSize5 = document.querySelector(".sizeSelector");
buttonSize5.classList.add("selected");

