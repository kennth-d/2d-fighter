import { BUTTONS } from "../../assets/data/buttonsData.js";
import { Button } from "../form/Button.js";
import { HOW_TO_BACKGROUND } from "../../assets/data/HowToImgData.js";
import { BUTTON_WIDTH } from "../../assets/data/buttonsData.js";
import { MenuScene } from "./scenes.js"
import { MENU } from "../utils/const.js";

export class HowToScene extends MenuScene {
    constructor(game) {
        super(game);
        this.buttons = [new Button(BUTTONS.RETURN, "RETURN")];
        
        //set button position
        this.buttons[0].rect.x = this.game.ctxHigh.canvas.width - BUTTON_WIDTH - 50;
        this.buttons[0].rect.y = 75;
    }//end ctor
    draw() {
        this.drawBackground(this.game.ctxHigh);
        super.draw(this.game.ctxHigh);
    }//end draw
    drawBackground(ctx) {
        ctx.save();
        ctx.fillStyle = "#4e4e4e";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        //img 850x850, canvas 1280x720
        let scale = 0.67;
        ctx.drawImage(
            HOW_TO_BACKGROUND.img,
            HOW_TO_BACKGROUND.x,
            HOW_TO_BACKGROUND.y,
            HOW_TO_BACKGROUND.width,
            HOW_TO_BACKGROUND.height,
            MENU.centerX - (HOW_TO_BACKGROUND.width * scale)/2,
            MENU.centerY - (HOW_TO_BACKGROUND.height * scale)/2,
            Math.floor(HOW_TO_BACKGROUND.width * scale),
            Math.floor(HOW_TO_BACKGROUND.height * scale),
        )//end drawbg

        //reset ctx
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }//end drawBackground
}//end HowToScene cls