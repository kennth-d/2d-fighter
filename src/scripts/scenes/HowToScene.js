import { BUTTONS } from "../../assets/data/buttonsData.js";
import { Button } from "../form/Button.js";
import { HOW_TO_BACKGROUND } from "../../assets/data/HowToImgData.js";
import { BUTTON_WIDTH } from "../../assets/data/buttonsData.js";
import { MenuScene } from "./scenes.js"

export class HowToScene extends MenuScene {
    constructor(game) {
        super(game);
        this.buttons = [new Button(BUTTONS.RETURN, "RETURN")];
        
        //set button position
        this.buttons[0].rect.x = this.game.ctxHigh.canvas.width - BUTTON_WIDTH - 50;
        this.buttons[0].rect.y = 25;
    }//end ctor
    draw() {
        this.drawBackground(this.game.ctxHigh);
        super.draw(this.game.ctxHigh);
    }//end draw
    drawBackground(ctx) {

        //scale 1920 x 1080 image down to canvas size of 1280 x 720
        ctx.scale(.67, .67); // (1280/1920, 720/1080) 

        ctx.drawImage(
            HOW_TO_BACKGROUND.img,
            HOW_TO_BACKGROUND.x,
            HOW_TO_BACKGROUND.y,
            HOW_TO_BACKGROUND.width,
            HOW_TO_BACKGROUND.height,
            0,
            -155,
            HOW_TO_BACKGROUND.width,
            HOW_TO_BACKGROUND.height,
        )//end drawbg

        //reset ctx
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }//end drawBackground
}//end HowToScene cls