import { GameManager } from "../src/scripts/components/GameManager.js";
import * as test from "./unit/unitTests.js";

test.testWeightedRandomChoice();

window.addEventListener("load", function () {
    const game = new GameManager(true);
    game.start();
});