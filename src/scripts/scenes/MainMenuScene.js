import { MAIN_MENU_BACKGROUND } from "../../assets/data/MainMenuImgData.js";
import { MENU } from "../utils/const.js";
import { BUTTON_PADDING, BUTTON_HEIGHT, BUTTON_WIDTH, BUTTONS } from "../../assets/data/buttonsData.js";
import { Button } from "../form/Button.js";
import { MenuScene } from "./MenuScene.js";

export class MainMenuScene extends MenuScene {
    constructor(game) {
        super(game);
        this.buttons = this.getButtons();
    }
    draw() {
        this.drawBackground(this.game.ctxHigh);
        this.drawButtons(this.game.ctxHigh);
    }//end draw
    drawBackground(ctx) {
        
        ctx.drawImage(
            MAIN_MENU_BACKGROUND.img,
            MAIN_MENU_BACKGROUND.x,
            MAIN_MENU_BACKGROUND.y,
            MAIN_MENU_BACKGROUND.width,
            MAIN_MENU_BACKGROUND.width,
            0,
            -50,
            ctx.canvas.width,
            ctx.canvas.width,
        )//end drawbg
    }//end drawBackground
    drawButtons(ctx) {
        for (const button of this.buttons) {
            button.draw(ctx);
        }//end for
    }//end drawButtons
    getButtons() {
        let buttonList = [
            new Button(BUTTONS.PLAY, "PLAY"),
            new Button(BUTTONS.HOW, "HOW"),
            new Button(BUTTONS.SETTINGS, "SETTINGS"),
        ];

        for (let i = 0; i < buttonList.length; i++) {
            let dX = MENU.centerX - BUTTON_WIDTH/2;
            let dY = MENU.centerY - BUTTON_HEIGHT + (BUTTON_HEIGHT * i) + (BUTTON_PADDING * i);
            buttonList[i].rect.x = dX;
            buttonList[i].rect.y = dY;
        }
        return buttonList;
    }//end getButtons
}//end MainMenu Scene cls