import {Fighter_001} from "../src/scripts/fighters/Fighter_001.js";
import { KeyboardInputComponent } from "../src/scripts/components/KeyboardInputComponent.js";
import { FighterStateManager } from "../src/scripts/components/FighterStateManager.js";
import { FighterSpriteManager } from "../src/scripts/components/SpriteManager.js";
import { F_001SpriteData } from "../src/assets/data/F001_SpriteData.js";
import { TIME, GAME_VIEWPORT, FLOOR } from "../src/scripts/utils/global.js";


window.onload = function () {
    //get our canvas and context
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    //create the player
    const player = new Fighter_001(GAME_VIEWPORT.WIDTH / 2 - 150, FLOOR, new KeyboardInputComponent(), new FighterStateManager(), new FighterSpriteManager(F_001SpriteData));
    player.stateManager.fighter = player;
    player.debug = true;
    console.log(player);

    //set our canvas size
    canvas.width = GAME_VIEWPORT.WIDTH;
    canvas.height = GAME_VIEWPORT.HEIGHT;
    
    

    function frame (timeStamp) {
        window.requestAnimationFrame(frame);

        //update time
        TIME.delta = (timeStamp - TIME.previous) / 1000;
        TIME.previous = timeStamp;

        //clears the screen
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, GAME_VIEWPORT.WIDTH, GAME_VIEWPORT.HEIGHT);

        //update/draw player
        player.update();
        player.draw(ctx);
    }//end frame

    window.requestAnimationFrame(frame);

}