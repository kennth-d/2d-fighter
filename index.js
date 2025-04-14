import { GameManager } from "../src/scripts/components/GameManager.js";

window.addEventListener('load', function () {
    const game = new GameManager(false);
    game.start();
});//end window.onload