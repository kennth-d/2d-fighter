import { Fighter_001 } from "./modules/Fighter_001.js";
import { KeyboardInputComponent } from "./modules/input.js";

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

    //get the inputLogger
    //const inputLogger = document.querySelector('#inputLogger p');

    //create the player
    const player = new Fighter_001(GameViewport.WIDTH / 2 - 150, FLOOR);
    player.debug = true;
    console.log(player);

    //debug keyboard
    const keyboard = new KeyboardInputComponent(player);
    keyboard.initListeners();
    console.log(keyboard);

  

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