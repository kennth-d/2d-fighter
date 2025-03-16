import { Button } from "../form/Button.js";
import { BUTTON_WIDTH, BUTTONS } from "../../assets/data/buttonsData.js";
import { MenuScene } from "./scenes.js";

export class CharacterSelectScene extends MenuScene {
    constructor(game) {
        super(game);
        this.buttons = [new Button(BUTTONS.RETURN, "RETURN")];

        //set button position
        this.buttons[0].rect.x = this.game.ctxHigh.canvas.width - BUTTON_WIDTH - 50;
        this.buttons[0].rect.y = 130;
    }
    draw() {
        this.drawstub();
        super.draw(this.game.ctxHigh);
    }
    drawstub() {
        let ctx = this.game.ctxHigh;
        ctx.fillStyle = "gray";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.fillStyle = "red";
        ctx.font = "bold 28px Helvetica";
        let text = "Character Select";
        let metrics = ctx.measureText(text);
        let dx = ctx.canvas.width/2 - metrics.width/2;
        let dy = ctx.canvas.height/2 - 200;
        ctx.fillText(text, dx, dy);
    }//end draw
}