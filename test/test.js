import {Fighter_001} from "../src/scripts/fighters/Fighter_001.js";
import { KeyboardInputComponent } from "../src/scripts/components/KeyboardInputComponent.js";
import { FighterStateManager } from "../src/scripts/components/FighterStateManager.js";
import { FighterSpriteManager } from "../src/scripts/components/SpriteManager.js";
import { F_001SpriteData } from "../src/assets/data/F001_SpriteData.js";

const GameViewport = {
    WIDTH: 384,
    HEIGHT: 216,
}
const FLOOR = GameViewport.HEIGHT - 100;

const GameTime = {
    delta: 0,
    previous: 0,
}

window.onload = function () {
    //get our canvas and context
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    //create the player
    const player = new Fighter_001(GameViewport.WIDTH / 2 - 150, FLOOR, new KeyboardInputComponent(), new FighterStateManager(), new FighterSpriteManager(F_001SpriteData));
    player.stateManager.fighter = player;
    player.debug = true;
    console.log(player);

    //set our canvas size
    canvas.width = GameViewport.WIDTH;
    canvas.height = GameViewport.HEIGHT;
    
    

    function frame (time) {
        window.requestAnimationFrame(frame);

        //update time
        GameTime.delta = (time - GameTime.previous) / 1000;
        GameTime.previous = time;

        //clears the screen
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, GameViewport.WIDTH, GameViewport.HEIGHT);

        //update/draw player
        player.update(GameTime);
        player.draw(ctx);
    }//end frame

    window.requestAnimationFrame(frame);

}