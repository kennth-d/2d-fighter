import {Fighter_001} from "../src/scripts/fighters/Fighter_001.js";
import { KeyboardInputComponent } from "../src/scripts/components/KeyboardInputComponent.js";
import { FighterStateManager } from "../src/scripts/components/FighterStateManager.js";
import { FighterSpriteManager } from "../src/scripts/components/SpriteManager.js";
import { F_001SpriteData } from "../src/assets/data/F001_SpriteData.js";
import { TIME, PLAYER_ONE_START } from "../src/scripts/utils/global.js";


window.onload = function () {
    //get our canvas and context
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    //disable pixel smoothing.
    ctx.imageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    //create the player
    const player = new Fighter_001(PLAYER_ONE_START.x, PLAYER_ONE_START.y, 1, new KeyboardInputComponent(), new FighterStateManager(), new FighterSpriteManager(F_001SpriteData));
    player.stateManager.fighter = player;
    player.debug = true;
    console.log(player);
        
    function frame (timeStamp) {
        window.requestAnimationFrame(frame);

        //update time
        TIME.delta = (timeStamp - TIME.previous) / 1000;
        TIME.previous = timeStamp;

        //clears the screen
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //update/draw player
        player.update();
        player.draw(ctx);
    }//end frame

    window.requestAnimationFrame(frame);

}