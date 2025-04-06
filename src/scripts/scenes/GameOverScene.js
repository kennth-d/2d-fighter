import { MENU } from "../utils/const.js";
import { BUTTON_PADDING, BUTTON_HEIGHT, BUTTON_WIDTH, BUTTONS } from "../../assets/data/buttonsData.js";
import { Button } from "../form/Button.js";
import { MenuScene } from "./MenuScene.js";

export class GameOverScene extends MenuScene {
    constructor(game) {
        super(game);
        this.buttons = this.getButtons();
    }
    handleEscapeKey() {
        return;
    }
    draw(){
        this.drawBackground(this.game.ctxHigh);
        super.draw(this.game.ctxHigh);
    }
    drawBackground(ctx) {
        ctx.save();
        ctx.fillStyle = "black";
        ctx.globalAlpha = 0.005;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.restore();
    }
    getButtons() {
        let buttonList = [
            new Button(BUTTONS.REMATCH, "REMATCH"),
            new Button(BUTTONS.MAIN, "MAIN"),
        ];

        buttonList[0].rect.x = MENU.centerX - (BUTTON_WIDTH + BUTTON_PADDING);
        buttonList[0].rect.y = MENU.centerY + (BUTTON_HEIGHT * 2);

        buttonList[1].rect.x = MENU.centerX + BUTTON_PADDING;
        buttonList[1].rect.y = MENU.centerY + (BUTTON_HEIGHT * 2);

        return buttonList;
    }//end getButtons
}//end GameOverScene
