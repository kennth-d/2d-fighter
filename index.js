import { Player } from "./entities/fighters/Player.js";
import { Player2 } from "./entities/fighters/Player2.js";
import { Stage } from "./entities/Stage.js";
import { FPSCounter } from "./entities/FPSCounter.js";

const GameViewport = {
    WIDTH: 384,
    HEIGHT: 216,
}

window.addEventListener('load', function () {
    //get our canvas and context
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    //set our canvas size
    canvas.width = GameViewport.WIDTH;
    canvas.height = GameViewport.HEIGHT;

    const entities = [
        new Stage(),
        new Player(80, 145, 150),
        new Player2(160, 145, -150),
        new FPSCounter(),
    ];

    //for managing game clock
    let frameTime = {
        previous: 0,
        secondsPassed: 0,
    };
    let previousTime = 0;
    let secondsPassed = 0;

    function frame (time) {
        window.requestAnimationFrame(frame);

        frameTime.secondsPassed = (time - frameTime.previous) / 1000;
        frameTime.previous = time;

        //bulk update entites
        for (const entity of entities) {
            entity.update(frameTime, ctx);
        }//end for

        //bulk draw entities
        for (const entity of entities) {
            entity.draw(ctx);
        }// end for
        
        
    }//end frame

    window.requestAnimationFrame(frame);

});//end window.onload